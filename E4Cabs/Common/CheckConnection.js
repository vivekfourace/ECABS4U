function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.NONE] = 'No network connection';

    if(states[networkState] === 'No network connection')
    {
        alert("No network connection found.");
        $('#txtPassword').val("");
        return false;
    }
    else
    {
        return true;
    }
}