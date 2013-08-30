//var QString = window.location.search.substring(1);

//var relatedId = QString.split("=")[1].split("&")[0];

var QString = window.location.search.substring(1);
var userId =  QString.split("=")[1].split("&")[0];
var roleId = QString.split("=")[2].split("&")[0];
var relatedId = QString.split("=")[3].split("&")[0];

function backtoCustomerhome()
{
    
       
    window.location =  'customerHome.html?id='+userId+'&rid='+roleId+'&rrid='+relatedId;
 // window.location="customerHome.html";
}

window.onload = gethistory();
function gethistory()
{
   
    
    var url = "http://115.115.159.126/ECabs/ECabs4U.asmx/CustomerHistoryDetails";
                $.ajax(url, {
                    
                    type:"POST",
                    datatype:"json",
                    data:"{'relatedId':'"+relatedId+"'}",
        contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        //var len = data.d.length;
                     
                        $('#msg').append('<table>')
                       
                         $('#msg').append('<tr >')
                            
                            .append("<th width='35%' align='center'>" +"Date"+"</th>")
                            .append("<th width='25%' align='center'>" +"From"+"</th>")
                             .append("<th width='25%' align='center'>" +"To"+"</th>")
                            .append('</tr>');
                       
                            //var id = data.d[i]["ID"];
                           
                            $('#msg').append('<tr>')
                            
                            .append("<td width='35%' align='center'>" + data.d[0]+"</td>")
                            .append("<td width='25%' align='center'>" + data.d[1]+"</td>")
                             .append("<td width='25%' align='center'>" + data.d[2]+"</td>")
                            .append('</tr>');
                      
                        $('#msg').append('</table>')
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                });
                
            }
  

    
    
    
