//query string
var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

//setTimeout(function(){
//    $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/ChangeDriverStatus",
//            type:"POST",
//            dataType: "Json",
//            data:"",
//            contentType: "application/json; charset=utf-8",                     
//            success: function(data)
//            {
//                
//            },
//            
//            error: function (XMLHttpRequest, textStatus, errorThrown) {
//            //alert(errorThrown);
//                }
//         }); 
//    },1000); 

 $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/DriverAvaibalility",
        type:"POST",
        dataType: "Json",
        data:"{'relatedId':'"+relatedId+"'}",
        contentType: "application/json; charset=utf-8",                     
        success: function(data)
        {
            if(data.d == "true")
            {
                $('#lblEngaged').show();
                $('#lblEngaged').text("Engaged");    
            }
            else if(data.d == "false")
            {
                $('#lblEngaged').show();
                $('#lblEngaged').text("No new job");
                $('#btnabort').hide();
                $('#btnclear').hide();
            }
            
        },
        
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
     }); 

function AbortJob()
{
    var istrue = confirm("Do you want to abort this job?");
    if(istrue)
    {
       $('#popup_box1').show();
       $('#divAbortTask').show();
    }
    else{
       return false;
    }
}

//Driver status 
 function DriverStatus(){
   window.location = 'driverStatusUpdate.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


//diver Profile
function DriverProfile()
{
    window.location = 'driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//Driver Jobs
function Jobs()
{
    //window.location = 'pop.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
}

//diver Profile from menu
function myProfile()

{
    
    window.location='driverProfile.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//Driver Jobs from menu
function MyBookings(){
    window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
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
        $.cookie("userName", 'null');
        $.cookie("userPassword", 'null');
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
    
    //TODO: write service to abort the job and send email to the customer
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
}

function clearJob()
{
    var isTrue = confirm('Do you want to clear the job?');
    if(isTrue)
    {
        alert('cleared');
    }
    else
    {
        return false;
    }
}


//Driver Status
function myhome(){
    window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


//Driver Feedback
function feedBack()
{
    window.location='driverFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//History
function bookedHistory()
{
  window.location='driverHistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;  
}

 //Accepting the Request.    
          function seeRequest()
          {
              window.location='DriverJob.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
          }
          
          
        
