

$(document).ready(function () {

    $("input#submit").submit(function(){
        $.ajax({
            type: "POST",
            url: "localhost:8000/reservations", //process to mail
            data: $('form.newReservation'),
            dataType: "json",
            success: function(msg){
                $("#form-content").modal('hide'); //hide popup  
            },
            error: function(){
                alert("failure");
            }
        });
    });

});


let reservationList = [];

function getReservation() {
        $.ajax({
            url: 'localhost:8000/reservations',
            async: false,
            type: "GET",
            dataType: "json", 
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus + "-" + errorThrown);
            },
            success: function (data, textStatus, jqXHR) {
                reservationList.push(data)
            }
        });
}

function addReservation() {
	$.ajax( {
		url: 'localhost:8000/reservations',
		async: false,
		type: 'POST',
		data: JSON.stringify($('form.newReservation').serializeArray()),
		dataType: "json",
		error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus + "-" + errorThrown);
            },
            success: function (data, textStatus, jqXHR) {
                //hide modal
            }
	})
}