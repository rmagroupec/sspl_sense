const express = require('express');
const router = new express.Router();
const mysqlConnection = require("../../config/dbconfig");

const multer = require('multer');
const path = require('path');


const stoarge = multer.diskStorage({
    destination: './party/image/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }


})

const upload = multer({
    storage: stoarge
})



router.get('/PartyVisit/:uid', (req, res) => {
    mysqlConnection.query('Select * from party_visit WHERE uid= ?', [req.params.uid], (err, rows, fields) => {
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
router.get('/PartyVisit/:id/:uid', (req, res) => {
    mysqlConnection.query('Select * from party_visit where id = ? and uid = ?', [req.params.id, req.params.uid], (err, rows, fields) => {
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
router.post('/PartyVisit', upload.single('image'), (req, res) => {
    console.log("inside function");
    const data = { name_of_firm: req.body.name_of_firm, address: req.body.address, contactnumber: req.body.contactnumber, properitor_name: req.body.properitor_name, purpose_of_visit: req.body.purpose_of_visit, collection: req.body.collection, Image: req.file.filename, new_order: req.body.new_order, remark:req.body.remark, uid:req.body.uid, transdate: req.body.transdate };
    console.log(data);
    mysqlConnection.query('insert into party_visit set ?', [data], (err, rows, fields) => {
        res.type('json')

        if (!err)
            res.send(JSON.stringify({ res: 'success' }));
        else
            res.send(JSON.stringify({ res: 'error' }));

    });
});



module.exports = router;