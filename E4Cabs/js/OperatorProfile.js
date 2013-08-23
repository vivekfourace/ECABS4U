var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

window.onload = getProfile();

function getProfile()
{
var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetOperatorDetails";
$.ajax(url,{
    type:"POST",
    dataType: "Json",
    data:"{'userID':'" +relatedId+"'}",
    contentType: "application/json; charset=utf-8",                     
    success: ShowData,
    
    error: function (XMLHttpRequest, textStatus, errorThrown) {
    alert(errorThrown);
        }
 });
}
function ShowData(data)
{ 
   $('#lblname').text(data.d[0]["OperatorName"]);
   $('#lblLocation').text(data.d[0]["Address2"]);
   $('#lblLocation2').text(data.d[0]["Address"]);
   $('#lblMobileNo').text(data.d[0]["ContactNumber"]);
   $('#lblEmailID').text(data.d[0]["Email"]);
    
    $('#txtname').hide();    
    $('#txtLocation').hide();    
    $('#txtLocation2').hide();    
    $('#txtMobileno').hide();    
    $('#txtEmailID').hide();
    $('#btnUpdate').hide();
    $('#btnCancel').hide();
    
    $('#lblname').show();
    $('#lblLocation').show();
    $('#lblLocation2').show();
    $('#lblMobileNo').show();
    $('#lblEmailID').show();
    $('#btnEdit').show();
 }

function EditProfile()
{
    $('#txtname').show();    
    $('#txtLocation').show();    
    $('#txtLocation2').show();    
    $('#txtMobileno').show();    
    $('#txtEmailID').show();
    
    $('#lblname').hide();
    $('#lblLocation').hide();
    $('#lblLocation2').hide();
    $('#lblMobileNo').hide();
    $('#lblEmailID').hide();
    $('#btnUpdate').show();
    $('#btnCancel').show();
    $('#btnEdit').hide();
    
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/GetOperatorDetails";
    $.ajax(url,{
        type:"POST",
        dataType: "Json",
        data:"{'userID':'" +relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: function(data){
            $('#txtname').val(data.d[0]["OperatorName"]);    
            $('#txtLocation').val(data.d[0]["Address2"])
            $('#txtLocation2').val(data.d[0]["Address"])
            $('#txtMobileno').val(data.d[0]["ContactNumber"]);    
            $('#txtEmailID').val(data.d[0]["Email"]);
            
            },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
        }
 });
}

function UpdateProfile()
{
      var name = $('#txtname').val();
      var address1 = $('#txtLocation').val();
      var address2 = $('#txtLocation2').val();
      var email = $('#txtEmailID').val();
      var phoneno = $('#txtMobileno').val();
      
      var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/UpdateOperatorDetails";
        $.ajax(url,{
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +relatedId+"','name':'" +name+"','address1':'" +address1+"','address2':'" +address2+"','contactNumber':'" +phoneno+"','emailID':'" +email+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: ShowData,            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
 });
}

function CancelProfile()
{
    getProfile();
}