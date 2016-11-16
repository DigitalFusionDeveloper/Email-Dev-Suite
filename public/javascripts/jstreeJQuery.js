$(function() {
    $("#jstree").jstree({
        "plugins": ["wholerow", "checkbox"],
        "checkbox": {
            "three_state": false
        },
        "core": {
            "multiple": false,
            "data": {
                "url": "https://email-dev-suite.herokuapp.com/data"
            }
        }
    });
});
