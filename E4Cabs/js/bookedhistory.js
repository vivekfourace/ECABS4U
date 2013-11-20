//Query String
var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

//back to index page
function backToIndex()
{
   window.location =  'customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
  
}
window.onload = gethistory();

//getting the history details of booked cab
function gethistory()
{
   var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerHistoryDetails";
                $.ajax(url, {
                    type:"POST",
                    datatype:"json",
                    data:"{'relatedId':'"+relatedId+"'}",
                   contentType: "application/json; charset=utf-8",
                    success: function (data) {                   
                        var count = data.d.length;
                        //alert(count);
                        if(count > 0)
                        {
                                var html = '<table id="tbhist" cellspacing="0"; width="100%"  style="border-collaspe:collaspe;">';
                                html += '<thead style="background-color:#0A0A2A;color:#fff;">';
                                html += '<tr>';
                                html += '<th class="th4 font">JobNo</th>';
                                html += '<th class="th4 font">Date</th>';
                                html += '<th class="th4 font">Time</th>';
                                html += '<th class="th4 font">From</th>';
                                html += '<th class="th4 font">To</th>';
                                
                                html += '</tr>';
                                html += '</thead>';
                                               html +='<tbody class="body-style altColor"  style="font-size:14px;">';  
                                                    for(var i=0; i<count; i++)
                                                    {
                                                        $('#lbljobFeed').text(data.d[i]["JobNo"]);
                                                       html += '<tr>';
                                                       html += "<td width='25%' align='center'>" +'<a href="#" onclick="feedBackCustomer()" style="color:blue;">'+ data.d[i]["JobNo"]+'</a>' + "</td>"; 
                                                       html += "<td width='25%' align='center'>" + data.d[i]["StartDate"] + "</td>";
                                                       html += "<td width='25%' align='center'>" + data.d[i]["StartTime"] +"</td>";
                                                       html += "<td width='25%' align='center'>" + data.d[i]["FromLoc"] +"</td>";
                                                       html += "<td width='25%' align='center'>" + data.d[i]["ToLoc"] +"</td>";
                                                         
                                                       html += '</tr>';
                                                    }
                                               html +='</tbody>';
                                   html +='</table>';
                                $('#msg').append(html);
                         }
                        else
                        {
                            alert("No history found");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) 
                    {
                        alert(errorThrown);
                    }
                });
                
            }
//feedback
function feedBackCustomer()
{
    $('#msg').on('click', 'tr', function (event) { 
      $('#lbljobNo').text(this.cells[0].innerText);
      $('#lblFeeddate').text(this.cells[1].innerText);
      $('#lblFeedTime').text(this.cells[2].innerText);
      $('#lblFeedFrom').text(this.cells[3].innerText);
      $('#lblFeedTo').text(this.cells[4].innerText);
     
        
    });
    $('#popup_box').show();
    $('#divFeedBack').show();
}

//cancel feedback
function CancelFeedBack()
{
    $('#divFeedBack').hide();
    $('#popup_box').hide();
    
    
}
//feedback post
function PostFeedBack()
{
   var requestID=$('#lbljobNo').text();
   var getRating=document.getElementById('sel').value;
   var getComments=document.getElementById('txtarComments').value;
   $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerFeedbackForDriver",
            type:"POST",
            dataType: "Json",
            data:"{'userID':'" +relatedId+"','reqID':'" +requestID+"','rating':'" +getRating+"','feedback':'" +getComments+"'}",
            contentType: "application/json; charset=utf-8",                     
            success: function(data)
            {
                alert("Feedback comment posted successfully!");
                $('#divFeedBack').hide();
                $('#popup_box').hide();
                },
            
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
                }
         });  
}

//cab Now
function cabNow()
{
      window.location='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
    
}

//Pre Cab
function preCab()
{
     window.location='customerSearch.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//Booked History
function bookedHistory()
{
      window.location='bookedhistory.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}

//My Profile Button
function myProfile()
{
     window.location =  'customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 }

//Logout
function logout()
 {
          $.ajax({url:"http://115.115.159.126/ECabs/ECabs4U.asmx/logout",
                type:"POST",
                dataType: "Json",
                data:"{'userID':'" +userId+"'}",
                contentType: "application/json; charset=utf-8",                     
                success: function(data)
                {
                    },
                
                error: function (XMLHttpRequest, textStatus, errorThrown)
              {
              }
          });          
          $.cookie("remember", false);
          $.cookie("userName", 'null');
          $.cookie("userPassword", 'null');
          window.location = "index.html";  
  }




//Customer Feedback 
function feedBack()
{
    window.location='customerFeedback.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
}


function backtostart()
{
    window.location="index.html";
}

    
    
    
