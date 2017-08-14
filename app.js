let app = require('./config/express.js')()
let reservationServices = require('./app/services/reservations-services.js')
let bodyParser = require('body-parser')

function logMe(req, res, next) {
    console.log("touched")

    next()
}
app.use(bodyParser())

app.get('/room', function(req, res) {
    reservationServices.getRoomList().then(results => {
        console.log(results)
        res.send(results)
    }, error => {
        res.status(400).send()
    })
})

app.get('/:date', function(req, res) {
    reservationServices.getDayReservationList(req.params.date).then(results => {
        console.log(results)
        res.send(results)
    }, error => {
        res.status(400).send()
    })
})

app.get('/reservation/:id', function(req, res) {
    reservationServices.getReservation(req.params.id).then(results => {
        console.log(results)
        res.send(results)
    }, error => {
        res.status(400).send()
    })
})


app.post('/reservation', function(req, res) {
    console.log(req.body)

    reservationServices.addReservation(req.body).then(results => {
        console.log(2)
        res.send(null)
    }, error => {
        console.log(error)
        res.status(400).send()
    })
})

app.put('/reservation', function(req, res) {
    reservationServices.editReservation(req.body).then(results => {
        res.send(null)
    }, error => {
        console.log(error)
        res.status(400).send()
    })
})
app.delete('/reservation/:id', function(req, res) {
    reservationServices.deleteReservation(req.params.id).then(results => {
        res.send(results)
    }, error => {
        console.log(error)
        res.status(400).send()
    })
})

app.listen(3000, function() {
    console.log("servidor rodando")
})