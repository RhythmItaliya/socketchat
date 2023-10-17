if (window.localStorage.getItem('X-Access-Token') != null) {
    window.location.href = "/chat.html";
}

$('#loginbtn').click(function () {
    let emailOrUsername = $('#username').val();
    let password = $('#password').val();

    const loginData = {
        userName: emailOrUsername,
        password: password,
    };

    $.ajax({
        url: 'http://localhost:8080/users/login',
        method: 'POST',
        data: JSON.stringify(loginData),
        contentType: 'application/json',
        success: function (res) {

            token = res["X-Access-Token"];
            window.localStorage.setItem('X-Access-Token', token);

            const username = res["name"];
            window.localStorage.setItem('name', username);

            window.location.href = "chat.html";
        },
        error: function () {
            alert('login failed....');
        },
    });
});
