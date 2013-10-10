<!DOCTYPE html>
<html>
<head>
    <title></title>
    <link rel="stylesheet" type="text/css" href="css/index.css" />
    <link rel="stylesheet" type="text/css" href="jquery-mobile/styles/jquery.ui.theme.css" />
    <link rel="stylesheet" type="text/css" href="jquery-mobile/styles/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery.mobile.css" />
    <link rel="stylesheet" type="text/css" href="css/site.css" />
    <link rel="stylesheet" type="text/css" href="css/PopUp.css" />
    <script type="text/javascript" src="Scripts/jquery-1.8.2.js"></script>
    <script type="text/javascript" src="Scripts/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="Scripts/jqx-all.js"></script>
    <script type="text/javascript" src="Scripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="Scripts/jquery.unobtrusive-ajax.min.js"></script>
    <script type="text/javascript" src="js/DriverJob.js"></script>
    <script type="text/javascript">
        var QString = window.location.search.substring(1);
        var userId = QString.split("=")[1].split("&")[0];
        var roleId = QString.split("=")[2].split("&")[0];
        var relatedId = QString.split("=")[3].split("&")[0];

        $(document).ready(function () {
            $.ajax({
                url: 'http://115.115.159.126/ECabs/ECabs4U.asmx/checkResponse',
                type: "POST",
                datatype: "json",
                data: "{'userID':'" + relatedId + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    var getID = data.d[0];
                    var getValue = data.d[1];
                    if (getValue == "False") {
                        $.ajax({
                            url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetData",
                            type: "POST",
                            dataType: "Json",
                            data: "{'userID':'" + getID + "'}",
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                if (data.d[0] != null) {
                                    $('#lbljobno').text(data.d[0]);
                                    $('#lblFromLoc').text(data.d[1]);
                                    $('#lblToLoc').text(data.d[2]);
                                    $('#lblDistance').text(data.d[5]);
                                    $('#lblpickDateDriver').text(data.d[6]);
                                    $('#lblpickTime').text(data.d[7]);
                                    $('#lblpassengercount').text(data.d[8]);
                                    $('#lbllargecase').text(data.d[9]);
                                    $('#lblsmallcase').text(data.d[10]);
                                    $('#lblwheelchair').text(data.d[11]);
                                    $('#lblchildseat').text(data.d[12]);
                                    $('#lblchildbooster').text(data.d[13]);
                                    if (data.d[3] != null) {
                                        var sec = data.d[3];
                                        $('#lblpopthird').text(sec);
                                        $('#otherLoc').show();
                                        if (data.d[4] != null) {
                                            var third = data.d[4];
                                            $('#lblpopfour').text(third);
                                            $('#otherLoc').show();
                                        }
                                    }
                                    else {
                                        $('#otherLoc').hide();
                                    }
                                }
                                else {
                                    $('#divDetails').hide();
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                $('#divDetails').hide();
                            }
                        });
                    }
                    if (data.d[0] == "Error") {
                        $('#divDetails').hide();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#divDetails').hide();
                }
            });
            $('#popupBoxClose').click(function () {
                $('#popup_box').fadeOut("slow");
            });
        })

        function Destroy() {

            // window.clearInterval(timer);
            window.clearInterval(Dealid);
            window.location = "driverHome.html";
        }
        function showJob() {
            $("#divDealload").hide();
            $('#popup_box').fadeIn("slow");
            $('#divDriverPop').show();
            $('#divBid').hide();
            var job = $('#lbljobno').text();
            // var customer=abc;
            var from = $('#lblFromLoc').text();
            var to = $('#lblToLoc').text();
            var third = $('#lblpopthird').text();
            var four = $('#lblpopfour').text();
            $('#lblpopjob').text(job);
            $('#lblcustomer').text("abc");
            $('#lblpopfrom').text(from);
            $('#lblpopto').text(to);
            $('#lblpopthird').text(third);
            //$('#lblpopfour').text(four);trSpecialtxt
            document.getElementById("trwheelchair").style.display = 'none';
            document.getElementById("trfare").style.display = 'none';
            document.getElementById("trchildseats").style.display = 'none';
            document.getElementById("trchildbooster").style.display = 'none';
            document.getElementById("trOtherspec").style.display = 'none';
            document.getElementById("trSpecialtxt").style.display = 'none';
        }


        function SubmitDeal() {
            var timereOut = window.setInterval(function () {
                $.ajax({
                    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/dealResponse",
                    type: "POST",
                    dataType: "Json",
                    data: "{'userID':'" + relatedId + "'}",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        $("#divDealload").hide();
                        var getResID = data.d[0];
                        var getResponse = data.d[1];
                        if (getResponse == "True") {

                            $('#popup_box').fadeIn("slow");
                            $('#divDeal').show();

                            $.ajax({
                                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/GetDealData",
                                type: "POST",
                                dataType: "Json",
                                data: "{'userID':'" + getResID + "'}",
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    if (data.d[0] != null) {
                                        $('#lbldealjob').text(data.d[0]);
                                        $('#lbldealfrom').text(data.d[1]);
                                        $('#lbldealto').text(data.d[2]);
                                        $('#lbldealdistance').text(data.d[3]);
                                        $('#lbldealdate').text(data.d[4]);
                                        $('#lbldealtime').text(data.d[5]);
                                        $('#lbldealfare').text(data.d[6]);
                                    }
                                    if (data.d[0] == "Error") {
                                        $('#popup_box').hide();
                                        $('#divDeal').hide();
                                    }
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {

                                }
                            });

                        }
                        if (data.d[0] == "Error") {
                            $('#divDeal').hide();
                            DestroyMe();
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $('#divDeal').hide();
                    }
                });
            }, 1000);
            
        }
        function DestroyMe() {
            alert('Submit detail Destroymecalled');
            window.clearInterval(timereOut);
        }

        function showSpecial() {
            //document.getElementById("trfare").style.display = 'table-row';
            //document.getElementById("trwheelchair").style.display = 'table-row';
            //document.getElementById("trchildseats").style.display = 'table-row';
            //document.getElementById("trchildbooster").style.display = 'table-row';
            //document.getElementById("trOtherspec").style.display = 'table-row'; 
            //document.getElementById("trSpecialtxt").style.display = 'table-row'; 

            $("#trfare").toggle();
            $("#trwheelchair").toggle();
            $("#trchildseats").toggle();
            $("#trchildbooster").toggle();
            $("#trOtherspec").toggle();


        }
        function showBid() {
            $('#divDeal').hide();
            $('#divComplete').hide();
            $('#popup_box').fadeIn("slow");
            $('#divDriverPop').hide();
            $('#divBid').show();
            var job = $('#lbljobno').text();
            var distance = $('#lblDistance').text();
            var from = $('#lblFromLoc').text();
            var to = $('#lblToLoc').text();
            // var third=$('#lblpopthird').text();
            // var four=$('#lblpopfour').text();
            $('#lblbidjob').text(job);
            $('#lblbiddistance').text(distance);
            $('#lblbidfrom').text(from);
            $('#lblbidto').text(to);
            var fare = $('#txtbidFare').val()
            $('#lblfare').text(fare);
            //$('#lblpopthird').text(third);
            //$('#lblpopfour').text(four);
            document.getElementById("trfare").style.display = 'table-row';
            document.getElementById("trwheelchair").style.display = 'none';
            document.getElementById("trchildseats").style.display = 'none';
            document.getElementById("trchildbooster").style.display = 'none';
            document.getElementById("trOtherspec").style.display = 'none';
        }
        function bidSubmit() {
            //$('#divComplete').hide();
            $("#divDealload").show();

            $('#divDriverPop').hide();
            $('#divBid').hide();
            var job = $('#lbljobno').text();
            var distance = $('#lblDistance').text();
            var from = $('#lblFromLoc').text();
            var to = $('#lblToLoc').text();
            // var third=$('#lblpopthird').text();
            // var four=$('#lblpopfour').text();
            $('#lblbidjob').text(job);
            $('#lblbiddistance').text(distance);
            $('#lblbidfrom').text(from);
            $('#lblbidto').text(to);
            var fare = $('#txtbidFare').val()
            $('#lblfare').text(fare);
            //$('#lblpopthird').text(third);
            //$('#lblpopfour').text(four);
            var rid = $('#lblbidjob').text();
            var status = true;
            var price = fare;

            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/setDriverResponse",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + rid + "','status':'" + status + "','price':'" + price + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    //$("#divDealload").show();

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
            document.getElementById("trfare").style.display = 'table-row';
            document.getElementById("trwheelchair").style.display = 'none';
            document.getElementById("trchildseats").style.display = 'none';
            document.getElementById("trchildbooster").style.display = 'none';
            document.getElementById("trOtherspec").style.display = 'none';
            $('#popup_box').fadeOut("slow");
            SubmitDeal();
            //var Dealid = window.setInterval(SubmitDeal, 2000);
        }

        function bidCancel() {
            var job = $('#lbljobno').text();
            $('#popup_box').fadeOut("slow");
            $('#lblfare').text("");
            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/cancelJob",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + job + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // alert(errorThrown);
                }
            });
            document.getElementById("trfare").style.display = 'none';
        }
        function reqCancel() {
            $('#divDetails').hide();
        }
        function reqReject() {
            var rid = $('#lbljobno').text();
            var status = true;


            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/rejectResponse",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + rid + "','status':'" + status + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });

        }
        function dealSubmit() {
            var getFare = $('#lbldealfare').text();
            $('#divDeal').hide();
            var reqID = $('#lbldealjob').text();
            if (getFare == 15 || getFare > 15) {

                $('#divComission').show();
                $('#lblconfirmjob').text(reqID);
                $('#lblconfirmfare').text(getFare);


            }
            else {

                $('#divComission').hide();

                //alert(reqID);lblconfirmjob
                $.ajax({
                    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/jobBooked",
                    type: "POST",
                    dataType: "Json",
                    data: "{'userID':'" + relatedId + "','reqid':'" + reqID + "'}",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        $('#divDetails').hide();

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {

                    }
                });
                Destroy();
                $('#divDeal').hide();
                $('#popup_box').fadeOut("slow");
            }

        }
        function Confirmcomission() {

            var reqID = $('#lblconfirmjob').text();
            var comission = 1.2;

            $.ajax({
                url: "http://115.115.159.126/ECabs/ECabs4U.asmx/jobBooked",
                type: "POST",
                dataType: "Json",
                data: "{'userID':'" + relatedId + "','reqid':'" + reqID + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
            window.location.href = "https://sandbox.gocardless.com/pay/YH0MFHY7";

            $('#divDeal').hide();
            $('#popup_box').fadeOut("slow");
        }
        function RejectComission() {
            $('#divComission').hide();
        }
        function dealCancel() {
            $('#divDeal').hide();
            $('#popup_box').fadeOut("slow");

        }


        function btnAbort() {

            $('#popup_box').show();
            $('#divabort').show();


            $('#divComplete').hide();
        }
        function abortcancel() {
            $('#popup_box').hide();
            $('#divabort').hide();
            $('#divComplete').show();
        }

        function abortOk() {

            //var show=document.getElementById("txtreason").value();

        }

    </script>
</head>
<body>

    <div class="header" style="background-color: #242424; height: 12.2%">
        <div style="float: left; height: 48px; wforth: 122px; padding-top: 3px;">
            <img src="img/logo1.png" class="logo" />

        </div>

    </div>
    <center>
             <div id="divDealload" class="loadForall">            
                <span style="font-family:'Trebuchet MS';color:white">Please wait...</span><br>
                <img src="jquery-mobile/styles/images/ajax-loader-hor.gif" style="width:140px;height:10px"/>
            </div>
            <div style="width:100%;height:75%;padding-top:25%;" id="divDetails">
                <div id="popup_box" >
                    
                   
                    <div id="divDriverPop" align="center" style="display:none;">
                        <table align="left" style="width:100%;background-color:#FFFFFF;">
                             <tr>
                                <td class="popup_header" width="100%" colspan="2">
                                    <strong style="padding-left:5px" width="100%" align="center">Job Details</strong>
                                </td>
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">Job Number</b>
                                    
                                </td>
                                <td width="50%">
                                    <b> <label id="lblpopjob" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">Customer Name</b>
                                    
                                </td>
                                <td width="50%">
                                    <b>  <label id="lblcustomer" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content"> 
                                <td width="50%">
                                    <b style="font-size:13px;">From</b>
                                    
                                </td>
                                <td width="50%">
                                    <b>  <label id="lblpopfrom" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%"> 
                                    <b style="font-size:13px;">To</b>
                                    
                                </td>
                                <td width="50%">
                                    <b> <label id="lblpopto" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">Third Location</b>
                                    
                                </td>
                                <td width="50%">
                                    <b>  <label id="lblpopthird" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">Fourth Location</b>
                                    
                                </td>
                                <td width="50%">
                                    <b>  <label id="lblpopfour" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr width="100%" class="popup_footer">
                                <td  width="100%" colspan="2">
                                    <input type="button" class="ok" id="popupBoxClose" style="cursor: pointer;text-align:center;" value="OK"/>
                                </td>
                           </tr>
                            
                        </table>
                        
                    </div>
                    <div id="divBid" style="display:none;"align="center">
                        <table align="left" style="width:100%;background-color:#FFFFFF;">
                            <tr>
                                <td class="popup_header" width="100%" colspan="2">
                                    <strong style="padding-left:5px" width="100%" align="center">Bid Details</strong>
                                </td>
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">Job Number</b>
                                    
                                </td>
                                <td width="50%">
                                    <b> <label id="lblbidjob" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">From</b>
                                    
                                </td>
                                <td width="50%">
                                    <b>  <label id="lblbidfrom" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">To</b>
                                    
                                </td>
                                <td width="50%">
                                    <b> <label id="lblbidto" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">Distance In Mile</b>  
                                    
                                </td>
                                <td width="50%">
                                    <b> <label id="lblbiddistance" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">Fare</b>
                                    
                                </td>
                                <td width="50%">
                                    <b><img src="img/euro.png"width="10" height="10"/><input type="text" id="txtbidFare" maxlength="3" style="font-size:13px;width:70%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_footer">
                                <td width="50%">
                                    <input type="button" class="ok" value="Cancel" style="width:100%;" onclick="bidCancel()" />
                                    
                                </td>
                                <td width="50%">
                                    <input type="button" class="ok" value="Accept" style="width:100%;" onclick="bidSubmit()"/>
                                    
                                </td>
                                
                            </tr>
                            
                        </table>
                        
                    </div>
                   
                    <div id="divDeal" style="display:none;"align="center">
                        <table align="left" style="width:100%;background-color:#FFFFFF;">
                             <tr>
                                <td class="popup_header" width="100%" colspan="2">
                                    <strong style="padding-left:5px" width="100%" align="center">Booked Details</strong>
                                </td>
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">Job Number</b>
                                    
                                </td>
                                <td width="50%">
                                    <b> <label id="lbldealjob" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">From</b>
                                    
                                </td>
                                <td width="50%">
                                    <b>  <label id="lbldealfrom" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">To</b>  
                                    
                                </td>
                                <td width="50%">
                                    <b> <label id="lbldealto" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">Pick Date</b>
                                    
                                </td>
                                <td width="50%">
                                    <b> <label id="lbldealdate" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">Pick Time</b>
                                    
                                </td>
                                <td width="50%">
                                    <b> <label id="lbldealtime" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">Distance In Mile</b>  
                                    
                                </td>
                                <td width="50%">
                                    <b> <label id="lbldealdistance" style="font-size:13px;padding-left:10%;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_content">
                                <td width="50%">
                                    <b style="font-size:13px;">Fare</b>
                                    
                                </td>
                                <td width="50%">
                                    <b><img src="img/euro.png"width="10" height="10" style="padding-left:10%;"/><label id="lbldealfare" style="font-size:13px;"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_footer">
                                <td width="50%">
                                    <input type="button" class="ok" value="Cancel" style="width:100%;" onclick="dealCancel()" />
                                    
                                </td>
                                <td width="50%">
                                    <input type="button" class="ok" value="Submit" style="width100%;" onclick="dealSubmit()"/>
                                    
                                </td>
                                
                            </tr>
                            
                        </table>
                        
                    </div>
                    <div id="divComission" style="display:none;"align="center">
                        <table align="left" style="width:100%;background-color:#FFFFFF;">
                                 <tr>
                                            <td class="popup_header" width="100%" colspan="2">
                                                <strong style="padding-left:5px" width="100%" align="center">Commission Payment</strong>
                                            </td>
                                </tr>
                                <tr class="popup_content">
                                 <td width="50%">
                                            <b style="font-size:13px;">Job Number</b>
                                           </td>
                                           <td width="50%">
                                              <b> <label id="lblconfirmjob" style="font-size:13px;padding-left:10%;"/></b>
                                           </td>
                                </tr>
                                <tr class="popup_content">
                                            <td width="50%">
                                                <b style="font-size:13px;">Fare</b>
                                            </td>
                                            <td width="50%">
                                               <b><img src="img/euro.png"width="10" height="10" style="padding-left:10%;"/><label id="lblconfirmfare" style="font-size:13px;"/></b>
                                            </td>
                                </tr>
                                <tr class="popup_footer">
                                            <td width="50%">
                                                <input type="button" value="Reject" class="ok" onclick="RejectComission()"/>
                                            </td>
                                            <td width="50%">
                                                <input type="button" value="Confirm" class="ok" onclick="Confirmcomission()"/>
                                            </td>
                                </tr>
                        </table>
                    </div>
                    <div id="divabort" style="display:none;"align="center">
                        <table align="left" style="width:100%;background-color:#FFFFFF;">
                                 <tr>
                                            <td class="popup_header" width="100%" colspan="2">
                                                <strong style="padding-left:5px" width="100%" align="center">Reason</strong>
                                            </td>
                                </tr>
                                <tr class="popup_content">
                                <td width="100%" colspan="2">
                                    <input type="text" id="txtreason" style="width:80%"/>
                                    
                                </td>
                                
                            </tr>
                            <tr class="popup_footer">
                                <td width="50%">
                                    <input type="button" id="ok" class="ok" value="OK" style="width:80%;" onclick="abortOk()" />
                                    
                                </td>
                                <td width="50%">
                                    <input type="button" class="ok" value="Cancel" style="width:80%;" onclick="abortcancel()"/>
                                    
                                </td>
                                
                            </tr>
                            
                        </table>
                        
                    </div>
                    
                </div>
                
                <div id="divComplete" style="overflow:auto;display:none" align="center" >
                        <table id="tblComplete" width="100%" style="border-collapse:collapse;">
                            <tr>
                                <td width="50%" style="padding-left:5%;">
                                    <label  class="font-style"><b style="font-size:13px;">Job Number </b></label>
                                    
                                </td>
                                <td width="50%" style="padding-left:5%;">
                                    <label id="lbljobnoComplete" style="cursor:pointer;" ></label>
                                    
                                    
                                </td>
                                
                            </tr>
                            <tr>
                                <td width="50%" style="padding-left:5%;">
                                    <label  class="font-style"><b style="font-size:13px;">From</b></label>
                                    
                                </td>
                                <td width="50%" style="padding-left:5%;">
                                    <b style="font-size:13px"> <label id="lblFromLocComplete" readonly="true"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr>
                                <td width="50%" style="padding-left:5%;">
                                    <label  class="font-style"><b style="font-size:13px">To </b></label> 
                                    
                                </td>
                                <td width="50%" style="padding-left:5%;">
                                    <b style="font-size:13px">  <label id="lblToLocComplete" readonly="true"></label></b>
                                    
                                </td>
                                
                            </tr>
                            <tr>
                                <td width="50%" style="padding-left:5%;">
                                    <label for="txtDistanceComplete" class="font-style"><b style="font-size:13px">Distance In Miles </b></label>
                                    
                                </td>
                                <td width="50%" style="padding-left:5%;">
                                    <b style="font-size:13px">  <label id="lblDistanceComplete" readonly="true" /></b>
                                    
                                </td>
                                
                            </tr>
                            <tr>
                                <td width="50%" style="padding-left:5%;">
                                    <label for="pickDateDriverComplete" class="font-style"><b style="font-size:13px">Pick Up Date </b></label>
                                    
                                </td>
                                <td width="50%" style="padding-left:5%;">
                                    <b style="font-size:13px">  <label  id="lblpickDateDriverComplete" readonly="true"/></b>
                                    
                                </td>
                                  
                            </tr>
                            <tr>
                                <td width="50%" style="padding-left:5%;">
                                    <label  class="font-style"><b style="font-size:13px">Pick Up Time </b></label>
                                    
                                </td>
                                <td width="50%" style="padding-left:5%;">
                                    <b style="font-size:13px"><label id="lblpickTimeComplete" readonly="true"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr>
                                <td width="50%" style="padding-left:5%;">
                                    <label class="font-style"><b style="font-size:13px">Passenger </b></label> 
                                    
                                </td>
                                <td width="50%" style="padding-left:5%;">
                                    <b style="font-size:13px">   <label id="lblpassengercountComplete" readonly="true"/></b>
                                    
                                </td>
                                
                            </tr>
                            <tr>
                                <td width="50%" style="padding-left:5%;">
                                    <label class="font-style"><b style="font-size:13px">Large Case </b></label>
                                    
                                </td>
                                <td width="50%" style="padding-left:5%;">  
                                    <b style="font-size:13px"> <label id="lbllargecaseComplete" readonly="true" /> </b>
                                    
                                </td>
                                
                            </tr>
                            <tr>
                                <td width="50%" style="padding-left:5%;">
                                    <label for="smallcaseComplete" class="font-style"><b style="font-size:13px">Small Case </b></label>
                                    
                                </td>
                                <td width="50%" style="padding-left:5%;">
                                    <b style="font-size:13px"> <label id="lblsmallcaseComplete" readonly="true" /> </b>
                                    
                                </td>
                                
                            </tr>
                            <tr>
                                <td width="55%" style="padding-left:5%;">
                                    <label for="SpecialReqComplete" class="font-style"><b style="font-size:13px">Special Requirenments</b></label>
                                    
                                </td>
                                <td width="45%" style="padding-left:5%;">
                                    <b style="font-size:13px"> <label id="lblSpecialReqComplete" readonly="true" /> </b>
                                    
                                </td>
                                
                            </tr>
                            <tr>
                                <td width="50%" style="padding-left:5%;">
                                    <label class="font-style"><b style="font-size:13px">Name of Pick-Up</b></label>
                                    
                                </td>
                                <td width="50%" style="padding-left:5%;">
                                    <b style="font-size:13px"> <label id="lblNameofPickup" readonly="true" /> </b>
                                    
                                </td>
                                
                            </tr>
                            <tr>
                                <td width="57%" style="padding-left:5%;">
                                    <label class="font-style"><b style="font-size:13px">Phone Number of Pick-Up</b></label>
                                    
                                </td>
                                <td width="43%" style="padding-left:5%;">
                                    <b style="font-size:13px"> <label id="lblPhonenoofPickup" readonly="true" /> </b>
                                    
                                </td>
                                
                            </tr>
                            <tr>
                                <td width="50%" align="right">
                                    <input type="button" class="specialBtn" value="Pick-Up Point" onclick="btnPickup()"/>
                                    
                                </td>
                                <td width="50%" align="left">
                                    <input type="button" class="specialBtn" value="Abort"  onclick="btnAbort()"/>
                                    
                                </td>
                                
                            </tr>
                            
                        </table>
                        
                    </div>

                

                
                <table width="100%" style="border-collapse:collapse">
                   <tr>
                       <td width="50%" style="padding-left:5%;">
                           <label  class="font-style"><b style="font-size:13px;">Job Number </b></label> 
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">
                           <a  href="#" onclick="showJob()"  style="color:blue;"><b style="font-size:13px;"> <label id="lbljobno" style="cursor:pointer;" ></label></b></a>
                           
                       </td>
                       
                   </tr>
                   <tr>
                       <td width="50%" style="padding-left:5%;">
                           <label  class="font-style"><b style="font-size:13px;">From</b></label> 
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px"> <label id="lblFromLoc" readonly="true"/></b>
                           
                       </td>
                       
                   </tr>
                   <tr>
                       <td width="50%" style="padding-left:5%;">
                           <label  class="font-style"><b style="font-size:13px">To </b></label> 
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px">  <label id="lblToLoc" readonly="true"></label></b><img src="img/Addlocation.png" id="otherLoc" width="15" height="15" style="padding-left:35%;display:none;" onclick="secoundLocation()"/>
                           
                       </td>
                       
                   </tr>
                   <tr>
                       <td width="50%" style="padding-left:5%;">
                           <label for="txtDistance" class="font-style"><b style="font-size:13px">Distance In Miles </b></label> 
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px">  <label id="lblDistance" readonly="true" /></b>
                           
                       </td>
                       
                   </tr>
                   <tr>
                       <td width="50%" style="padding-left:5%;">
                           <label for="pickDateDriver" class="font-style"><b style="font-size:13px">Pick Up Date </b></label>
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">  
                           <b style="font-size:13px">  <label  id="lblpickDateDriver" readonly="true"/></b>
                           
                       </td>
                       
                   </tr>
                   <tr>
                       <td width="50%" style="padding-left:5%;">
                           <label  class="font-style"><b style="font-size:13px">Pick Up Time </b></label>
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px">   <label id="lblpickTime" readonly="true"/></b>
                           
                       </td>
                       
                   </tr>
                   <tr>
                       <td width="50%" style="padding-left:5%;">
                           <label class="font-style"><b style="font-size:13px">Passenger </b></label> 
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px">   <label id="lblpassengercount" readonly="true"/></b>
                           
                       </td>
                       
                   </tr>
                   <tr>
                       <td width="50%" style="padding-left:5%;">
                           <label class="font-style"><b style="font-size:13px">Large Case </b></label>
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px"> <label id="lbllargecase" readonly="true" /> </b>
                           
                       </td>
                       
                   </tr>
                   <tr>
                       <td width="50%" style="padding-left:5%;">
                           <label for="smallcase" class="font-style"><b style="font-size:13px">Small Case </b></label>
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px"> <label id="lblsmallcase" readonly="true" /> </b>     
                           
                       </td>
                       
                   </tr>
                   <tr id="trfare" style="display:none;">
                       <td width="50%" style="padding-left:5%;" >
                           <b style="font-size:13px">Fare </b>
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px"><img src="img/euro.png"width="10" height="10"/><label id="lblfare" />  </b>
                           
                       </td>
                       
                   </tr>
                   <tr>
                       <td width="55%" style="padding-left:5%;">
                           <b style="font-size:13px">Special Requirement </b>
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px">  <label id="specialReq" ><a href="#" onclick="showSpecial()" style="color:blue;">None</a> </label></b>
                           
                       </td>
                       
                   </tr>
                   <tr id="trwheelchair" style="display:none;">
                       <td width="50%" style="padding-left:5%;" >
                           <b style="font-size:13px">Wheelchair Passengers </b>
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px">   <label id="lblwheelchair" />  </b>
                           
                       </td>
                       
                   </tr>
                   <tr id="trchildseats" style="display:none;">
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px">Child Seats </b>
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px">    <label id="lblchildseat" />  </b>
                           
                       </td>
                       
                   </tr>
                   <tr id="trchildbooster" style="display:none;" >
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px">Child Booster </b>
                           
                       </td>
                       <td width="50%" style="padding-left:5%;">
                           <b style="font-size:13px">      <label id="lblchildbooster" /> </b> 
                           
                       </td>
                       
                   </tr>
                   <tr id="trOtherspec" style="display:none;">
                       <td width="100%" style="padding-left:5%;" colspan="4">
                           <label for="txtothereSpecialRequirement" ><b style="font-size:13px" >Other Requirements</b></label> 
                           
                       </td>
                       
                   </tr>
                   <tr id="trSpecialtxt" style="display:none;">
                       <td width="100%" style="padding-left:5%;" colspan="4">
                           <textarea id="txtothereSpecialRequirement" rows="4" cols="10"  style="" readonly="true"></textarea>
                           
                       </td>
                       
                   </tr>
                   
               </table>
                
            </div>
            <div style="padding-top:20%;width:100%;">
                
            </div>
            
        </center>
    <footer>
        <div style="width: 100%; position: fixed; bottom: 0px; height: 20px; padding-bottom: 55px">
            <table width="100%" style="" id="tbdeal">
                <tr>
                    <td width="25%">
                        <input type="button" id="btnbid" class="specialBtn" onclick="showBid()" style="width: 100%;" value="Bid" />

                    </td>
                    <td width="25%">
                        <input type="button" id="btnmap" class="specialBtn" onclick="showMap()" style="width: 100%;" value="Map" />

                    </td>
                    <td width="25%">
                        <input type="button" id="btncancel" class="specialBtn" onclick="reqCancel()" style="width: 100%;" value="Cancel" />

                    </td>
                    <td width="25%">
                        <input type="button" id="btnreject" class="specialBtn" onclick="reqReject()" style="width: 100%;" value="Reject" />

                    </td>

                </tr>

            </table>
            <table style="width: 100%;" class="btn-tmpFooter">
                <tr>
                    <td style="width: 20%;">
                        <div>
                            <img src="img/User.png" width="25px;" style="float: left; cursor: pointer" title="Profile" onclick="myProfile()" />

                        </div>

                    </td>
                    <td style="width: 20%;">
                        <div>
                            <img src="img/Home.png" width="25px;" style="float: left; cursor: pointer" title="Home" onclick="myhome()" />

                        </div>

                    </td>
                    <td style="width: 20%;">
                        <div>
                            <img src="img/Cab.png" width="25px;" style="float: left; cursor: pointer" title="My Jobs" onclick="MyBookings()" />

                        </div>

                    </td>
                    <td style="width: 20%;">
                        <div>
                            <img src="img/History1.png" width="25px;" style="float: left; cursor: pointer" title="Booking History" onclick="bookedHistory()" />

                        </div>

                    </td>
                    <td style="width: 20%;">
                        <div>
                            <img src="img/feedback.png" width="25px;" style="float: left; cursor: pointer" title="Feedback" onclick="feedBack()" />

                        </div>

                    </td>
                    <td style="width: 20%;">
                        <div>
                            <img src="img/logout.png" width="25px;" style="float: left; cursor: pointer" title="Logout" onclick="logout()" />
                        </div>

                    </td>

                </tr>

            </table>

        </div>

    </footer>

</body>

</html>
