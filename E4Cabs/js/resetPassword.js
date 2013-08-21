function Reset()
             {
               // var old=document.getElementById('txtOld').value;
                  var new1=document.getElementById('txtNew').value;
                var confirm=document.getElementById('txtConform').value;
                 
                 
                 //if(old.length > 0)
                    //{
                       // $('#lblOPass').text(" ");
                   // }
                //else if(old.length == 0)
                 //{
                    // $('#lblOPass').text("*please enter the Old Password.");
                   // return false;
                 //
    
              
                 
                 if(new1.length > 0)
                    {
                        $('#lblPassword').text(" ");
                    }
                else if(new1.length == 0)
                 {
                     $('#lblPassword').text("*please enter the  Password.");
                    return false;
                 }
                  
                 if(confirm.length > 0)
                    {
                        if(new1 == confirm)
                        {
                            $('#lblConfirmPassword').text(" ");
                        }
                        else
                        {
                            $('#lblConfirmPassword').text("Password mismatch!");
                            return false;
                        }
                    }
                else if(confirm.length == 0)
                    {
                        $('#lblConfirmPassword').text("*please enter the ConfirmPassword");
                        return false;
                    }
                 
                 $.ajax({
                     url:"",
                     datatype:"POST",
                     type:"json",
                     data:"",
                     contentType: "application/json; charset=utf-8",
                     
                     success: function(data)
                     {
                         alert("WELCOME!");
                         $('#txtOld').val('');
                         $('#txtNew').val('');
                         $('#txtConform').val('');
                     }
                 });
                 
             }