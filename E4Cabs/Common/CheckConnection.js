function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.NONE] = 'No network connection';

    if(states[networkState] === 'No network connection')
    {
     navigator.notification.alert(
    "No network connection found.",
    callBackFunctionB, 
    'Alert',
    "OK"
    );
    function callBackFunctionB(){
        $('#txtPassword').val("");
            return false;
    }
        
    }
    else
    {
        return true;
    }
}