var main = function() {
    var dataRef = new Firebase("https://mainchathabits.firebaseio.com/");

    dataRef.on("child_added", function(snapshot) {
        var userNameList = snapshot.val().username;
        var commentsList = snapshot.val().comment;
        $('#comments').append('<li>' + "<b><span class='someName'>" + userNameList + '</b></span>' + ': ' + commentsList + '</li>');

    });




    $('form').submit(function(event) {

        var comment = $('#comment').val();
        $.ajax({
            type: 'GET',
            url: '/api/user',
            dataType: 'json',
            success: function(data) {
                var myUsername = data.username;
                console.log(myUsername + 'it worked')
                var username = data.username;
                dataRef.push({
                    comment: comment,
                    username: username
                });


            }
        })





        // $('#comments').append('<li>' + comment + '</li>');


        var $input = $(event.target).find('input')
        var comment = $input.val();

        if (comment != "") {
            //	var html = $('<li>').text(comment);
            //	html.prependTo('#comments')
            $input.val("");
        }


        return false;
    });

}

$(document).ready(main);
