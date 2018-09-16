$(document).ready(function () {

    $("#project").on('change', function () {
        //clear all previous entries from the sprint and story lists
        $('#sprint').find('option').remove();
        $('#list-items').find('.storylist-item').remove();
        //clear the localstorage if it was set
        localStorage.setItem("sprint_data", "");
        if ($("#project").val() != "") {
            $.getJSON($SCRIPT_ROOT + '/get_sprints', {
                project: $("#project").val()
            }, function (data) {
                localStorage.setItem("sprint_data", JSON.stringify(data.result))
                $('#sprint')
                    .append($("<option></option>")
                        .attr("value", "")
                        .text("Select a sprint."));
                $.each(data.result, function (key, value) {
                    $('#sprint')
                        .append($("<option></option>")
                            .attr("value", key)
                            .text(key));
                });
            });
        }
    });

    $("#sprint").on('change', function () {
        $('#list-items').find('.storylist-item').remove();
        if ($("#sprint").val() != "") {
            var sprint_data = JSON.parse(localStorage.getItem("sprint_data"));
            $.each(sprint_data[$("#sprint").val()], function(index, story){
                $('#list-items').append('<div class="input-group storylist-item"> <input type="text" class="form-control" name="stories" value="' + story + '" aria-label="story"> <span class="input-group-btn" > <button class="btn btn-secondary"  id="remove" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button> </span> </div>');

            });
        }
    });

    //remove list item on click of trash icon
    $(document).on('click', '#remove', function () {
        $(this).closest("div").remove();
        console.log("Removing item", $(this).closest("div"));
    });

    //on click
    $('#listadd').click(function () {

        var userInput = $("#new-item").val();
        console.log("User inputted...", userInput);
        /*
         //Comment back in if errors should be thrown when entering empty and comment out the following block
         if (!userInput) {
         $('.error').collapse("show");
         $('.error').text('Please enter a story number!').show();
         }
         else {
         console.log('check');
         $('#list-items').append("<li class='list-group-item'>" + userInput + "<i class='fa fa-trash fa-4'></i>" + "</li>");
         }
         */
        if (userInput) {
            $('#list-items').append('<div class="input-group storylist-item"> <input type="text" class="form-control" name="stories" value="' + userInput + '" aria-label="story"> <span class="input-group-btn" > <button class="btn btn-secondary"  id="remove" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button> </span> </div>');
            //$('#list-items').append("<li class='list-group-item'><input class='no-border' type='text' name='stories' readonly value='" + userInput + "'><i class='fa fa-trash float-right' aria-hidden='true'></i>" + "</li>");
        }

        $('#new-item').val("");

    });
    //end on click


    /*
     //Comment back in if errors should be thrown when entering empty
     //remove error message on focusing the input
     $("#new-item").val('').focus(function () {
     $('.error').collapse("hide");
     });
     */
});