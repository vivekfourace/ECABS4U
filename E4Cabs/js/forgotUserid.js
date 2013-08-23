function userid()
{
    var user=document.getElementById('userid').value;
    
   
    if(user.length>0)
    {
     $('#lblVerificatin').text("");  
    }
    else if(user.length==0)
    {
        $('#lblVerificatin').text("*Please enter the User ID");
        return false;
    }
    
    
               $.ajax({ 
                    url:"",
                    datatype:"json",
                    type:"POST",
                    data:"{'':'"+user+"'}",
                   contentType: "application/json; charset=utf-8", 
                    success: function(data)
                     {
                         $('#userid').val('');
                     },
        
                   error: function (XMLHttpRequest, textStatus, errorThrown) 
           {
        alert(errorThrown);
           }
         });
    
}
