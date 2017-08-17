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

<<<<<<< Updated upstream
function RoomModel() {
    let self = this
    
<<<<<<< HEAD
    self.roomName = ko.observableArray();
    self.roomId = ko.observableArray();
    self.roomReservationList = ko.observableArray();
=======
    self.reservation = ko.observable(new ReservationModel());
    self.roomList = ko.observableArray();

    self.loadRoomReservationList = function (room) {
        $.ajax({
            url: '/reservation/' + room.roomId,
            type: 'get',
            data: data,
            dataType: 'json',
            success: function(data) {
                room.roomReservationList.push(data);
                ko.mapping.fromJS(reservation, {
                    reservationRoom: {
                        create: function(options) {
                            var reservationRoom = new roomModel();

                            ko.mapping.fromJS(options.data, {}, reservationRoom);

                            return reservationRoom;
                        }
                    }
                }, self.roomReservation);
                self.roomReservationList.push(self.roomReservation);
            }
        });
    }
>>>>>>> Stashed changes
=======
    self.roomName = ko.observableArray()
    self.roomId = ko.observableArray()
>>>>>>> 6a03ca31a9d37ace0974ad5c645071866ae19ada
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

    self.addReservation = function () {
        $.ajax({
            url: '/reservation',
            type: 'post',
            dataType: 'json',
            data: ko.mapping.toJSON(self),
            success: function(data) {

            }
        });
    }
}

<<<<<<< Updated upstream
=======
function RoomModel() {
    var self = this;

    self.roomName = ko.observableArray();
    self.roomId = ko.observableArray();
    self.roomReservation = ko.observable(new ReservationModel());
    self.roomReservationList = ko.observableArray();
}

function loadRoomList() {
    $.ajax({
        url: '/room',
        type: 'get',
        data: data,
        dataType: 'json',
        success: function(data) {

            ko.utils.arrayForEach(data, function(room) {
                if (self.roomList.indexOf(room.roomId) === -1) {
                    room = new RoomModel();
                    self.roomList.push(room);
                }
            });
        }
    });
}



function removeReservation(reservationId) {
    $.ajax({
        url: '/reservation/' + reservationId,
        type: 'delete',
        success: function(data) {

        }
    });
}

function editReservation() {
    //editar a reserva
}

<<<<<<< HEAD
ko.utils.arrayForEach(self.roomList, function(room) {
    loadRoomReservationList(room);
})
>>>>>>> Stashed changes

=======
>>>>>>> 6a03ca31a9d37ace0974ad5c645071866ae19ada
let app = new AppViewModel();
ko.applyBindings(app);
