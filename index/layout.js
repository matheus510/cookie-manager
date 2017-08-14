$(document).ready(function() {

let sources = {
    populate: {
        url: 'localhost:3000/' + $('#datepicker').datepicker('getDate'),
        type: 'GET',
        cache: false,     
        color: '#6C92A8', 
        textColor: 'white'
    }
}

var datepicker = $('#datepicker').datepicker({
    dateFormat: "yyyy-mm-dd",
    gotoCurrent: true,
    defaultDate: null,
    eventSources: [sources.populate]
});

var datepickerDate = $('#datepicker').datepicker('getDate');
var timeline = $('#timeline');

timeline.fullCalendar();
timeline.fullCalendar('changeView', 'agendaDay', datepickerDate);

$('#datepicker').on('change', function () {
    $('#datepicker').datepicker('setDate', $('#datepicker').datepicker('getDate'))
    timeline.fullCalendar('changeView', 'agendaDay', $('#datepicker').datepicker('getDate'));
    timeline.fullCalendar('addEventSource', sources.populate)
})
});