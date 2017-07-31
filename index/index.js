function AppViewModel() {
    var self = this;
    
    self.reservationModule = ko.observable(new ReservationModuleModel());
}

function ReservationModuleModel() {
    var self = this;
    
    self.reservation = ko.observable(new ReservationModel());
    self.roomList = ko.observableArray();

    self.loadReservation = function (reservationId) {
        $.ajax({
            url:'reservation' + reservationId,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                ko.mapping.fromJS(reservation, {}, self.reservation);
                console.log(data)
            }
        })
    }
    self.removeReservation = function (reservationId) {
        $.ajax({
            url: '/reservation/' + reservationId,
            type: 'delete',
            success: function (data) {
                console.log('Reservation deleted :o')
            }
        });
    }
    self.addReservation = function (reservation) {
        $.ajax({
            url: '/reservation',
            type: 'post',
            dataType: 'json',
            data: ko.toJSON(reservation),
            success: function (data) {
                //log that the reservertion were added
                console.log('Reserve added :)')
            }
        });     
    }
    self.editReservation = function (reservation) {
        $.ajax({
            url: '/reservation/' + reservation.id,
            type: 'put',
            dataType: 'json',
            data: ko.toJSON(reservation),
            success: function(data) {
                alert('Reserve deleted :)')
            }
        });
    }
    self.loadRoomList = function () {
        $.ajax({
            url: '/room',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                for(var i = 0, iLen = data.lenght; i < iLen; i++) {
                    if (self.roomList.indexOf(data[i].roomId) === -1) {
                        data[i] = new RoomModel();
                        self.roomList.push(data[i]);
                    }
                }
                /*ko.utils.arrayForEach(data, function (room) {
                    if (self.roomList.indexOf(room.roomId) === -1) {
                        room = new RoomModel();
                        self.roomList.push(room);
                    }
                })*/
            }
        });
    } 
    
    self.loadRoomReservationList = function (room) {
        $.ajax({
            url: '/reservation/' + room.roomId,
            type: 'get',
            data: data,
            dataType: 'json',
            success: function (data) {
                room.roomReservationList.push(data);
                ko.mapping.fromJS(reservation, {}, self.roomReservationList);
            }
        });
    }
    debugger;
    self.loadRoomList();
    debugger;
    ko.utils.arrayForEach(self.roomList, function (room) {
        self.loadRoomReservationList(room);
        console.log(room.id)
    })
}


function RoomModel() {
    var self = this;
    
    self.roomName = ko.observableArray();
    self.roomId = ko.observableArray();
    self.roomReservationList = ko.observableArray();
}

function ReservationModel() {
    var self = this;
    
    self.reservationId = ko.observable(null);
    self.reservationInitHour = ko.observable(null);
    self.reservationEndHour = ko.observable(null);
    self.reservationRoomId = ko.observable(null);
    self.reservationRequester = ko.observableArray();
    self.reservationTimeRange = ko.computed(function () {
        return self.reservationEndHour() - self.reservationInitHour();
    })
}


let app = new AppViewModel();
ko.applyBindings(app);