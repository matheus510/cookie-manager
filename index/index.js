function AppViewModel() {
    var self = this
    
    self.agenda = ko.observable(new agendaModel())
    self.roomList = ko.observableArray()

    self.loadRoomList = function (day) {
        $.ajax({
            url: '/room',
            type: 'get',
            dataType: 'json',
            success: function (data) {
               
            }
        })
    } 
}

function agendaModel() {
    var self = this
    
    self.reservation = ko.observable(new ReservationModel())
    self.day = ko.observable(null)
    self.reservationList = ko.observableArray()

    self.loadReservation = function (reservationId) {
        $.ajax({
            url:'http://localhost:3000/reservation' + reservationId,
            headers: {
                "Access-Control-Allow-Origin":"*"
            },
            type: 'get',
            dataType: 'json',
            success: function (data) {
<<<<<<< HEAD
                ko.mapping.fromJS(data, {}, self.reservation);
=======
                ko.mapping.fromJS(reservation, {}, self.reservation)
>>>>>>> 2e341489ba77687aacaa77f5bc071c4326ebc130
                console.log(data)
            }
        })
    }
    self.removeReservation = function (reservationId) {
        $.ajax({
            url: 'http://localhost:3000/reservation/' + reservationId,
            type: 'delete',
            success: function (data) {
                console.log('Reservation deleted :o')
            }
        })
    }
    self.addReservation = function (reservation) {
        $.ajax({
            url: 'http://localhost:3000/reservation',
            type: 'post',
            dataType: 'json',
            data: ko.toJSON(reservation),
            success: function (data) {
                //log that the reservertion were added
                console.log('Reserve added :)')
            }
        })     
    }
    self.editReservation = function (reservation) {
        $.ajax({
            url: 'http://localhost:3000/reservation/' + reservation.id,
            type: 'put',
            dataType: 'json',
            data: ko.toJSON(reservation),
            success: function(data) {
                alert('Reserve deleted :)')
            }
        })
    }
<<<<<<< HEAD
    self.loadRoomList = function () {
                debugger;
        return $.ajax({
            url: 'http://localhost:3000/room',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    ko.mapping.fromJS(data, {}, self.roomList);
                    return self.roomList
                }
            }
        });
    } 
    
    self.loadRoomReservationList = function (room) {
        return $.ajax({
            url: 'http://localhost:3000/reservation/' + room.roomId,
            type: 'get',
            data: data,
            dataType: 'json',
            success: function (data) {;
                ko.mapping.fromJS(reservation, {
                    'reserva': {
=======
    
    self.loadDayReservationList = function (day) {
        if (!day) day = moment() 

        $.ajax({
            url: '/' + day,
            type: 'get',
            data: data,
            dataType: 'json',
            success: function (data) {
                ko.mapping.fromJS(data, {
                    'reservation': {
>>>>>>> 2e341489ba77687aacaa77f5bc071c4326ebc130
                        create: function(options) {
                            return new ReservationModel(options.data);
                        }
                    }
<<<<<<< HEAD
                }, self.roomReservationList);
=======
                }, self.roomReservationList)
>>>>>>> 2e341489ba77687aacaa77f5bc071c4326ebc130
            }
        })
    }
<<<<<<< HEAD
=======

    self.loadRoomList()

    ko.utils.arrayForEach(self.roomList, function (room) {
        self.loadDayReservationList(room)
        console.log(room.id)
    })
>>>>>>> 2e341489ba77687aacaa77f5bc071c4326ebc130
}


function RoomModel() {
    var self = this
    
    self.roomName = ko.observableArray()
    self.roomId = ko.observableArray()
}

function ReservationModel() {
    var self = this
    
    self.reservationId = ko.observable(null)
    self.reservationInitHour = ko.observable(null)
    self.reservationEndHour = ko.observable(null)
    self.reservationRoomId = ko.observable(null)
    self.reservationRequester = ko.observable(null)
    self.reservationTimeRange = ko.computed(function () {
        return self.reservationEndHour() - self.reservationInitHour()
    })
}

var app = new AppViewModel();
ko.applyBindings(app);



<<<<<<< HEAD
=======
let app = new AppViewModel()
ko.applyBindings(app)
>>>>>>> 2e341489ba77687aacaa77f5bc071c4326ebc130
