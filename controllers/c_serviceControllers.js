const express = require('express')
const app = express()
var mongoose = require('mongoose')
var Customer = mongoose.model('Customer')
var Employee = mongoose.model('Employee')



app.get('/CScustomer/:page', function (req, res) {
    var perPage = 5
    var page = req.params.page || 1

    Customer
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, docs) {
            Customer.countDocuments().exec(function (err, count) {
                if (err) return next(err)
                else {
                    res.render('customer_service/cs_customers', {
                        list: docs,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
                }

            })
        })


    // Customer.find((err, docs) => {
    //     if (!err) {
    //         res.render('manage/customers', {
    //             list: docs
    //         })
    //         //res.render("employee/list", { list: docs });
    //     } else {
    //         console.log('Error in retrieving employee list :' + err);
    //     }
    // });

})



app.get('/CSEmployee/all/:page', function (req, res) {
    var perPage = 6
    var page = req.params.page || 1

    Employee
        .find({
            Position : "DRIVER"
        })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, docs) {
            Employee.find({
                Position : "DRIVER"
            }).countDocuments().exec(function (err, count) {
                if (err) return next(err)
                else {
                    res.render('customer_service/cs_employees', {
                        data: docs,
                        current: page,
                        setdata: "all",
                        pages: Math.ceil(count / perPage)
                    })
                }

            })
        })


    
})


app.get('/CSEmployee/free/:page', function (req, res) {
    var perPage = 6
    var page = req.params.page || 1

    Employee
        .find({
            IDWork: "ว่าง",
            Position : "DRIVER"
        })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, docs) {
            Employee.find({
                IDWork: "ว่าง",
                Position : "DRIVER"
            }).countDocuments().exec(function (err, count) {
                if (err) return next(err)
                else {
                    res.render('customer_service/cs_employees', {
                        data: docs,
                        current: page,
                        setdata: "free",
                        pages: Math.ceil(count / perPage)
                    })
                }

            })
        })
})



app.post('/CSEmployee', function (req, res) {

})




module.exports = app;