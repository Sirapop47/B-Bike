const mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    PlaceOrigin: {
        type: String,
        //required: 'This field is required.'
    },
    PlaceDestination: {
        type: String
    },
    Name: {
        type: String
    },
    Phone: {
        type: String
    },
    Service: {
        type: String
    },
    Cost: {
        type: String
    },
    Distance: {
        type: String
    },
    Status: {
        type: String
    },
    IDEmployee: {
        type: String
    }
});


mongoose.model('Customer', customerSchema);


//             PlaceOrigin: placeorigin, 
//             PlaceDestination: placedestination,
//             Name: namecustomers,
//             Phone: phonecustomers,
//             Service: serviceselect,
//             Cost: servicecost,
//             Distance: distance

// PlaceOrigin
// PlaceDestination
// Name
// Phone
// Service
// Cost
// Distance

