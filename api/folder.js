module.exports = {
    postFolder: function(client, name, contentType, parentID) {
        var options = {
            props: {
                "Name": name,
                "Description": name,
                "ContentType": contentType,
                "ParentFolder": {
                    "ID": parentID
                },
                "AllowChildren": "true",
                "IsEditable": "true"
            }
        }; //
        return client.folder(options);
    },

    getFolders: function(client) {
        var options = {
            props: ["ParentFolder.ID", "ID", "Name", "ContentType"] // only required option
        };
        return client.folder(options);
    },

    getFolderByContentType: function(client, contentType) {
        var options = {
            props: ["ParentFolder.ID", "ID", "Name", "ContentType"],
            filter: {
                leftOperand: "ContentType",
                operator: "equals",
                rightOperand: contentType // dataextension || media \\ email \\ userinitiatedsends
            }
        };
        return client.folder(options);
    },

    patchFolder: function(client) {
        var options = {
            props: {
                "ID": "56337",
                "Name": "SDK Example, now Updated!"
            }
        };
        return client.folder(options);

        // folder.patch(function(err, response) {
        //     if (err) {
        //         res.status(500).send(err);
        //     } else {
        //         var statusCode = response && response.res && response.res.statusCode ? response.res.statusCode : 200;
        //         var result = response && response.body ? response.body : response;
        //         response && res.status(statusCode).send(result);
        //     }
        // });
    },

    deleteFolder: function(client) {
        var options = {
            props: {
                "ID": "56337"
            } //required
        };
        return client.folder(options);

        // folder.delete(function(err, response) {
        //     if (err) {
        //         res.status(500).send(err);
        //     } else {
        //         var statusCode = response && response.res && response.res.statusCode ? response.res.statusCode : 200;
        //         var result = response && response.body ? response.body : response;
        //         response && res.status(statusCode).send(result);
        //     }
        // });
    }
};
