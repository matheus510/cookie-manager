$(document).ready(function() {

let datepickerDate = $('#datepicker').datepicker('getDate');
/* let sources = {
    populate: {
        url: 'localhost:3000/' + datepickerDate,
        type: 'GET',
        cache: false,     
        color: '#6C92A8', 
        textColor: 'white'
    }
} */

var datepicker = $('#datepicker').datepicker({
    dateFormat: "yyyy-mm-dd",
    gotoCurrent: true,
    defaultDate: null
    /* eventSources: [sources.populate] */
});

var timeline = $('.timeline');

timeline.fullCalendar();
timeline.fullCalendar('changeView', 'agendaDay', datepickerDate);

$('#datepicker').on('change', function () {
    $('#datepicker').datepicker('setDate',  datepickerDate)

    timeline.fullCalendar('changeView', 'agendaDay',  datepickerDate);
    /* timeline.fullCalendar('addEventSource', sources.populate) */
})
});