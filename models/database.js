var mongoose = require('mongoose');
var url = "mongodb://mydb:";



mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (!err) { 
        console.log('MongoDB Connection Succeeded.') 
    }
    else { 
        console.log('Error in DB connection : ' + err) 
    }
});

require('./customers.models');
require('./employee.models');

// MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
//     if (!err){
//         console.log('MongoDB Connection Successded. ')
//     }
//     else{
//         console.log('Error in DB connection : ' + err)
//     }
//     //if (err) throw err;
//     //console.log("Database created!");
//     //db.close();
//   });



// var add_data_order = function(placeorigin,  placedestination, namecustomers, phonecustomers, serviceselect, servicecost, distance) {
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("mydb");
//         var myobj = { 
//             PlaceOrigin: placeorigin, 
//             PlaceDestination: placedestination,
//             Name: namecustomers,
//             Phone: phonecustomers,
//             Service: serviceselect,
//             Cost: servicecost,
//             Distance: distance
//         };
//         dbo.collection("customers").insertOne(myobj, function(err, res) {
//           if (err) throw err;
//           console.log("1 document inserted");
//           db.close();
//         });
//       });
// }

// module.exports = {add_data_order};
