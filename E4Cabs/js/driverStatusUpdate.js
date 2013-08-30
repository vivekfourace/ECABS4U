
//Fetch status and update the label: ID = lblCurrentStatus of driver
var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

window.onload = getStatus();

function getStatus()
{
var url = "";

$.ajax(url,{
    type:"POST",
    dataType: "Json",
    data:"",
    contentType: "application/json; charset=utf-8",
    success: ShowData,
    //error: function (XMLHttpRequest, textStatus, errorThrown) {
    //alert(errorThrown);
        //}
 });

}
function ShowData()
{
$('#lblCurrentStatus').text();

}

function engage()
{
    $('#lblCurrentStatus').text("Engaged");
    $('#lblCurrentStatus').css("color","#97312A");

//var url = "";
        //$.ajax(url,{
          //  type:"POST",
           // dataType: "Json",
           // data:"{}",
            //contentType: "application/json; charset=utf-8",                     
            //success: ShowData,            
            //error: function (XMLHttpRequest, textStatus, errorThrown) {
           // alert(errorThrown);
        //}
 //});
}

function available()
{
    $('#lblCurrentStatus').text("Available");
    $('#lblCurrentStatus').css("color","#33982C");
    
//var url = "";
      //  $.ajax(url,{
          //  type:"POST",
            //dataType: "Json",
            //data:"{}",
            //contentType: "application/json; charset=utf-8",                     
           // success: ShowData,            
           // error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
        //}
 //});
}

function onTheWay()
{
    $('#lblCurrentStatus').text("On the way");
    $('#lblCurrentStatus').css("color","#98972E");
//var url = "";
     //   $.ajax(url,{
          //  type:"POST",
          //  dataType: "Json",
          //  data:"{}",
          //  contentType: "application/json; charset=utf-8",                     
          //  success: ShowData,            
          //  error: function (XMLHttpRequest, textStatus, errorThrown) {
          //  alert(errorThrown);
        //}
 //});
}

function rejected()
{
    $('#lblCurrentStatus').text("Rejected");
    $('#lblCurrentStatus').css("color","#E13015");
    
//var url = "";
      //  $.ajax(url,{
          //  type:"POST",
          //  dataType: "Json",
           // data:"{}",
           // contentType: "application/json; charset=utf-8",                     
           // success: ShowData,            
           // error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
        //}
 //});
}
function backadmin()
{
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}
