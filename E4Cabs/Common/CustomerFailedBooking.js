var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

$.ajax({
   url:"http://115.115.159.126/ECabs/ECabs4U.asmx/GetFailedJobs",
    type:"post",
    datatype:"json",
    data:"{'relatedId','"+relatedId+"'}",
    contentType: "application/json; charset=utf-8",
    success:displayResult    
});