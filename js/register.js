$('#regbtn').click(function () {
    const username = $('#username1').val();
    const email = $('#email').val();
    const password = $('#password1').val();

    const userData = {
        userName: username,
        emailId: email,
        password: password,
    };

    $.ajax({
        url: 'http://localhost:8080/register',
        method: 'POST',
        data: JSON.stringify(userData),
        contentType: 'application/json',
        success: function (res) {
            alert('Registration successful...');
            window.location.href = "/login.html"
        },
        error: function () {
            alert('Registration failed');
            return false;
        },
    });
});