$(function() {
    $("#jstree").jstree({
        "plugins": ["wholerow", "checkbox"],
        "checkbox": {
            "three_state": false
        },
        "core": {
            "multiple": false,
            "data": {
                "url": "http://localhost:3000/data"
            }
        }
    });
});
