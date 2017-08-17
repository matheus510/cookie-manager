function AppViewModel() {
    var self = this;
    
    self.agenda = ko.observable(new AgendaModel());
    self.roomList = ko.observableArray();

    self.loadRoomList = function () {
        debugger;
        $.ajax({
            url: 'http://localhost:3000/room',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                debugger;
                self.roomList(data)
            }
        })
    }
    self.loadRoomList();
}

function AgendaModel() {
    var self = this;
    
    self.reservation = ko.observable(new ReservationModel());
    self.day = ko.observable(null);
    self.reservationList = ko.observableArray();

    self.loadReservation = function (reservationId) {
        $.ajax({
            url:'http://localhost:3000/reservation/' + reservationId,
            headers: {
                "Access-Control-Allow-Origin":"*"
            },
            type: 'get',
            dataType: 'json',
            success: function (data) {
                ko.mapping.fromJS(reservation, {}, self.reservation)
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
    self.loadDayReservationList = function (day) {
        $.ajax({
            url: 'http://localhost:3000/reservation/' + day,
            type: 'GET',
            dataType: 'json',
            headers: {
                "Access-Control-Allow-Origin":"*"
            },
            success: function (data) {
                console.log(data)
                  ko.mapping.fromJS(data, {
                    reservation: {
                        create: function(options) {
                            var reservation = new ReservationModel();
                            
                            ko.mapping.fromJS(options.data, {}, reservation);
                            
                            return reservation;
                        }
                    }                    
                }, self.reservationList)  
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    self.loadDayReservationList('2017-02-15');
}    

function RoomModel() {
    let self = this
    
    self.roomName = ko.observableArray()
    self.roomId = ko.observableArray()
}

function ReservationModel() {
    let self = this
    
    self.reservationId = ko.observable(null)
    self.reservationInitHour = ko.observable(null)
    self.reservationEndHour = ko.observable(null)
    self.reservationRoomId = ko.observable(null)
    self.reservationRequester = ko.observable(null)
    self.reservationTimeRange = ko.computed(function () {
        return self.reservationEndHour() - self.reservationInitHour()
    })
}

let app = new AppViewModel();
ko.applyBindings(app);
