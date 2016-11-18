var folder = require("./folder");
var de = require("./de");

module.exports = {
    getRowsArray: function(string) {
        var headers = string.split(/\r\n/)[0].split(/\t/);
        var rowsArray = string.split(/\r\n/).slice(1).map(row => {
            return row.split(/\t/);
        });

        rowsArray = rowsArray.map(row => {
            return row.map(value => {
                var newProp = {
                    Key: headers[0],
                    Value: value
                };
                rotate();
                return newProp;
            });
        });

        function rotate() {
            headers.push(headers.shift());
        }
        return rowsArray;
    },
    getHeaderArray: function(string) {
        var headers = string.split(/\r\n/)[0].split(/\t/);
        var columns = [];
        headers.forEach((header, index) => {
            if (index == 0) {
                columns.push({
                    "Name": header,
                    "FieldType": "EmailAddress",
                    "IsPrimaryKey": "false",
                    "IsRequired": "true"
                });
            } else {
                columns.push({
                    "Name": header,
                    "FieldType": "Text",
                    "IsPrimaryKey": "false",
                    "MaxLength": "50",
                    "IsRequired": "false"
                });
            }
        });
        return columns;
    },
    mergeDEandFolders: function(valuesArray) {
        var values = [];
        var folderArray = [];
        valuesArray[0].forEach(value => {
            folderArray.push(value.id);
            values.push({
                id: value.id,
                text: value.name,
                parent: (value.parentID == "0" ? "#" : value.parentID),
                icon: "/images/folder.png",
                data: "folder"
            });
        });
        valuesArray[1].forEach(value => {
            if (folderArray.includes(value.CategoryID)) {
                values.push({
                    id: value.CustomerKey,
                    text: value.Name,
                    parent: value.CategoryID,
                    icon: "/images/data.png",
                    data: "extension"
                });
            }
        });

        return values;
    },
    getDEsAndFolders: function(IET_Client) {
        var folderPromise = new Promise((resolve) => {
            folder.getFolderByContentType(IET_Client, "dataextension").get(function(err, response) {
                resolve(response.body.Results.map(folder => {
                    return {
                        id: folder.ID,
                        name: folder.Name,
                        parentID: folder.ParentFolder.ID
                    };
                }));
            });
        });
        var dePromise = new Promise((resolve) => {
            de.getDE(IET_Client).get(function(err, response) {
                resolve(response.body.Results);
            });
        });

        return Promise.all([folderPromise, dePromise]);
    },
    modifyFolderResults: function(folder) {
        var contentType = ["Portfolio", "my emails", "Data Extensions", "User-Initiated"];
        return folder.filter(folder => {
            return folder.ParentFolder.ID == "0" && contentType.includes(folder.Name);
        }).map(folder => {
            return {
                id: folder.ID,
                name: folder.Name,
                contentType: folder.ContentType
            };
        });
    },

    buildPromises: function(resultArray) {

        var emailPromise = new Promise((resolve, reject) => {
            resultArray[0].post(function(err) {
                if (err) {
                    reject("Email: " + err);
                } else {
                    resolve("Email folder created");
                }
            });
        });
        var mediaPromise = new Promise((resolve, reject) => {
            resultArray[1].post(function(err) {
                if (err) {
                    reject("Media: " + err);
                } else {
                    resolve("Media folder created");
                }
            });
        });
        var userinitiatedsendsPromise = new Promise((resolve, reject) => {
            resultArray[2].post(function(err) {
                if (err) {
                    reject("User-Initiated: " + err);
                } else {
                    resolve("User-Initiated folder created");
                }
            });
        });
        var dataextensionPromise = new Promise((resolve, reject) => {
            resultArray[3].post(function(err) {
                if (err) {
                    reject("Data Extension: " + err);
                } else {
                    resolve("Data Extension folder created");
                }
            });
        });
        return [emailPromise, mediaPromise, userinitiatedsendsPromise, dataextensionPromise];
    }
};
