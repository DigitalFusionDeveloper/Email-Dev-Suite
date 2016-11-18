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

            // "data": {
            //     "url": "http://localhost:3000/data"
            // }
        }
    });
    $('#createDE').on('click', function() {
        var selected = $('#jstree').jstree(true).get_selected(true);
        var data = {
            id: selected[0].id,
            text: selected[0].text,
            parent: selected[0].parent,
            data: selected[0].data
        };
        $.post("https://email-dev-suite.herokuapp.com/de/data", data);
    });

});
