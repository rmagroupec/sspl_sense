const express = require('express');
const router = new express.Router();
const mysqlConnection = require("../../config/dbconfig");







router.get('/mileage_claim/:uid', (req, res) => {
    mysqlConnection.query('Select * from mileage_claim WHERE uid= ?', [req.params.uid], (err, rows, fields) => {
        res.type('json')
        if (!err)
            if (rows && rows.length) {
                res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
            } else {
                res.send(JSON.stringify({ data: "No Rows Found" }));
            }
        else
            res.send(JSON.stringify({ data: "error" }));

    });
});


// Get an Employees
router.get('/mileage_claim/:id/:uid', (req, res) => {
    mysqlConnection.query('Select * from mileage_claim where id = ? and uid = ?', [req.params.id, req.params.uid], (err, rows, fields) => {
        res.type('json')

        if (!err)
            if (rows && rows.length) {
                res.send(JSON.stringify({ rowsCount: rows.length, data: rows }));
            } else {
                res.send(JSON.stringify({ data: "No Rows Found" }));
            }
        else
            res.send(JSON.stringify({ data: "error" }));

    });
});

// // Delete an Employees
// router.delete('/persons/:id', (req, res) => {
//     mysqlConnection.query('delete from persons where PersonID = ?', [req.params.id], (err, rows, fields) => {
//         if (!err)
//             res.send('Person Deleted Succesfully');
//         else
//             console.log(err);

//     });
// });

// Insert an basic_details
router.post('/mileage_claim', (req, res) => {
    console.log("inside function");
    const data = req.body;
    console.log(data);
    mysqlConnection.query('insert into mileage_claim set ?', [data], (err, rows, fields) => {
        res.type('json')

        if (!err)
            res.send(JSON.stringify({ res: 'success' }));
        else
            res.send(JSON.stringify({ res: 'error' }));

    });
});



module.exports = router;