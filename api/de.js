module.exports = {
    postDE: function(client) {
        var options = {
            props: {
                "Name": "SDKDataExtension", //New DE Name
                "CategoryID": "93125" //folder ID
            },
            columns: [{
                "Name": "Key",
                "FieldType": "Text",
                "IsPrimaryKey": "true",
                "MaxLength": "100",
                "IsRequired": "true"
            }, {
                "Name": "Value",
                "FieldType": "Text"
            }]
        };
        return client.dataExtension(options);
    },

    getDE: function(client, name) {
        var options = {
            props: ["Name", "CustomerKey"], //required
            filter: { //remove filter for all.
                leftOperand: "Name",
                operator: "equals",
                rightOperand: name
            }
        };
        return client.dataExtension(options);
    },

    patchDE: function(client) {
        var options = {
            props: {
                "CustomerKey": "8C0A30C9-4C0D-40C6-808B-B4D2A940259E",
                "Name": "NEW NAMEEEE YARRRRGGG"
            } //required
        };
        return client.dataExtension(options);
    },

    deleteDE: function(client) {
        var options = {
            props: {
                "CustomerKey": "7DEC95AA-562D-4915-92D9-509F37F27E4C"
            } //required
        };
        return client.dataExtension(options);
    },

    //****************************************************************************************
    //								Column
    //****************************************************************************************


    getDEColumn: function(client) {
        var options = {
            props: ["ObjectID", "PartnerKey", "Name", "DefaultValue", "MaxLength", "IsRequired", "Ordinal", "IsPrimaryKey", "FieldType", "CreatedDate", "ModifiedDate", "Scale", "Client.ID", "CustomerKey"] //required
                ///*
                ,
            filter: { //remove filter for all.
                leftOperand: "DataExtension.CustomerKey",
                operator: "equals",
                rightOperand: "11B81EC2-4CED-4BFA-977A-FACBED132890"
            }
            //*/
        };
        return client.dataExtensionColumn(options);

        // deColumn.get(function(err, response) {
        //     if (err) {
        //         res.status(500).send(err);
        //     } else {
        //         var statusCode = response && response.res && response.res.statusCode ? response.res.statusCode : 200;
        //         var result = response && response.body ? response.body : response;
        //         response && res.status(statusCode).send(result);
        //     }
        // });
    },

    //****************************************************************************************
    //								Row
    //****************************************************************************************

    postDERow: function(client) {
        var options = {
            Name: "Evan_Practice",
            props: {
                "Key": "ThisIsTheKey",
                "Value": "Some random text for the value field"
            }
        };

        return client.dataExtensionRow(options);

        // deRow.post(function(err, response) {
        //     if (err) {
        //         res.status(500).send(err);
        //     } else {
        //         var statusCode = response && response.res && response.res.statusCode ? response.res.statusCode : 200;
        //         var result = response && response.body ? response.body : response;
        //         response && res.status(statusCode).send(result);
        //     }
        // });
    },

    getDERow: function(client) {
        var options = {
            Name: "SDKDataExtension" //required
                ,
            props: ["Key", "Value"] //required
                /*
		,filter: {						//remove filter for all.
        	leftOperand: "Value",
        	operator: "equals",
        	rightOperand: "Some random text for the value field"
   		}
   		*/
        };
        return client.dataExtensionRow(options);

        // deRow.get(function(err, response) {//     if (err) {
        //         res.status(500).send(err);
        //     } else {
        //         var statusCode = response && response.res && response.res.statusCode ? response.res.statusCode : 200;
        //         var result = response && response.body ? response.body : response;
        //         response && res.status(statusCode).send(result);
        //     }
        // });
    },

    patchDERow: function(client) {
        var options = {
            Name: "SDKDataExtension",
            props: {
                "Key": "ThisIsTheKey",
                "Value": "NewValue"
            }
        };
        client.dataExtensionRow(options);

        // deRow.patch(function(err, response) {
        //     if (err) {
        //         res.status(500).send(err);
        //     } else {
        //         var statusCode = response && response.res && response.res.statusCode ? response.res.statusCode : 200;
        //         var result = response && response.body ? response.body : response;
        //         response && res.status(statusCode).send(result);
        //     }
        // });
    },

    deleteDERow: function(client) {
        var options = {
            Name: "SDKDataExtension",
            props: {
                "Key": "ThisIsTheKey"
            }
        };
        client.dataExtensionRow(options);

        // deRow.delete(function(err, response) {
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
