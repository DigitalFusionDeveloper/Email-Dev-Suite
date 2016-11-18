var express = require("express");
var router = express.Router();
var de = require("../api/de");
var folder = require("../api/folder");
var client = require("../db/api/client");
var api = require("../api/api");
var deData = require("../db/api/deData");

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

});
router.get("/de/create/:client", function(req, res) {
    var clientName = req.params.client;
    deData.getDEData().then(data => {
        res.render("createDE", {
            clientName: clientName,
            folder: (data.data == "folder" ? "folder" : null),
            extension: (data.data == "extension" ? "extension" : null),
            employee: req.session.employee,
            data: data
        });
    });
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

router.post("/de/data", function(req, res, next) {
    deData.setDEData(req.body).then();
});

router.post("/de/createExtension/:client", function(req, res, next) {
    var clientName = req.params.client;
    var deString = req.body.data;
    var columns = api.getHeaderArray(deString);
    de.postDE(IET_Client, req.body.name, req.body.folderNumber, columns).post(function(err) {
        if (err) {
            res.render("error", {
                message: "Another Data Extension with that name already exists... I'm pretty sure!",
                error: err,
                employee: req.session.employee
            });
        } else {
            var promises = api.buildRowPromises(api.getRowsArray(deString), IET_Client, req.body.name);
            Promise.all(promises).then(() => {
                res.render("client", {
                    message: "Data Extension Ready to go!",
                    clientName: clientName,
                    employee: req.session.employee
                });
            });
        }
    });
});

router.post("/de/updateExtension/:client", function(req, res, next) {
    var clientName = req.params.client;
    res.send(req.body);
});

router.post("/folder/create/:client", function(req, res, next) {
    var clientName = req.params.client;
    var folders = folder.getFolders(IET_Client);
    folders.get(function(err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
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
                });
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
