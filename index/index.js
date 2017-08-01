function AppViewModel() {
    var self = this;
    
    self.reservationModule = new ReservationModuleModel();
    self.reservationModule.loadRoomList();
    debugger;
    for (var i = 0, iLen = self.reservationModule.roomList.lenght; i < iLen; i++) {        
        debugger;
        self.reservationModule.loadRoomReservationList(self.reservationModule.roomList[i]);
        console.log(room.id)
    }

}

function ReservationModuleModel() {
    var self = this;
    
    self.reservation = ko.observable(new ReservationModel());
    self.roomList = [];

    self.loadReservation = function (reservationId) {
        $.ajax({
            url:'http://localhost:3000/reservation' + reservationId,
            headers: {
                "Access-Control-Allow-Origin":"*"
            },
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
            url: 'http://localhost:3000/reservation/' + reservationId,
            type: 'delete',
            success: function (data) {
                console.log('Reservation deleted :o')
            }
        });
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
        });     
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
        });
    }
    self.loadRoomList = function () {
        $.ajax({
            url: 'http://localhost:3000/room',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                if (data) {
                    debugger;
                    for(var i = 0, iLen = data.lenght; i < iLen; i++) {
                        debugger;
                        if (self.roomList.indexOf(data[i].roomId) === -1) {
                            data[i] = new RoomModel();
                            self.roomList.push(data[i]);
                            
                        }
                    }
                    return self.roomList
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
        return $.ajax({
            url: 'http://localhost:3000/reservation/' + room.roomId,
            type: 'get',
            data: data,
            dataType: 'json',
            success: function (data) {
                room.roomReservationList.push(data);
                ko.mapping.fromJS(reservation, {}, self.roomReservationList);
            }
        });
    }
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



