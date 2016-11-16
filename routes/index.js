var express = require("express");
var router = express.Router();
var de = require("../api/de");
var folder = require("../api/folder");
var auth = require("../auth/auth");
var client = require("../db/api/client");
var api = require("../api/api");
require("dotenv").config();

var ET_Client = require("fuelsdk-node");
var IET_Client;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/* GET home page. */
router.get("/", function(req, res, next) {
    client.getClients().then(clients => {
        res.render("index", {
            employee: req.session.employee,
            clients: clients
        });
    });
});

router.get("/logout", function(req, res, next) {
    req.session.employee = null;
    res.redirect("/");
});

router.get("/data", function(req, res, next) {
    api.getDEsAndFolders(IET_Client).then(values => {
        res.send(api.mergeDEandFolders(values));
    });
});

router.get("/de/:client", function(req, res, next) {
    var clientName = req.params.client;
    res.render("dataExtension", {
        clientName: clientName,
        employee: req.session.employee
    });

    // api.getDEsAndFolders(IET_Client).then(values => {
    //     res.send(api.mergeDEandFolders(values));
    //
    //     de.getDE(IET_Client, oneFolder[0].ID.toString()).get(function(err, response) {
    //         var statusCode = response && response.res && response.res.statusCode ? response.res.statusCode : 200;
    //         var result = response && response.body ? response.body : response;
    //         response && res.status(statusCode).render("dataExtension", {
    //             dataExtension: result.Results,
    //             clientName: clientName,
    //             error: err,
    //             employee: req.session.employee
    //         });
    //     });
    // });
});

router.get("/:client", function(req, res, next) {
    var clientName = req.params.client;
    client.getClient(clientName).then(data => {
        IET_Client = null;
        IET_Client = new ET_Client(data.client_id, process.env[data.client_name], data.client_auth_target);
        IET_Client.FuelAuthClient.getAccessToken(IET_Client.FuelAuthClient);
        res.render("client", {
            clientName: data.client_name,
            employee: req.session.employee
        });
    });
});

router.post("/folder/create/:client", function(req, res, next) {
    var clientName = req.params.client;
    var folders = folder.getFolders(IET_Client);
    folders.get(function(err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            var statusCode = response && response.res && response.res.statusCode ? response.res.statusCode : 200;
            var folders = response && response.body ? response.body : response;
            folders = api.modifyFolderResults(folders.Results);

            var resultArray = [];
            folders.forEach(item => {
                var result = folder.postFolder(IET_Client, req.body.folderName, item.contentType, item.id);
                resultArray.push(result);
            });

            Promise.all(api.buildPromises(resultArray)).then(values => {
                res.render("client", {
                    message: values,
                    clientName: clientName,
                    employee: req.session.employee
                })
            }, reason => {
                res.render("client", {
                    message: reason,
                    clientName: clientName,
                    employee: req.session.employee
                });
            });
        }
    });
});


module.exports = router;
