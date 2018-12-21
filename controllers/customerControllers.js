const express = require('express')
const app = express()
var mongoose = require('mongoose')
var Customer = mongoose.model('Customer')
var Employee = mongoose.model('Employee')



app.get('/checkstatus/:IDTracking', function (req, res) {
    var idTracking = req.params.IDTracking


    Customer.find({
        _id: idTracking
    }, (err, Customerdocs) => {
        if (!err) {
            Customer.count({
                _id: idTracking
            }, function (err, count) {
                if (count > 0) {
                    if (Customerdocs[0].IDEmployee == '-') {
                        if (!err) {
                            res.render('customer/customerStatus', {
                                dataCustomer: Customerdocs
                            })
                        } else {
                            console.log('Error in retrieving employee list :' + err);
                        }
                        console.log('a')



                    } else {
                        Employee.find({
                            IDWork: idTracking
                        }, (err, Employeedocs) => {
                            if (!err) {
                                res.render('customer/customerStatus', {
                                    dataEmployee: Employeedocs,
                                    dataCustomer: Customerdocs
                                })
                            } else {
                                console.log('Error in retrieving employee list :' + err);
                            }
                        });
                    }
                   
                } else {
                    res.redirect('/')
                }
            });




        } else {
            res.redirect('/')

            console.log('Error in retrieving employee list :' + err);
        }
    });


})

module.exports = app;