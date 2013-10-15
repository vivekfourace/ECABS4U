var QString = window.location.search.substring(1);
var userId = QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];
//var requestID = QString.split("=")[4].split("&")[0];

function loc() {
    var from = $('#txtFrom').val();
    var to = $('#txtTo').val();
    var loc2 = $('#txt2location').val();
    //alert(from + to);
    //var dis = "none";
    window.location = 'Location.html?id=' + from + '&rid=' + to + '&rrid=' + loc2;
}

function backtoCustomerhome() {
    window.location = 'customerSearch.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}

//current Location
function currentlocation() {
    //window.location =  'Location.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;  
}

//Search Available

function availabledriver() {
    var fromloc;
     var isChecked = $('#chkFromLocation').attr('checked') ? true : false;
    if(isChecked == false)
    {
        fromloc = document.getElementById('txtFrom').value;
    }
    else if(isChecked == true)
    {
        fromloc = document.getElementById('txtCurrentFrom').value;
    }
    //var fromloc = document.getElementById('txtFrom').value;
    var toloc = document.getElementById('txtTo').value;
    var distance = document.getElementById('txtDistance').value;
    var pickdate = document.getElementById('pickDate').value;
    var picktime = document.getElementById('pickTime').value;
    var passenger = document.getElementById("ddlpassenger");
    var totalpassenger = passenger.options[passenger.selectedIndex].value;
    var lcase = document.getElementById("ddllargecase");
    var largecase = lcase.options[lcase.selectedIndex].value;
    var scase = document.getElementById("ddlsmallcase");
    var smallcase = scase.options[scase.selectedIndex].value;

    var returnDate = document.getElementById("datepickers").value;
    var returnTime = document.getElementById("timepickers").value;

    //add Location    
    var secondLoc = document.getElementById("txt2location").value;
    var thirdLoc = document.getElementById("txt3location").value;

    //special
    var weelchairPassangers = document.getElementById("ddlWheelchair");
    var WchairPassengers = weelchairPassangers.options[weelchairPassangers.selectedIndex].value;

    var childS = document.getElementById("ddlChidseats");
    var childSeats = childS.options[childS.selectedIndex].value;

    var childB = document.getElementById("ddlChidbooster");
    var childBooster = childB.options[childB.selectedIndex].value;

    var otherSpeRequirement = document.getElementById('txtothereSpecialRequirement').value;

    var IsReturnTrue = $('#chkReturnYes').attr('checked') ? true : false;

    //Return

    var returnfromloc = document.getElementById('txtReturFrom').value;
    var returntoloc = document.getElementById('txtReturTo').value;

    if (!fromloc) {
        $('#lblMessage').text("Enter From location!");
        return false;
    }
    if (!toloc) {
        $('#lblMessage').text("Enter To location!");
        return false;
    }

    $.ajax({
        url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerRequest",
        cache:true,
        type: "POST",
        dataType: "Json",
        data: "{'userID':'" + relatedId + "','frompost':'" + fromloc + "','topost':'" + toloc + "','pickDate':'" + pickdate + "','pickTime':'" + picktime + "','passenger':'" + totalpassenger + "','lcase':'" + largecase + "','scase':'" + smallcase + "','distance':'" + distance + "','secondL':'" + secondLoc + "','thirdLoc':'" + thirdLoc + "','WchairPassengers':'" + WchairPassengers + "','childSeats':'" + childSeats + "','childBooster':'" + childBooster + "','otherSpeRequirement':'" + otherSpeRequirement + "','IsReturnTrue':'" + IsReturnTrue + "','returnfromloc':'" + returnfromloc + "','returntoloc':'" + returntoloc + "','returnDate':'" + returnDate + "','returnTime':'" + returnTime + "'}",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var reqID = data.d;
            window.location = 'customerSearchList.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId + '&reqid=' + reqID;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // alert(errorThrown);
        }
    });
}

// Home Button In Hearder
function homeSearch() {
    window.location = 'customerHome.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
}
