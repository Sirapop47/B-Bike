var mongoose = require('mongoose')
var Customer = mongoose.model('Customer')
var Employee = mongoose.model('Employee')

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {error: ''})
    })


    app.post('/', function (req, res, next) {
        var IDEmployee = req.body.IDEmployee
        var PasswordEmployee = req.body.PasswordEmployee
        var IDTracking = req.body.idTracking
        if ((IDEmployee) && (PasswordEmployee) && !(IDTracking)) {
            Employee.find({
                IDEmployee: IDEmployee,
                Password: PasswordEmployee
            }, (err, docs) => {
                if (!err) {
                    if (docs[0].Position == "CustomerService") {
                        res.redirect('/CScustomer/1')
                    } else {
                        res.redirect('/Driver/' + docs[0].IDEmployee + '/1')
                    }
                    //res.redirect('/testDB/' + 1)
                    //console.log(docs[0].IDEmployee);


                    //res.render("employee/list", { list: docs });
                } else {
                    res.render('index', {error: ''})
                    console.log('Error in retrieving employee list :' + err);
                }
            });
            //console.log('a')
        }
        else if (!(IDEmployee) && !(PasswordEmployee) && (IDTracking)) {
            //console.log('b')
            Customer.find({
                _id: IDTracking
            }, (err, docs) => {
                if (!err) {

                    res.redirect('/checkstatus/' + IDTracking)

                } else {
                    res.render('index', {error: 'กรุณาใส่ รหัสในการบริการ ให้ถูกต้อง'})

                    console.log('Error in retrieving employee list :' + err);

                }
            });

        }
        else {

            res.render('index', {error: ''})
            //console.log('c')
        }


    })







}