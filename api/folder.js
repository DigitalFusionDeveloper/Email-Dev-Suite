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
    },

    deleteFolder: function(client) {
        var options = {
            props: {
                "ID": "56337"
            } //required
        };
        return client.folder(options);
    }
};
