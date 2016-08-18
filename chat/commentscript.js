var main = function() {
	var dataRef = new Firebase("https://mainchathabits.firebaseio.com/");

dataRef.on("child_added", function(snapshot){
	var commentsList = snapshot.val().comment;
	$('#comments').append('<li>' + commentsList + '</li>')


});


	$('form').submit(function(event) {
		var comment = $('#comment').val();
		dataRef.push({
			comment: comment
		});

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