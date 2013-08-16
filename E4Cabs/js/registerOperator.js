/*
 <soap:Body>
    <RegisterOperator xmlns="http://tempuri.org/">
      <name>string</name>
      <email>string</email>
      <contactNumber>string</contactNumber>
      <password>string</password>
      <address1>string</address1>
      <address2>string</address2>
      <postcode>string</postcode>
    </RegisterOperator>
  </soap:Body>
*/

function Registeroperator()
{
    var txt1 =$('#txt1').val();
    var txt2 =$('#txt2').val();
    var txt3 =$('#txt3').val();
    var txt4 =$('#txt4').val();
    var txt5 =$('#txt5').val();
    var txt6 =$('#txt6').val();
    var txt7 =$('#txt7').val();

$.ajax({
    url: "http://115.115.159.126/ECabs/ECabs4U.asmx/RegisterOperator",
    type: "POST",
    dataType: "json",
    data: "{ 'name': '" + txt1 + "','email': '" + txt2 + "','contactNumber': '" + txt3 + "','password': '" + txt4 + "','address1': '" + txt5 + "','address2': '" + txt6 + "','postcode': '" + txt7 + "'}",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
        alert('Registration successfull');
        //window.location.href = "Time.html";
       // window.location.replace("Time.html");
    },
    
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
           }
       });    
}