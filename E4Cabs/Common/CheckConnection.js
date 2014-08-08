function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.NONE] = 'No network connection';

    if(states[networkState] === 'No network connection')
    {
     navigator.notification.alert(
    "No network connection found.",
    callBackFunctionB, // Specify a function to be called 
    'Alert',
    "OK"
);
function callBackFunctionB(){
    $('#txtPassword').val("");
        return false;
}
        //alert("No network connection found.");
        
    }
    else
    {
        return true;
    }
}