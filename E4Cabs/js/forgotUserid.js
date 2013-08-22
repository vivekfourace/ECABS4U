function userid()
{
    var user=document.getElementById('userid').value;
    
   
    if(user.length>0)
    {
     $('#lblUserID').text("");  
    }
    else if(user.length==0)
    {
        $('#lblUserID').text("*Please enter the User ID");
        return false;
    }
    
    
    $.ajax({
                    url:"",
                    datatype:"json",
                    type:"POST",
                    data:"",
                   contentType: "application/json; charset=utf-8", 
                    success: function(data)
                     {
                         alert("WELCOME!");
                         $('#userid').val('');
                     },
        
                   error: function (XMLHttpRequest, textStatus, errorThrown) 
           {
        alert(errorThrown);
           }
         });
    
}