var QString = window.location.search.substring(1);
var userId = QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

var timereOut;
        function SubmitDeal() {
            $('#divJobDetail').hide();
            $("#divDealload").show();
            $('#transparent_div').show();
            
             timereOut = window.setInterval(function () {
                $("#divDealload").show();
                $('#popup_box22').hide();
                $('#divDeal').hide();
                var jobNo = $('#hdnJobno').val();
                
                $.ajax({
                    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/DealResponse",
                    type: "POST",
                    dataType: "Json",
                    data: "{'userID':'" + relatedId + "', 'jobNo':'" + jobNo + "'}",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        var getResID = data.d[0];
                        var popUpDisplay = data.d[1];
                        var customerResponse = data.d[2];
                        var isJobAlive = data.d[3];                       

                      
                         
                        if ( popUpDisplay === "False") {
                            $.ajax({
                                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetDealData",
                                type: "POST",
                                dataType: "Json",
                                data: "{'JobNo':'" + getResID + "','driverId':'" + relatedId + "'}",
                                contentType: "application/json; charset=utf-8",
                                success: function (data)
                                {
                                    
                                    if (data.d[0] !== "Error" && isJobAlive === "True") {
                                        $("#divDealload").hide();
                                        $('#popup_box22').show();
                                        $('#divDeal').show();
                                        $('#divJobDetail').hide();
                                        $('#lbldealjob').text(data.d[0]);
                                        $('#lbldealfrom').text(data.d[1]);
                                        $('#lbldealto').text(data.d[2]);
                                        $('#lbldealdistance').text(data.d[3]);
                                        $('#lbldealdate').text(data.d[4]);
                                        $('#lbldealtime').text(data.d[5]);
                                        $('#lbldealfare').text(data.d[6]);
                                        $('#isReturnJourney').val(data.d[7]);
                                        
                                        var returnfromdeal=$('#lblreturnFrom').text();
                                         var returntodeal=$('#lblreturnTo').text();
                                        var returnDatedeal=$('#lblreturnDate').text();
                                        var returnTimedeal=$('#lblreturnTime').text();
                                        if(!returnfromdeal ||!returntodeal)
                                        {
                                            $('#rdealFrom').hide();
                                            $('#rdealTo').hide();
                                            $('#rdealDate').hide();
                                            $('#rdealTime').hide();
                                            
                                        }
                                        else
                                        {
                                            $('#rdealFrom').show();
                                            $('#rdealTo').show();
                                            $('#rdealDate').show();
                                          
                                            $('#rdealTime').show();
                                            $('#lbldealreturnFrom').text(returnfromdeal);
                                            $('#lbldealreturnTo').text(returntodeal);
                                            $('#lbldealreturnDate').text(returnDatedeal);
                                            $('#lbldealreturnTime').text(returnTimedeal);
                                            
                                            
                                        }
                                        
                                        
                                        
                                        $('#transparent_div').show();
                                    }
                                    else if (data.d[0] === "Error") {
                                        $('#popup_box22').hide();
                                        $('#divDeal').hide();
                                        $("#divDealload").show();
                                    }
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                }
                            });

                        }
                        else
                        {
                             $.ajax({
                                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/JobStatus",
                                type: "POST",
                                dataType: "Json",
                                data: "{'JobNo':'" + jobNo + "','driverId':'" + relatedId + "'}",
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    console.log(data.d)
                                    if(data.d === "False")
                                    {
                                        DestroyMe();
                                        $('#divDealload').hide();
                                        $('#button-table').hide();
                                       // alert('Sorry, you have not been selected for this job.');
                                       // $('#tbdetails').hide();
                                       // $('#button-table').hide();
                                        //$('#transparent_div').hide();
                                        //window.location = 'driverHome.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
                                        
                                        navigator.notification.alert(
                        			    "Sorry, you have not been selected for this job.",
                          	          sorryMsg221, // Specify a function to be called 
                         				   'ECABS4U',
                         					"OK"
                        					);
                                         function sorryMsg221()
                                         {
                            		      $('#tbdetails').hide();
                                              $('#button-table').hide();
                                             $('#transparent_div').hide();
                                             window.location = 'driverHome.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
                        				}
                                    
                                    }
                                },
                            });
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {

                        $('#divDeal').hide();
                        $('#divDealload').hide();
                        deleteDriver();
                    }
                });
            }, 30000);

            function DestroyMe() {
                window.clearInterval(timereOut);
            }
        }

        function showBid() {
            $('body').css('overflow','hidden');
            $('#popup_box22').show();
            $('#transparent_div').show();
            $('#divBid').show();
            var job = $('#lbljobno').text();
            var distance = $('#lblDistance').text();
            var from = $('#lblFromLoc').text();
            var to = $('#lblToLoc').text();
            
           $('#lblbidjob').text(job);
           $('#lblbiddistance').text(distance);
           $('#lblbidfrom').text(from);
           $('#lblbidto').text(to);
           var fare = $('#txtbidFare').val()
           $('#lblfare').text(fare);
             
           
            
            //Return data 
            //Bid popup
           var returnfrom=$('#lblreturnFrom').text();
           var returnto=$('#lblreturnTo').text();
            
            if(!returnfrom)
           {
              $('#rtnfrom').hide();  
           }
            else
           {
               $('#lblbidreturnfrom').text(returnfrom);
           }
           if(!returnto)
           {
             $('#rtnto').hide();   
          
           }
            else
           {
                $('#lblbidreturnto').text(returnto);
           }
            
            
            $('#lblbidjob').text(job);
            $('#lblbiddistance').text(distance);
            $('#lblbidfrom').text(from);
            $('#lblbidto').text(to);
            var fare = $('#txtbidFare').val()
            $('#lblfare').text(fare);
      }


