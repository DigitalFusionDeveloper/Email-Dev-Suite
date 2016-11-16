$(function() {
    $("#jstree").jstree({
        "plugins": ["wholerow", "checkbox"],
        "checkbox": {
            "three_state": false
        },
        "core": {
            "multiple": false,
            "data": {
                "url": (process.env.NODE_ENV == "production" ? "https://email-dev-suite.herokuapp.com/data" : "http://localhost:3000/data")
            }
        }
    });
});
