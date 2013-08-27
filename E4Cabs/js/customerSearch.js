$(document).ready(function() {
                  $('#timepicker').timepicker({
                    showPeriod: true,
                    showLeadingZero: true
                });
            });
            $(function() {
    $( "#datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: 0, 
	  maxDate: "+5D" 
    });
});

//Code For current Time
	var currentTime = new Date()
	var hours = currentTime.getHours()
	var minutes = currentTime.getMinutes()
	if (minutes < 10)
	minutes = "0" + minutes
	var suffix = "AM";
	if (hours >= 12) {
	suffix = "PM";
	hours = hours - 12;
	}
	if (hours == 0) {
	hours = 12;
	}
    $('#timepicker').val(hours+":"+minutes+":"+suffix);

//Code For current Date
	var currentDate = new Date()
	var day = currentDate.getDate()
	var month = currentDate.getMonth() + 1
	var year = currentDate.getFullYear()
    $('#datepicker').val(day+"/"+month+"/"+year);
