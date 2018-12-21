var mongoose = require('mongoose')
var Customer = mongoose.model('Customer')




module.exports = function (app) {
    app.get('/map', function (req, res) {
        res.render('map')
    })

    app.post('/map', function (req, res, next) {
        //console.log(req.body)
        //res.end(req.body.distance)
        if (req.body.placeorigin == '' || req.body.placedestination == '' || req.body.namecustomers == '' || req.body.phonecustomers == '' || req.body.serviceselect == '') {
            console.log('Please fill in all information.');
        } else {
            insertRecord(req, res);
            // res.render('complete', {
            //     data: req.body
            // })
        }

    })

    



}

function insertRecord(req, res) {
    var customer = new Customer()
    customer.PlaceOrigin = req.body.placeorigin
    customer.PlaceDestination = req.body.placedestination
    customer.Name = req.body.namecustomers
    customer.Phone = req.body.phonecustomers
    customer.Service = req.body.serviceselect
    customer.Cost = req.body.servicecost
    customer.Distance = req.body.distance
    customer.Status = "รอดำเนินการ"
    customer.IDEmployee = "-"
    customer.save((err, doc) => {
        if (!err){
            //res.redirect('complete');
            console.log('Complete')
            
            res.render('complete', {
                data: doc
            })
        }   
        else {
            console.log('Error during record insertion : ' + err);
        }
    });
}

// PlaceOrigin
// PlaceDestination
// Name
// Phone
// Service
// Cost
// Distance


