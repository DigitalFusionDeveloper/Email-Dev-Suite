module.exports = {
    postDE: function(client, name, folderNumber, columns) {
        var options = {
            props: {
                "Name": name, //New DE Name
                "CategoryID": folderNumber //folder ID
            },
            columns: columns
        };
        return client.dataExtension(options);
    },

    getDE: function(client) {
        var options = {
            props: ["Name", "CustomerKey", "CategoryID"] //required properties you are asking for....
                //     ,
                // filter: { //remove filter for all.
                //     leftOperand: "CategoryID",
                //     operator: "equals",
                //     rightOperand: categoryID
                // }
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
                rightOperand: "991CEC7A-1A07-4FC1-8DEE-7FC4411EF0FD"
            }
            //*/
        };
        return client.dataExtensionColumn(options);
    },

    //****************************************************************************************
    //								Row
    //****************************************************************************************




    postDERow: function(client, name, props) {
        var options = {
            Name: name,
            props: props
        };
        return client.dataExtensionRow(options);
    },

    getDERow: function(client) {
        var options = {
            Name: "Evan_Master_Active", //required
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
    },

    deleteDERow: function(client) {
        var options = {
            Name: "SDKDataExtension",
            props: {
                "Key": "ThisIsTheKey"
            }
        };
        client.dataExtensionRow(options);
    }
};
