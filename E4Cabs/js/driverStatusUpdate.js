
//Fetch status and update the label: ID = lblCurrentStatus of driver

function engage()
{
    $('#lblCurrentStatus').text("Engage");
}

function available()
{
    $('#lblCurrentStatus').text("Available");
}

function onTheWay()
{
    $('#lblCurrentStatus').text("On the way");
}

function rejected()
{
    $('#lblCurrentStatus').text("Rejected");
}