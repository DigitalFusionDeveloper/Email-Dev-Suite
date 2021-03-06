$(function() {
    $('.modal').modal();
    $("#jstree").jstree({
        "plugins": ["wholerow", "checkbox"],
        "checkbox": {
            "three_state": false
        },
        "core": {
            "multiple": false,

            // Production:
            "data": {
                "url": "https://email-dev-suite.herokuapp.com/data"
            }

            //Development
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

        // Production:
        $.post("https://email-dev-suite.herokuapp.com/de/data", data);

        // Development
        // $.post("/de/data", data);
    });

});
