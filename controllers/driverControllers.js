const express = require('express')
const app = express()
var mongoose = require('mongoose')
var Customer = mongoose.model('Customer')
var Employee = mongoose.model('Employee')





app.get('/Driver/:idemployee/:page', function (req, res) {
    var perPage = 6
    var page = req.params.page || 1
    var idemployee = req.params.idemployee


    Employee.find({
        IDEmployee: idemployee
    }, (err, Employeedocs) => {
        if (!err) {

            Customer
                .find({
                    Status: "รอดำเนินการ"
                })
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(function (err, Customerdocs) {
                    Customer.find({
                        Status: "รอดำเนินการ"
                    }).countDocuments().exec(function (err, count) {
                        if (err) return next(err)
                        else {
                            if (Employeedocs[0].IDWork == "ว่าง") {
                                res.render('driver/driver_selectwork', {
                                    dataCustomer: Customerdocs,
                                    dataEmployee: Employeedocs,
                                    idemployee: idemployee,
                                    current: page,
                                    pages: Math.ceil(count / perPage)
                                })
                            } else {
                                res.redirect('/working/driver/' + idemployee)
                            }
                            //console.log(Employeedocs)
                            //console.log(Customerdocs)

                        }

                    })
                })

        } else {
            console.log('Error in retrieving employee list :' + err);
        }
    });


})

app.post('/Driver/:idemployee/:page', function (req, res) {
    var idemployee = req.params.idemployee
    var updateCustomer = {
        Status: "กำลังดำเนินงาน",
        IDEmployee: req.body.IDEmployee_
    }
    var updateEmployee = {
        IDWork: req.body.IDCustomer_,
        StatusWork: "กำลังเดินทางไปจุด A"
    }
    Employee.find({
        IDEmployee: idemployee
    }, (err, docs) => {
        if (!err) {
            if (docs[0].IDWork != "ว่าง") {
                res.redirect('/working/driver/' + idemployee)
            } else {
                //res.redirect('/testDB/' + 1)
                Customer.findOneAndUpdate({
                    _id: req.body.IDCustomer_
                }, updateCustomer, {
                    new: true
                }, (err, doc) => {
                    if (!err) {
                        Employee.findOneAndUpdate({
                            IDEmployee: req.body.IDEmployee_
                        }, updateEmployee, {
                            new: true
                        }, (err, doc) => {
                            if (!err) {
                                res.redirect('/working/driver/' + idemployee)

                            } else {

                                console.log('Error during record update : ' + err);
                            }
                        });
                    } else {

                        console.log('Error during record update : ' + err);
                    }
                });
            }

        } else {
            console.log('Error in retrieving employee list :' + err);
        }
    });

})

// app.get('/Driver/:idemployee', function (req, res) {
//     var idemployee = req.params.idemployee
//     Employee.find({ IDEmployee: idemployee}, (err, Employeedocs) => {
//         if (!err) {

//         } else {
//             console.log('Error in retrieving employee list :' + err);
//         }
//     });


// })

app.get('/working/driver/:idemployee', function (req, res) {
    var idemployee = req.params.idemployee

    Employee.find({
        IDEmployee: idemployee
    }, (err, Employeedocs) => {
        if (!err) {
            if (Employeedocs[0].IDWork == "ว่าง") {
                res.redirect('/Driver/' + idemployee + '/1')

            } else {
                Customer.find({
                    IDEmployee: idemployee
                }, (err, Customerdocs) => {
                    if (!err) {
                        res.render('driver/driver_working', {
                            dataEmployee: Employeedocs,
                            dataCustomer: Customerdocs
                        })
                    } else {
                        console.log('Error in retrieving employee list :' + err);
                    }
                });
            }



        } else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
})

app.post('/working/driver/:idemployee', function (req, res) {
    var idemployee = req.params.idemployee
    var update = req.body.updateStatus



    if (update == "เสร็จสิ้นการดำเนินงาน(ลูกค้าชำระเงินเรียบร้อยแล้ว)") {
        var updateStatusEmployee = {
            IDWork: "ว่าง",
            StatusWork: "ว่าง"
        }

        var updateStatusCustomer = {
            Status: "เสร็จสิ้นการดำเนินงาน",
            IDEmployee: idemployee + " เสร็จสิ้นการดำเนินงาน"
        }

        Employee.findOneAndUpdate({
            IDEmployee: idemployee
        }, updateStatusEmployee, {
            new: true
        }, (err, doc) => {
            if (!err) {
                Customer.findOneAndUpdate({
                    IDEmployee: idemployee
                }, updateStatusCustomer, {
                    new: true
                }, (err, doc) => {
                    if (!err) {
                        res.redirect('/Driver/' + idemployee + '/1')

                    } else {

                        console.log('Error during record update : ' + err);
                    }
                });
                //res.redirect('/working/driver/' + idemployee)
            } else {

                console.log('Error during record update : ' + err);
            }
        });

    } else {
        var updateStatusEmployee = {
            StatusWork: update
        }

        Employee.findOneAndUpdate({
            IDEmployee: idemployee
        }, updateStatusEmployee, {
            new: true
        }, (err, doc) => {
            if (!err) {
                res.redirect('/working/driver/' + idemployee)
            } else {

                console.log('Error during record update : ' + err);
            }
        });
    }








})


module.exports = app;