var QString = window.location.search.substring(1);
var userId = QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

var timereOut;
        function SubmitDeal() {
            $("#divDealload").show();
            $('#transparent_div').show();
            
             timereOut = window.setInterval(function () {
                $("#divDealload").show();
                $('#popup_box').hide();
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
                                        $('#popup_box').show();
                                        $('#divDeal').show();
                                        $('#lbldealjob').text(data.d[0]);
                                        $('#lbldealfrom').text(data.d[1]);
                                        $('#lbldealto').text(data.d[2]);
                                        $('#lbldealdistance').text(data.d[3]);
                                        $('#lbldealdate').text(data.d[4]);
                                        $('#lbldealtime').text(data.d[5]);
                                        $('#lbldealfare').text(data.d[6]);
                                        $('#isReturnJourney').val(data.d[7]);
                                        $('#transparent_div').show();
                                    }
                                    else if (data.d[0] === "Error") {
                                        $('#popup_box').hide();
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
                            console.log(jobNo)
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
                                        alert('Sorry, you have not been selected for this job.');
                                        $('#tbdetails').hide();
                                        $('#button-table').hide();
                                        $('#transparent_div').hide();
                                        window.location = 'driverHome.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
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
            }, 10000);

            function DestroyMe() {
                window.clearInterval(timereOut);
            }
        }

        function showBid() {
            $('#popup_box').show();
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

        function bidSubmit() {
            var isCabnow = $('#hiddenIsCabnow').val();
             var selectedvehicle = document.getElementById("ddlselectedvehicle");
                 var selectedcab = selectedvehicle.options[selectedvehicle.selectedIndex].value;
        // alert(selectedcab);
            console.log(selectedcab);
            if (isCabnow === "True") {
                var fare = $('#txtbidFare').val();
                if (fare.length <= 0) {
                    alert('Please enter fare.');
                    return false;
                }
                 
                
                
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

                $('#popup_box').hide();
                if (fare.length > 0) {
                    SubmitDeal();
                }
            }

            else if (isCabnow === "False") {
                var fare2 = $('#txtbidFare').val();
                if (fare2.length <= 0) {
                    alert('Please enter fare.');
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
                            alert('In progress. Awaiting customer response.');
                            window.location = 'driverHome.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;
                        }
                        else if (data.d === "false") {
                            alert('Unknown error. Please try again.');
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    }
                });
                $('#popup_box').hide();
            }
        }

        function bidCancel() {
            $('#popup_box').hide();
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
                        alert('Congratulations! We recommend you contact the customer directly to confirm the pickup details.');
                        $("#divDealload").show();
                        $('#transparent_div').show();
                        window.location = 'driverHistory.html?id=' + userId + '&rid=' + roleId + '&rrid=' + relatedId;               
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
                success: function (data) {
                   if(data.d !== "")
                    {
                        console.log(data.d);
                        var returnvalue = data.d;
                        if (returnvalue.match(/"Error:"/g) > 0) {
                            alert(returnvalue);
                        }
                        else{
                            console.log("HI");
                            window.location.href=data.d;
                            //alert('Job booked successfully.');
                            //window.location = 'driverHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
                        }
                    }
                    else{
                        alert("Nothing returned from service.");
                    }
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
                success: function (data) {
                   if(data.d !== "")
                    {
                        console.log(data.d);
                        var returnvalue = data.d;
                        if (returnvalue.match(/"Error:"/g) > 0) {
                            alert(returnvalue);
                        }
                        else{
                            window.location.href=data.d;
                        }
                    }
                    else{
                        alert("Nothing returned from service.");
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
            var status = "Rejected at commission time";
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
            $('#popup_box').hide();
        }

        function btnAbort() {
            $('#popup_box').show();
            $('#divabort').show();
        }
        
        function abortcancel() {
            $('#popup_box').hide();
            $('#divabort').hide();
        }

function reqReject() {            
    navigator.notification.confirm(
    "Do you want to reject the job?",
    onRejectCallback,
    "Confirm",
    "Yes,No"  
    );
}

function onRejectCallback(buttonIndex)
{
    if(buttonIndex === 2)
    {
        return false;
    }
    else if(buttonIndex === 1)
    {
           
            var rid = $('#hdnJobno').val();
            console.log(rid);
            var status = "Rejected";
            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RejectResponse",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + rid + "','status':'" + status + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if(data.d === true)
                    {
                      console.log('rej')
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

