$('#check_password').on('keyup', function () {
    if ($(this).val() == $('#password').val()) {
        console.log('the passwords matched');
    } else {
        console.log('the passwords do not match');
    };
});


$('#registration').click(function(){
    $('#selectHabit').toggleClass('hidden');
})

$('#other').click(function(){
    $('this').toggleClass('hidden')
})
