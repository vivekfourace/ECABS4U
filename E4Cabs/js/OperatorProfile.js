var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];


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

function ShowData(data)
{
    $('#opProfile').append('<table>')
    for(var i=0; i< data.d.length; i++)
    {
        $('#opProfile').append('<tr style="margin-top:15px">')
        .append("<td width='50%' align='left' style='margin:5px 0 5px 0;'>Name:</td>")
        .append("<td width='50%' align='left'>" + data.d[i]["OperatorName"] + "</td>")
        .append('</tr>')
        
        .append('<tr>')
        .append("<td width='50%' align='left'>Address:</td>")
        .append("<td width='50%' align='left'>" + data.d[i]["Address2"] + " " +data.d[i]["Address"]+ "</td>")
        .append('</tr>')
        
        .append('<tr>')
        .append("<td width='50%' align='left'>Contact Number:</td>")
        .append("<td width='50%' align='left'>" + data.d[i]["ContactNumber"] + "</td>")
        .append('</tr>')
        
        .append('<tr>')
        .append("<td width='50%' align='left'>Email:</td>")
        .append("<td width='50%' align='left'>" + data.d[i]["Email"] + "</td>")
        .append('</tr>')
        
        .append('<tr>')
        .append("<td width='50%' align='left'></td>")
        .append("<td width='50%' align='left'>" + '<input type="button" value="Edit" id= "'+ relatedId +'" onclick = "editFunc('+relatedId+'); return false;" title= "'+relatedId+'" />' + "</td>")
         $('button').addClass('btn-tmp')
        .append('</tr>')
    }
    $('#opProfile').append('</table>')    
}


function editFunc(relatedId)
{
    alert('i am in edit');
    
}