//Full Job Detail

function showFullJobDetail()
{   $("#divDeal").hide(); 
    var data = $('#lbljobno').text();
    $.ajax({
    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/FullJobDetail",
    type:"POST",
    datatype:"json",
    data: "{'JobNo':'" + data + "','driverId':'" + relatedId + "'}",
    contentType: "application/json; charset=utf-8",
    success: showDetailFull,
    error: function (XMLHttpRequest, textStatus, errorThrown) { }
    });    
    
}

function showDetailFull(data)
{
    $('#lblJobNo').text(": "+data.d[0]);
    $('#lblFrom').text(": "+data.d[1]);
    $('#lblTo').text(": "+data.d[2]);
    $('#lblDistancepopup').text(": "+data.d[3]);
    
    $('#lbltDate').text(": "+data.d[4]);
    $('#lblTime').text(": "+data.d[5]);
    $('#lblFare').html(": "+'&pound'+data.d[6]);
    $('#lblCustomerName').text(": "+data.d[8]+" "+ data.d[9]);
   // $('#lblreturnfrom2').text(": "+data.d[10]);
    //$('#lblreturnto2').text(": "+data.d[11]);
    $('#lblNoOfPassenger').text(": "+data.d[12]);
    $('#lblWheelchair').text(":"+data.d[13]);
    $('#lblLargeCase').text(":"+data.d[14]);
    $('#lblSmallCase').text(":"+data.d[15]);
    $('#lblSpecialReq').text(":"+data.d[16]);
    $('#lblChildBoosters').text(":"+data.d[17]);
    $('#lblChildSeats').text(":"+data.d[18]);
  
    //alert(data.d[16]);
   // alert(data.d[10]);
    //alert(data.d[11]);
    if(data.d[7]=== "True")
    {
        $('#rtnfrom2').show();
        $('#lblreturnfrom2').text(": "+data.d[10]);
        $('#rtnto2').show();
        $('#lblreturnto2').text(": "+data.d[11]);
   }
    else
    {
        $('#rtnfrom2').hide();
       $('#rtnto2').hide();
    }
    
    
  
    //$('#lblCustomerContact').text(data.d[7]);
    //$('#lblCustomerContact').css("font-weight", 900);   
   
   
     $('#popup_box22').show();
     $('#transparent_div').show();
     $('#divJobDetail').show();
    
}


