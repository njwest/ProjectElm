$('#check_password').on('keyup', function () {
    if ($(this).val() == $('#password').val()) {
        console.log('the passwords matched');
    } else {
        console.log('the passwords do not match');
    };
});

//
// $('#registration').click(function(){
//     $('#selectHabit').toggleClass('hidden');
// })
//
// $('#other').click(function(){
//     $('this').toggleClass('hidden')
// })

// Code here handles what happens when a user submits a new character on the form.
// Effectively it takes the form inputs then sends it to the server to save in the DB.

// $('#submit').on('click', function(){
//        var username = $('#username').val();
//        var email = $('#email').val();
//        var password = $('#password').val();
//        var repeatPassword = $('#check_password').val();
//        console.log(password, repeatPassword);
//
//        if(password == repeatPassword){
//            $.post('http://localhost:3000/', {
//                        username: username,
//                        email: email,
//                        password: password
//                    });
//        }
//        else{
//            alert('Sorry, your passwords did not match. Please try again.');
//        }
//  })

// when user clicks addBtn
// $('#addUser').on("click", function(){
//
// 	// make a newCharacter obj
// 	var newUser =
// 	{
// 		username: $("#username").val().trim(), // name from name input
// 		email: $("#role").val().trim(), // role from role input
// 		habit: $("#habit").val().trim(), // age from age input
// 		password: $("#password").val().trim() // points from forcepoints input
// 	};
//
// 	// grab the url from the window/tab
// 	var currentURL = window.location.origin;
//
// 	// send an AJAX POST-request with jQuery
// 	$.post( currentURL + "/api/new", newCharacter)
// 		// on success, run this callback
// 		.done(function(data){
// 			// log the data we found
// 			console.log(data);
// 			// tell the user we're adding a character with an alert window
// 			alert("Adding character...")
// 		})
//
// 	// empty each input box by replacing the value with an empty string
// 	$('#username').val("");
// 	$('#habit').val("");
// 	$('#password').val("");
//
// 	// returning false will stop the page from reloading
// 	// by preventing the form's default behavior.
// 	return false;
//
// });
