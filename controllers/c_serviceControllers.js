const express = require('express')
const app = express()
var mongoose = require('mongoose')
var Customer = mongoose.model('Customer')
var Employee = mongoose.model('Employee')


//all
app.get('/CScustomer/all/:page', function (req, res) {
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
                        setdata: "all",
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
//รอดำเนินงาน waiting
app.get('/CScustomer/waiting/:page', function (req, res) {
    var perPage = 5
    var page = req.params.page || 1

    Customer
        .find({
            Status: "รอดำเนินการ"
        })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, docs) {
            Customer.find({
                Status: "รอดำเนินการ"
            }).countDocuments().exec(function (err, count) {
                if (err) return next(err)
                else {
                    res.render('customer_service/cs_customers', {
                        list: docs,
                        current: page,
                        setdata: "waiting",
                        pages: Math.ceil(count / perPage)
                    })
                }

            })
        })
})

//กำลังดำเนินงาน working
app.get('/CScustomer/working/:page', function (req, res) {
    var perPage = 5
    var page = req.params.page || 1

    Customer
        .find({
            Status: "กำลังดำเนินงาน"
        })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, docs) {
            Customer.find({
                Status: "กำลังดำเนินงาน"
            }).countDocuments().exec(function (err, count) {
                if (err) return next(err)
                else {
                    res.render('customer_service/cs_customers', {
                        list: docs,
                        current: page,
                        setdata: "working",
                        pages: Math.ceil(count / perPage)
                    })
                }

            })
        })
})

//เสร็จสิ้นการดำเนินงาน finish
app.get('/CScustomer/finish/:page', function (req, res) {
    var perPage = 5
    var page = req.params.page || 1

    Customer
        .find({
            Status: "เสร็จสิ้นการดำเนินงาน"
        })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, docs) {
            Customer.find({
                Status: "เสร็จสิ้นการดำเนินงาน"
            }).countDocuments().exec(function (err, count) {
                if (err) return next(err)
                else {
                    res.render('customer_service/cs_customers', {
                        list: docs,
                        current: page,
                        setdata: "finish",
                        pages: Math.ceil(count / perPage)
                    })
                }

            })
        })
})

// //ยกเลิกการสั่งงาน cancel 
app.get('/CScustomer/cancel/:page', function (req, res) {
    var perPage = 5
    var page = req.params.page || 1

    Customer
        .find({
            Status: "ยกเลิกการสั่งงาน"
        })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, docs) {
            Customer.find({
                Status: "ยกเลิกการสั่งงาน"
            }).countDocuments().exec(function (err, count) {
                if (err) return next(err)
                else {
                    res.render('customer_service/cs_customers', {
                        list: docs,
                        current: page,
                        setdata: "cancel",
                        pages: Math.ceil(count / perPage)
                    })
                }

            })
        })
})



app.post('/CScustomer/:page', function (req, res) {
    var IDEmployee = req.body.IDEmployee_
    var IDCustomer = req.body.IDCustomer_

    var updateCustomer = {
        Status: "ยกเลิกการสั่งงาน"
    }
    var updateEmployee = {
        IDWork: "ว่าง",
        StatusWork: "ว่าง"
    }
    Customer.find({
        _id: IDCustomer
    }, (err, docs) => {
        if (!err) {

            Customer.findOneAndUpdate({
                _id: IDCustomer
            }, updateCustomer, {
                new: true
            }, (err, doc) => {
                if (!err) {
                    Employee.findOneAndUpdate({
                        IDEmployee: IDEmployee
                    }, updateEmployee, {
                        new: true
                    }, (err, doc) => {
                        if (!err) {
                            res.redirect('/CScustomer/1')

                        } else {

                            console.log('Error during record update : ' + err);
                        }
                    });
                } else {

                    console.log('Error during record update : ' + err);
                }
            });

        } else {
            console.log('Error in retrieving employee list :' + err);
        }
    })

})




app.get('/CSEmployee/all/:page', function (req, res) {
    var perPage = 6
    var page = req.params.page || 1

    Employee
        .find({
            Position: "DRIVER"
        })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, docs) {
            Employee.find({
                Position: "DRIVER"
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
            Position: "DRIVER"
        })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, docs) {
            Employee.find({
                IDWork: "ว่าง",
                Position: "DRIVER"
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








module.exports = app;