function userid()
{
    var user=document.getElementById('userid').value;
    
    if(!user)
    {
        $('#lblUserID').text("*Please Fill the User Id.");
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