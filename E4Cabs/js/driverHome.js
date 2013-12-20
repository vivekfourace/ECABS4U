var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function  NavigateToMap()
{
    window.location = 'Navigation.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

 $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/DriverAvaibalility",
        type:"POST",
        dataType: "Json",
        data:"{'relatedId':'"+relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: function(data)
        {
            if(data.d == true)
            {
                $('#lblEngaged').show();
                $('#lblEngaged').text("Engaged");
                $('#btnEngage').hide();
                $('#btnabort').show();
                $('#btnclear').show();
                $('#btnnavigation').show();
            }
            else if(data.d == false)
            {
                $('#lblEngaged').show();
                $('#lblEngaged').text("Available");               
            }
        },
        
        error: function (XMLHttpRequest, textStatus, errorThrown) {}
     }); 

function AbortJob()
{
    var istrue = confirm("Confirm you want to abort this job?");
    if(istrue)
    {
       $('#popup_box1').show();
       $('#divAbortTask').show();
       $('#transparent_div').show();
    }
    else{
       return false;
    }
}


//diver Profile from menu
function myProfile()
{
    window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//Driver Jobs from menu
function MyBookings(){
    window.location='DriverCabLaterBooking.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function logout(){
          
        $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/logout",
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +userId+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {
                },
            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
                }
         }); 
        $.cookie("remember", false);
        window.location = "index.html";  
}

function SubmitAbort()
{
    var abortMessage = $('#txtAbortmsg').val();
    if(!abortMessage)
    {
        alert('Please enter a reason.');
        return false;
    }
      var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/AbortCurrentJob";
    
            $.ajax(url,{
                     beforeSend: function(){
                        $('#imgLoader').show();
                     },
                     complete: function(){
                        $('#imgLoader').hide();
                         
                     },
                     type:"POST",
                     datatype:"json",
                     data:"{'relatedId':'" +relatedId+ "','abortMessage':'"+abortMessage+"'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: function(data){
                         if(data.d == "true")
                         {                            
                              $('#popup_box1').hide();
                              $('#divAbortTask').hide();
                              $('#transparent_div').hide();
                              $('#txtAbortmsg').val("");
                              alert("Job aborted successfully.");
                              window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                         }                         
                     },
                    
                     error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // alert(errorThrown);
                }
             });
    
}

function cancelAbort()
{
    $('#popup_box1').hide();
    $('#divAbortTask').hide();
    $('#txtAbortmsg').val("");
    $('#transparent_div').hide();
}

function clearJob()
{
    var isTrue = confirm('Confirm you want to clear the job?');
    if(isTrue)
    {
            $.ajax({
                url:"http://115.115.159.126/ECabs/ECabs4U.asmx/ClearDriverStatus",
                     type:"POST",
                     datatype:"json",
                     data:"{'relatedId':'"+relatedId+"'}",
                     contentType: "application/json; charset=utf-8",                     
                     success: function(data){
                         if(data.d == true)
                         {
                            window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                         }
                         
                     },
                     error: function (XMLHttpRequest, textStatus, errorThrown) {}
            });
    }
    else
    {
        return false;
    }
}

function engageMe()
{
    window.location='DriverCabLaterJobs.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
}

//Driver Status
function myhome(){
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

function feedBack()
{
    window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//History
function bookedHistory()
{
  window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;  
}

    
 function seeRequest()
 {
     window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 }

function closeRequest()
{
         $.ajax({
                  url:'http://115.115.159.126/ECabs/ECabs4U.asmx/CancelNewJob', 
                  type:"POST",
                  datatype:"json",
                  data:"{'userID':'" +relatedId+ "'}",
                  contentType: "application/json; charset=utf-8",                     
                  success: function (data) 
                     {
                         $('#popup_box').hide();
                         $('#divDealStart').hide();
                         $('#transparent_div').hide();
                    },
                  error: function (XMLHttpRequest, textStatus, errorThrown)
                     {
                         $('#popup_box').hide();
                         $('#divDealStart').hide();
                         $('#transparent_div').hide();
                      }
            });
    
}
          
          
        
