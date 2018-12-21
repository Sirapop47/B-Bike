const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    IDEmployee: {
        type: String,
        //required: 'This field is required.'
    },
    Password: {
        type: String
    },
    Name: {
        type: String
    },
    Phone: {
        type: String
    },
    Position: {
        type: String
    },
    IDWork: {
        type: String
    },
    StatusWork: {
        type: String
    },
});


mongoose.model('Employee', employeeSchema);


// "IDEmployee": "HR001",
// "Password": "000000",
// "Name": "นายมาสาย นะ",
// "Phone": "0864868540",
// "Position": "HR",
// "IDWork": "-",
// "StatusWork": "-"