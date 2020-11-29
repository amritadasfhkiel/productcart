exports.validate = function (params, socket) {

    var isValidaUser = false;

    if(params.email == "admin@idw.com" && params.password == "123456") {
        isValidaUser = true;
    }

    socket.emit('user_login_response', {
        authenticated : isValidaUser
    });
};