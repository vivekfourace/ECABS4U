function Reset()
             {
                 var old=document.getElementById('txtOld').value;
                  var new1=document.getElementById('txtNew').value;
                var confirm=document.getElementById('txtConform').value;
                 
                 if(!old)
                 {
                    $('#lblOPass').text("*Please Fill the Old Password.");
                     return false;
                 }
                  if(!new1)
                 {
                    $('#lblPassword').text("*Please Fill the Password.");
                     return false;
                 }
                  if(!confirm)
                 {
                    $('#lblConfirm').text("*Please Fill the Confirm Password.");
                     return false;
                 }
               if(new1!=confirm)
                 {
                     $('#lblverification').text("Your Password Is Not Matching!");
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