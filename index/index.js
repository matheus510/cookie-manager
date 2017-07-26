function AppModel() {
	var self = this;

	self.reservationModule = ko.observable(new ReservationModuleModel());
}

function ReservationModuleModel() {
	var self = this;

	self.newReservation = ko.observable(new ReservationModel());
	self.editingReservation = ko.observable(new ReservationModel());
	self.roomLists = ko.observableArray();
}

function ReservationModel() {
	var self = this;

	self.reservationId = ko.observable(null);
	self.reservationInitHour = ko.observable(null);
	self.reservationEndHour = ko.observable(null);
	self.reservationRoom = ko.observable(new RoomModel);
	self.reservationRequester = ko.observableArray();
	self.reservationTimeRange = ko.computed(function () {
		return self.reservationEndHour() - self.reservationInitHour();
	})
}

function RoomModel() {
	var self = this;

	self.roomName = ko.observableArray();
	self.roomId = ko.observableArray();
	self.roomReservationList = ko.observableArray();
}

function loadRoomList() {
	$.ajax({
		url: '/room',
		type: 'get',
		data: data,
		dataType: 'json',
		success: function (data) {
			
			ko.utils.arrayForEach(data, function (room) {
				if (self.roomList.indexOf(room.roomId) === -1) {
					room = new RoomModel();
					self.roomList.push(room);
				}
			});
		}
	});
}

function loadReservationLists() {
	$.ajax({
		url: '/reservation',
		type: 'get',
		data: data,
		dataType: 'json',
		success: function (data) {
			ko.utils.arrayForEach(data, function (reservation) {
				
			});
		}
	});
}

function addReservation() {
	self.dayReservations.push(self.dayReservation());

}
function removeReservation() {
	//remover a reserva da array
}
function editReservation() {
	//editar a reserva
}

var app = new AppModel();
ko.applyBindings(app);