function Cancel2()
{
    
    $('#popup_box22').fadeOut("fast");
    $('#divJobDetail').hide();
     $('#transparent_div').hide();
SubmitDeal();
}

var isCabnow;
function bidSubmit() {
            isCabnow = $('#hiddenIsCabnow').val();
             var selectedvehicle = document.getElementById("ddlselectedvehicle");
                 var selectedcab = selectedvehicle.options[selectedvehicle.selectedIndex].value;
        // alert(selectedcab);
            console.log(selectedcab);
            if (isCabnow === "True") {
                var fare = $('#txtbidFare').val();
                if (fare.length <= 0 ||  parseInt(fare.trim()) === 0 || fare.charAt(0) === "0") {
                   // alert('Please enter correct fare amount.');
                    
                    navigator.notification.alert(
                          'Please enter correct fare amount.',
                           nowJobFarevalidation, 
                           'ECABS4U',
                           "OK"
                           );
                           function nowJobFarevalidation()
                           {
                               //alert("in");
                              // window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;		      
                           }
                   
                    return false;
                }
                 
                
                
                $('body').css('overflow','auto');
                $("#divDealload").show();
                //$("#other").hide();
                //$("#fare").hide();
                $('#divBid').hide();
                var job = $('#lbljobno').text();
                var distance = $('#lblDistance').text();
                var from = $('#lblFromLoc').text();
                var to = $('#lblToLoc').text();
                var specialReq = $('#txtSpecialReq').val();
               

                $('#lblbidjob').text(job);
                $('#lblbiddistance').text(distance);
                $('#lblbidfrom').text(from);
                $('#lblbidto').text(to);

                $('#lblfare').text(fare);
                var rid = $('#lblbidjob').text();
                var status = true;
                var price = fare;
                $.ajax({
                    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/setDriverResponse",
                    type: "POST",
                    dataType: "Json",
                    data: "{'userID':'" + relatedId + "','reqid':'" + rid + "','status':'" + status + "','price':'" + price + "','specialReq':'" + specialReq + "'}",
                    contentType: "application/json; charset=utf-8",
                    success: {},
                    error: function (XMLHttpRequest, textStatus, errorThrown) {

                    }
                });

                $('#popup_box22').hide();
                if (fare.length > 0) {
                    SubmitDeal();
                }
            }

            else if (isCabnow === "False") {
                var fare2 = $('#txtbidFare').val();
                //console.log(fare2);
                if(fare2.length <= 0 ||  parseInt(fare2) === 0 || fare2.charAt(0) === "0") {
                    //alert('Please enter correct fare amount.');
                    //jAlert('Please enter fare.', 'ECabs4U');
                    navigator.notification.alert(
                          'Please enter correct fare amount.',
                           laterJobFarevalidation, 
                           'ECABS4U',
                           "OK"
                           );
                           function laterJobFarevalidation()
                           {
                               //alert("in");
                              // window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;		      
                           }
                    
                    return false;
                }
                $('#lblbidjob').text(job);
                //var selectedvehicle2 = document.getElementById("ddlselectedvehicle");
               //  var selectedonelater = selectedvehicle2.options[selectedvehicle2.selectedIndex].value;

                $('#lblfare').text(fare2);
                var reqid = $('#lblbidjob').text();
                var statuS = true;
                var pricE = fare2;
                var specialreq = $('#txtSpecialReq').val();
                 //alert(selectedcab);

                $.ajax({
                    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/SetDriverResponseCabLater",
                    type: "POST",
                    dataType: "Json",
                    data: "{'userID':'" + relatedId + "','reqid':'" + reqid + "','status':'" + statuS + "','price':'" + pricE + "','specialReq':'" + specialreq + "','selectedVehicle':'" + selectedcab + "'}",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data.d === "true") {
                            //alert('In progress. Awaiting customer response.');
                           // window.location = 'driverHome.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
                              navigator.notification.alert(
            			        "In progress. Awaiting customer response.",
              	              cabLaterProgress221, // Specify a function to be called 
             				   'ECABS4U',
             					"OK"
            					);
                             function cabLaterProgress221()
                             {
                		      window.location = 'driverHome.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
            				 }
                        }
                        else if (data.d === "false") {
                            //alert('Unknown error. Please try again.');
                            
                                navigator.notification.alert(
            			        "Unknown error. Please try again.",
              	              cabLatererror222, // Specify a function to be called 
             				   'ECABS4U',
             					"OK"
            					);
                             function cabLatererror222()
                             {
                		      
            				 }
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    }
                });
                $('#popup_box22').hide();
            }
        }

        function bidCancel() {
            $('body').css('overflow','auto');
            $('#popup_box22').hide();
            $('#divBid').hide();
            $('#transparent_div').hide();
        }
        
        function dealSubmit() {            
            window.clearInterval(timereOut);
            $('#divDeal').hide();
            var getIsReturnJourney = $('#isReturnJourney').val();
            var getFare = $('#lbldealfare').text();
            var reqID = $('#lbldealjob').text();
  
            
            if(getFare>=11 && getFare<= 20)
            {
              $('#divDeal').hide();
              $('#divComission').show();
              $('#lblconfirmjob').text(reqID);
              $('#lblconfirmfare').text(getFare);
                
            }
            
           else if(getFare >= 21)
            {
              $('#divComission2').show();
              $('#lblconfirmjob2').text(reqID);
              $('#lblconfirmfare2').text(getFare); 
                
            }
            else
            {
                 $('#divComission').hide();
                 $('#divComission2').hide();
                 $('#transparent_div').show();
                 $('#imgLoader').show();
                 SaveDataOfCurrentJob();
                
            }
            
        }

