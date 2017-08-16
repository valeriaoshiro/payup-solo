var AppointmentSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    notification: Number,
    timeZone: String,
    time: {type: Date, index: true}
});