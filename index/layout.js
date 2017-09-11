$(document).ready(function() {

let datepickerDate = $('#datepicker').datepicker('getDate');

let datepicker = $('#datepicker').datepicker({
    dateFormat: "yyyy-mm-dd",
    gotoCurrent: true,
    defaultDate: null,
    showButtonPanel: true
});

let timeline = $('.timeline');

timeline.fullCalendar();
timeline.fullCalendar('changeView', 'agendaDay', $('#datepicker').datepicker('getDate'));

$('#datepicker').on('change', function () {
    $('#datepicker').datepicker('setDate',  $('#datepicker').datepicker('getDate'))

    timeline.fullCalendar('changeView', 'agendaDay',  $('#datepicker').datepicker('getDate'));
    $.ajax(sources)
    
})
});