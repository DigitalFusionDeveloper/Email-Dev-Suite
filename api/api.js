module.exports = {
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
