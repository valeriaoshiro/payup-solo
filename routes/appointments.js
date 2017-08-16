var express = require('express');
var router = express.Router();

router.get('create', function(req, res) {
    res.render('appointments/create',) {
        timeZones: getTimeZones();
        appointment: new Appointment({name: '',
            phoneNumber: '',
            notification: '',
            timeZone: '',
            time: ''})});
});

module.exports = router; 