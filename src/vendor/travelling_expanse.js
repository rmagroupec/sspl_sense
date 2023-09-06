const express = require('express');
const router = new express.Router();
const mysqlConnection = require("../../config/dbconfig");







router.get('/travelling_expanse/:uid', (req, res) => {
    mysqlConnection.query('Select * from travelling_expanse WHERE uid= ?', [req.params.uid], (err, rows, fields) => {
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
router.get('/travelling_expanse/:id/:uid', (req, res) => {
    mysqlConnection.query('Select * from travelling_expanse where id = ? and uid = ?', [req.params.id, req.params.uid], (err, rows, fields) => {
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
router.post('/travelling_expanse', (req, res) => {
    console.log("inside function");
    const data = req.body;
    console.log(data);
    mysqlConnection.query('insert into travelling_expanse set ?', [data], (err, rows, fields) => {
        res.type('json')

        if (!err)
            res.send(JSON.stringify({ res: 'success' }));
        else
            res.send(JSON.stringify({ res: 'error' }));

    });
});



module.exports = router;