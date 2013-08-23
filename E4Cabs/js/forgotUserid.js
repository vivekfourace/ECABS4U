function userid()
{
    var emaiID=document.getElementById('email').value;
    var regExpEmail = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$";
   
    if(emaiID.length > 0)
                    {
                        if(emaiID.match(regExpEmail))
                        {
                            $('#lblMessage').text(" ");
                        }
                        else{
                            $('#lblMessage').text("Please enter a valid email address!");
                            $('#lblMessage').css("color","#D70007");
                            return false;
                        }
                    }
                else if(emaiID.length == 0)
                {
                    $('#lblMessage').text("Please enter email address!");
                    $('#lblMessage').css("color","#D70007");                    
                    return false;
                }
            $.ajax({
                    url:"",
                    datatype:"json",
                    type:"POST",
                    data:"",
                   contentType: "application/json; charset=utf-8", 
                    success: CheckData,
                   error: function (XMLHttpRequest, textStatus, errorThrown) 
                       {
                            alert(errorThrown);
                       }
                 });
}

function CheckData(data){
    if(data.d[0] == "false")
    {
        $('#lblMessage').text("Incorrect userid!");
        $('#lblMessage').css("color","#D70007");
        $('#lblMessage').css("font-size","13");
    }
    else{
        //diplay user after fetching from db.
            }
 }