var express = require("express");
var router = express.Router();
var de = require("../api/de");

/* GET users listing. */
router.get("/", function(req, res, next) {
    var data = de.getDE("Evan_Master_Active");
    // "Evan_Master_Active", "991CEC7A-1A07-4FC1-8DEE-7FC4411EF0FD"
    data.get(function(err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            var statusCode = response && response.res && response.res.statusCode ? response.res.statusCode : 200;
            var result = response && response.body ? response.body : response;
            response && res.status(statusCode).render("dataExtension", {
                dataExtension: result.Results
            });
        }
    });
});

router.post("/", function(req, res, next) {
    var data = de.postDE();
    data.post(function(err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            var statusCode = response && response.res && response.res.statusCode ? response.res.statusCode : 200;
            var result = response && response.body ? response.body : response;
            response && res.status(statusCode).send(result);
        }
    });
});

router.patch("/", function(req, res, next) {
    var data = de.patchDE();
    data.patch(function(err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            var statusCode = response && response.res && response.res.statusCode ? response.res.statusCode : 200;
            var result = response && response.body ? response.body : response;
            response && res.status(statusCode).send(result);
        }
    });
});

router.delete("/", function(req, res, next) {
    var data = de.deleteDE();
    data.delete(function(err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            var statusCode = response && response.res && response.res.statusCode ? response.res.statusCode : 200;
            var result = response && response.body ? response.body : response;
            response && res.status(statusCode).send(result);
        }
    });
});

module.exports = router;
