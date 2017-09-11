let app = require('./config/express.js')()
let express = require('express')
let reservationServices = require('./app/services/reservations-services.js')
let bodyParser = require('body-parser')
let cors = require('cors')

function logMe(req, res, next) {
    console.log("touched")

    next()
}
app.use(cors())
app.use(bodyParser())

app.use('/', express.static('/cookie-manager/dist/main.js'))


app.get('/room', function(req, res) {
    reservationServices.getRoomList().then(results => {
        console.log(results)
        res.send(results)
    }, error => {
        res.status(400).send()
    })
})

app.get('/reservation/:date', function(req, res) {
    reservationServices.getDayReservationList(req.params.date).then(results => {
        console.log(results)
        res.send(results)
    }, error => {
        res.status(400).send()
        console.log(error)
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