function SaveDataOfCurrentJob()
{
    console.log("saving current job data");
    var requestId = $('#hdnJobno').val();
    $.ajax({
            url: "http://115.115.159.126/ECabs/ECabs4U.asmx/SaveData",
            type: "POST",
            dataType: "Json",
            data: "{'driverId':'" + relatedId + "','requestId':'" + requestId + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if(data.d === true)
                {
                    $.ajax({
                    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/JobBooked",
                    type: "POST",
                    dataType: "Json",
                    data: "{'userID':'" + relatedId + "','reqid':'" + requestId + "'}",
                    contentType: "application/json; charset=utf-8",
                    success: function () {                        
                        $('#button-table').hide();                                                
                        //alert('Congratulations! We recommend you contact the customer directly to confirm the pickup details.');
                        //$("#divDealload").show();
                        //$('#transparent_div').show();
                        //window.location = 'driverHistory.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId; 
                               navigator.notification.alert(
				        	  "Congratulations! We recommend you contact the customer directly to confirm the pickup details.",
  				       	 jobBookedSuccess, // Specify a function to be called 
 					   	  'ECABS4U',
 							 "OK"
							  );
                        	  function jobBookedSuccess()
                        	  {
                        	     $("#divDealload").show();
                        	    $('#transparent_div').show();
    			     		   window.location = 'driverHome.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId; 
							  }
                    },
                });
              }                    
          },
     });
}

        function RemoveDriverData() {
            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RemoveDriverResponse",
                type: "POST",
                dataType: "Json",
                data: "{'driverID':'" + relatedId + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        }

        function Confirmcomission() {
            $('#imgLoader').show();
            var reqID = $('#lblconfirmjob').text();
            //var comission = 1.2;
            console.log("saving current job data");
            $.ajax({
                beforeSend: function(){
                   $('#imgLoader').show();
                },
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CabLaterJobBooked",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + reqID + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) 
                {
                    if(data.d !== "")
                         {
                            var returnvalue = data.d;
                            if (returnvalue.match(/"Error:"/g) > 0)
                            {
                               // alert(returnvalue);
                              //  window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                                
                               navigator.notification.alert(
        			          returnvalue,
          	                  paymentError224, // Specify a function to be called 
         				       'ECABS4U',
         					    "OK"
        					    );
                                function paymentError224()
                             {
            		          window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
        				     }
                                
                            }

                            else if(data.d.substring(0,4) === "Job "){
                               // alert(data.d);
                               // alert('Job booked successfully.');
                               //window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                               navigator.notification.alert(
            			        "Job booked successfully.",
              	              jobBooked241, // Specify a function to be called 
             				   'ECABS4U',
             					"OK"
            					);
                              function jobBooked241()
                              {
                		     window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
            				  }
                            }

                            else if(data.d.substring(0,4) === "Plea"){
                               // alert(data.d);
                               // window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                                 navigator.notification.alert(
                			    data.d,
                  	          paymentError227, // Specify a function to be called 
                 				   'ECABS4U',
                 					"OK"
                					);
                                 function paymentError227()
                                 {
                    		      window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                				 }
                            }

                            else
                            {
                                document.addEventListener("deviceready", onDeviceReady, false);

                                function iabLoadStart(event) { }

                                function iabLoadStop(event) { }

                                function iabClose(event) {
                                  iabRef.removeEventListener('loadstart', iabLoadStart);
                                  iabRef.removeEventListener('loadstop', iabLoadStop);
                                  iabRef.removeEventListener('exit', iabClose);
                                  window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;                                     
                                }

                                function onDeviceReady() {
                                  iabRef = window.open(data.d, '_blank', 'location=yes');
                                  iabRef.addEventListener('loadstart', iabLoadStart);
                                  iabRef.addEventListener('loadstop', iabLoadStop);
                                  iabRef.addEventListener('exit', iabClose);
                                }                 
                            }
                         }
                   
                   ///new 
                   //if(data.d !== "")
                   // {
                   //     console.log(data.d);
                   //     var returnvalue = data.d;
                   //     if (returnvalue.match(/"Error:"/g) > 0)
                   //     {
                   //     	alert(returnvalue);
                   //     }
                   //      else if(data.d === "true")
                   //     {
                   //         alert('Job booked successfully.');
                   //        window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                   //         
                   //         //old
                   //         
                   //          /*document.addEventListener("deviceready", onDeviceReady, false);
                   //         
                   //          function iabLoadStart(event) {
                   //                 //alert(event.type + ' - ' + event.url);
                   //             }
                   //            
                   //             function iabLoadStop(event) {
                   //                 //alert(event.type + ' - ' + event.url);
                   //             }
                   //            
                   //             function iabClose(event) {
                   //                  //alert(event.type);
                   //                  iabRef.removeEventListener('loadstart', iabLoadStart);
                   //                  iabRef.removeEventListener('loadstop', iabLoadStop);
                   //                  iabRef.removeEventListener('exit', iabClose);
                   //                 window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                   //                 
                   //             }
                   //            
                   //             // Cordova is ready
                   //             //
                   //             function onDeviceReady() {
                   //                  iabRef = window.open(data.d, '_blank', 'location=yes');
                   //                  iabRef.addEventListener('loadstart', iabLoadStart);
                   //                  iabRef.addEventListener('loadstop', iabLoadStop);
                   //                  iabRef.addEventListener('exit', iabClose);
                   //                 // setTimeout(function()
                   //                 //{
             		//				//iabRef.close();
        			//				 //}, 60000);
                   //             } */               
                   //     }
                     //}
                     else
                     {
                         navigator.notification.alert(
    			        "Unable to do payment. Please try again.",
      	              paymentError225, // Specify a function to be called 
     				   'ECABS4U',
     					"OK"
    					);
                         function paymentError225()
                         {
        		          
    				     }
                        //alert("Unable to do payment. Please try again.");
                     }
                    
                    
                   //if(data.d !== "")
                   // {
                   //     console.log(data.d);
                   //     var returnvalue = data.d;
                   //     if (returnvalue.match(/"Error:"/g) > 0) {
                   //         alert(returnvalue);
                   //     }
                   //     else{
                   //         console.log("HI");
                   //         window.location.href=data.d;
                   //         //alert('Job booked successfully.');
                   //         //window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                   //     }
                   // }
                   // //else{
                   ////     alert("Nothing returned from service.");
                   //// }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                            console.log("hierror");
                }
            });
            
        }

        function Confirmcomission2() {
            $('#imgLoader').show();
            var reqID = $('#lblconfirmjob2').text();
             $.ajax({
                beforeSend: function(){
                   $('#imgLoader').show();
                },               
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/CabLaterJobBooked",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + reqID + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data)
                 {
                     if(data.d !== "")
                      {
                        var returnvalue = data.d;
                        if (returnvalue.match(/"Error:"/g) > 0)
                        {
                           // alert(returnvalue);
                           // window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                            navigator.notification.alert(
        			          returnvalue,
          	                  paymentError424, // Specify a function to be called 
         				       'ECABS4U',
         					    "OK"
        					    );
                                function paymentError424()
                             {
            		          window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
        				     }
                        }

                        else if(data.d.substring(0,4) === "Job "){
                          // alert('Job booked successfully.');
                         //  window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                            navigator.notification.alert(
            			        "Job booked successfully.",
              	              jobBooked441, // Specify a function to be called 
             				   'ECABS4U',
             					"OK"
            					);
                              function jobBooked441()
                              {
                		     window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
            				  }
                        }

                        else if(data.d.substring(0,4) === "Plea"){
                           //alert(data.d);                            
                           //window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                            navigator.notification.alert(
                			    data.d,
                  	          paymentError427, // Specify a function to be called 
                 				   'ECABS4U',
                 					"OK"
                					);
                                 function paymentError427()
                                 {
                    		      window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                				 }
                        }

                        else
                        {
                            document.addEventListener("deviceready", onDeviceReady, false);

                            function iabLoadStart(event) { }

                            function iabLoadStop(event) { }

                            function iabClose(event) {
                              iabRef.removeEventListener('loadstart', iabLoadStart);
                              iabRef.removeEventListener('loadstop', iabLoadStop);
                              iabRef.removeEventListener('exit', iabClose);
                              window.location='driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;                                     
                            }

                            function onDeviceReady() {
                              iabRef = window.open(data.d, '_blank', 'location=yes');
                              iabRef.addEventListener('loadstart', iabLoadStart);
                              iabRef.addEventListener('loadstop', iabLoadStop);
                              iabRef.addEventListener('exit', iabClose);
                            }                 
                        }
                     }
                     else
                     {
                        //alert("Unable to do payment. Please try again.");
                         
                          navigator.notification.alert(
    			        "Unable to do payment. Please try again.",
      	              paymentError425, // Specify a function to be called 
     				   'ECABS4U',
     					"OK"
    					);
                         function paymentError425()
                         {
        		          
    				     }
                     }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                            console.log("hierror");
                }
            });
        }

        function RejectComission() {
            $('#divComission').hide();
            $('#divComission2').hide();
            var rid = $('#hdnJobno').val();           
            var status = rid+" Rejected at commission time.";
            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RejectResponse",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + rid + "','status':'" + status + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if(data.d === true)
                    {
                      console.log('rej');
                      window.location = 'driverHome.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
                    }
                    else
                    {
                        console.log('Exception in RejectResponse')
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {}
            });
        }

        function dealCancel() {
            $('#divDeal').hide();
            $('#popup_box22').hide();
        }

        function btnAbort() {
            $('#popup_box22').show();
            $('#divabort').show();
        }
        
        function abortcancel() {
            $('#popup_box22').hide();
            $('#divabort').hide();
        }

function reqReject(sendToCustomer) { 
    navigator.notification.confirm(
    "Do you want to reject the job?",
    onRejectCallback,
    "Confirm",
    "Yes,No"  
    );
    
    function onRejectCallback(buttonIndex)
    {
        if(buttonIndex === 2)
        {
            return false;
        }
        else if(buttonIndex === 1)
        {   
            var rid = $('#hdnJobno').val();
            var status = "";
            if(isCabnow === "False")
              status = "Bid rejected by driver for JobNo "+ rid +".";
            
            if(sendToCustomer === 1)
                status = "";
            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RejectResponse",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + rid + "','status':'" + status + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if(data.d === true)
                    {
                      window.location = 'driverHome.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
                    }
                    else
                    {
                        console.log('Exception in RejectResponse');
                    }
                },
            });
        }
    }

}
