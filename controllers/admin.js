var mysql = require('mysql2');
var formidable = require('formidable');
const path = require('path');


// login get request
exports.getLogin = (req, res, next) => {
    if (req.session.admin == undefined) {
        res.render('admin/login', { msg: "", err: "" });
    }
    else {
        var connectDB = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "rupam123",
            database: "hotel_db"
        });
        data1 = "SELECT * " +
            "FROM  bookingstatus " 
        connectDB.query(data1, (err1, result1) => {
            if (err1) throw err1;
            else {
                for (i in result1) {
                    var a = result1[i].date;
                    result1[i].date = a.toString().slice(0, 15);
                }
                return res.render('admin/index', { msg: "", err: "", data: result1 });
            }
        })
    }

}

//login post request
exports.postLogin = (req, res, next) => {

    var connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rupam123",
        database: "hotel_db"
    });

    data = "SELECT * " +
        "FROM admin " +
        "WHERE name = " + mysql.escape(req.body.name) +
        "AND pass = " + mysql.escape(req.body.pass);

    data1 = "SELECT * " +
        "FROM  bookingstatus " 

    connectDB.query(data, (err, result) => {
        if (err) throw err;
        else {
            if (result.length) {
                req.session.admin = result[0].name;
                connectDB.query(data1, (err1, result1) => {
                    if (err1) throw err1;
                    else {
                        for (i in result1) {
                            var a = result1[i].date;
                            result1[i].date = a.toString().slice(0, 15);
                        }
                        return res.render('admin/index', { msg: "", err: "", data: result1 });
                    }
                })

            }
            else {
                return res.render('admin/login', { msg: "", err: "Please Check Your Information Again" });
            }
        }
    })
}

//change booking status
const nodemailer = require('nodemailer');
/* exports.postChnageStatus = (req, res, next) => {
    const connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rupam123",
        database: "hotel_db"
    });

    let value = 0;
    let emailSubject = "";
    let emailMessage = "";

    let data;
    if (req.body.click === "Approve") {
        value = 1;
        data = "UPDATE bookingstatus " +
            "SET status = " + mysql.escape(value) +
            " WHERE email = " + mysql.escape(req.body.mail) +
            " AND type = " + mysql.escape(req.body.type) +
            " AND category = " + mysql.escape(req.body.cat) +
            " AND roomWant = " + mysql.escape(req.body.want);
        emailSubject = "Staycation: Booking Approved";
        emailMessage = `
            Dear Customer,
            
            Your booking for ${req.body.type} in the ${req.body.cat} category has been approved.
            
            Thank you for choosing our service!
            
            Regards,
            Hotel Admin
        `;

    //  console.log(req.session.info);    
    //  console.log(req.body); 
    //  console.log(data);        

    connectDB.query(data, (err, result) => {
        if (err) throw err;
        else {
            res.render('admin/update', { msg: "Update Done Successfuly", err: "" })
        }
    })
    } else if (req.body.click === "Cancel") {
        data = "DELETE FROM bookingstatus " +
            "WHERE email = " + mysql.escape(req.body.mail) +
            " AND type = " + mysql.escape(req.body.type) +
            " AND category = " + mysql.escape(req.body.cat) +
            " AND roomWant = " + mysql.escape(req.body.want);
        emailSubject = "Booking Denied";
        emailMessage = `
            Dear Customer,
            
            Unfortunately, your booking for ${req.body.type} in the ${req.body.cat} category has been denied.
            
            Please contact us for more details.
            
            Regards,
            Hotel Admin
        `;
    }

    const data1 = "SELECT * FROM bookingstatus";

    connectDB.query(data, (err) => {
        if (err) {
            console.error(err);
            return res.render('admin/index', { msg: "", err: "Failed to update booking status", data: [] });
        } else {
            connectDB.query(data1, (err1, result1) => {
                if (err1) {
                    console.error(err1);
                    return res.render('admin/index', { msg: "", err: "Failed to fetch booking data", data: [] });
                } else {
                    for (let i in result1) {
                        const a = result1[i].date;
                        result1[i].date = a.toString().slice(0, 15);
                    }

                    // Send email notification
                    const transporter = nodemailer.createTransport({
                        service: 'gmail', // Use your email service provider
                        auth: {
                            user: 'rupammodak.celsius@gmail.com', // Replace with your email
                            pass: 'cnlw pvfs novs nwvi' // Replace with your email password
                        }
                    });
                    
                    const mailOptions = {
                        from: 'rupammodak.celsius@gmail.com', // Sender email
                        to: req.body.mail, // Recipient email
                        subject: emailSubject,
                        text: emailMessage
                    };
                    if(emailSubject!=="")
                    transporter.sendMail(mailOptions, (emailErr, info) => {
                        if (emailErr) {
                            console.error("Error sending email:", emailErr);
                            return res.render('admin/index', { msg: "Status updated but failed to send email", err: "", data: result1 });
                        } else {
                            console.log("Email sent: " + info.response);
                            return res.render('admin/index', { msg: "Status updated and email sent successfully", err: "", data: result1 });
                        }
                    });
                    else
                    {
                        return res.render('admin/index', { msg: "Status updated and email sent successfully", err: "", data: result1 });
                    }
                }
            });
        }
    });
}; */

exports.postChnageStatus = (req, res, next) => {
    const connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rupam123",
        database: "hotel_db"
    });

    let value = 0;
    let emailSubject = "";
    let emailMessage = "";

    let data;
    if (req.body.click === "Approve") {
        value = 1;
        data = "UPDATE bookingstatus " +
            "SET status = " + mysql.escape(value) +
            " WHERE email = " + mysql.escape(req.body.mail) +
            " AND type = " + mysql.escape(req.body.type) +
            " AND category = " + mysql.escape(req.body.cat) +
            " AND roomWant = " + mysql.escape(req.body.want);
        emailSubject = "Staycation: Booking Approved";
        emailMessage = `
            Dear Customer,
            
            Your booking for ${req.body.type} in the ${req.body.cat} category has been approved.
            
            Thank you for choosing our service!
            
            Regards,
            Hotel Admin
        `;

        // Decrement available rooms query
        const decrementRoomsQuery = `
            UPDATE category
            SET available = available - 1
            WHERE type = ${mysql.escape(req.body.type)} 
            AND name = ${mysql.escape(req.body.cat)} 
            AND available > 0;
        `;

        connectDB.query(decrementRoomsQuery, (roomErr) => {
            if (roomErr) {
                console.error("Error decrementing available rooms:", roomErr);
                return res.render('admin/index', { msg: "", err: "Failed to update room availability", data: [] });
            }
        });
    } else if (req.body.click === "Cancel") {
        data = "DELETE FROM bookingstatus " +
            "WHERE email = " + mysql.escape(req.body.mail) +
            " AND type = " + mysql.escape(req.body.type) +
            " AND category = " + mysql.escape(req.body.cat) +
            " AND roomWant = " + mysql.escape(req.body.want);
        emailSubject = "Booking Denied";
        emailMessage = `
            Dear Customer,
            
            Unfortunately, your booking for ${req.body.type} in the ${req.body.cat} category has been denied.
            
            Please contact us for more details.
            
            Regards,
            Hotel Admin
        `;
    }

    const data1 = "SELECT * FROM bookingstatus";

    connectDB.query(data, (err) => {
        if (err) {
            console.error(err);
            return res.render('admin/index', { msg: "", err: "Failed to update booking status", data: [] });
        } else {
            connectDB.query(data1, (err1, result1) => {
                if (err1) {
                    console.error(err1);
                    return res.render('admin/index', { msg: "", err: "Failed to fetch booking data", data: [] });
                } else {
                    for (let i in result1) {
                        const a = result1[i].date;
                        result1[i].date = a.toString().slice(0, 15);
                    }

                    // Send email notification
                    const transporter = nodemailer.createTransport({
                        service: 'gmail', // Use your email service provider
                        auth: {
                            user: 'rupammodak.celsius@gmail.com', // Replace with your email
                            pass: 'cnlw pvfs novs nwvi' // Replace with your email password
                        }
                    });

                    const mailOptions = {
                        from: 'rupammodak.celsius@gmail.com', // Sender email
                        to: req.body.mail, // Recipient email
                        subject: emailSubject,
                        text: emailMessage
                    };

                    if (emailSubject !== "") {
                        transporter.sendMail(mailOptions, (emailErr, info) => {
                            if (emailErr) {
                                console.error("Error sending email:", emailErr);
                                return res.render('admin/index', { msg: "Status updated but failed to send email", err: "", data: result1 });
                            } else {
                                console.log("Email sent: " + info.response);
                                return res.render('admin/index', { msg: "Status updated and email sent successfully", err: "", data: result1 });
                            }
                        });
                    } else {
                        return res.render('admin/index', { msg: "Status updated successfully", err: "", data: result1 });
                    }
                }
            });
        }
    });
};

/* exports.postChnageStatus = (req, res, next) => {
    //console.log(req.body);

    var connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rupam123",
        database: "hotel_db"
    });

    var value = 0;

    if (req.body.click == "Approve") {
        value = 1;
        data = "UPDATE bookingstatus " +
            " SET  status = " + mysql.escape(value) +
            " WHERE email = " + mysql.escape(req.body.mail) +
            " AND type = " + mysql.escape(req.body.type) +
            " AND category = " + mysql.escape(req.body.cat) +
            " AND roomWant = " + mysql.escape(req.body.want)

    } else {
        data = "DELETE FROM bookingstatus " +
            " WHERE email = " + mysql.escape(req.body.mail) +
            " AND type = " + mysql.escape(req.body.type) +
            " AND category = " + mysql.escape(req.body.cat) +
            " AND roomWant = " + mysql.escape(req.body.want)
    }

    data1 = "SELECT * " +
        "FROM  bookingstatus "

    connectDB.query(data, (err, result) => {
        if (err) throw err;
        else {
            connectDB.query(data1, (err1, result1) => {
                if (err1) throw err1;
                else {

                    for (i in result1) {
                        var a = result1[i].date;
                        result1[i].date = a.toString().slice(0, 15);
                    }
                    return res.render('admin/index', { msg: "", err: "", data: result1 });
                }
            })
        }
    })

} */

//get add hotel page

exports.getAddHotel = (req, res, next) => {
    res.render('admin/addhotel', { msg: "", err: "" });
}

//add new hotel info
/* exports.postAddHotel = (req, res, next) => {
   
    var connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rupam123",
        database: "hotel_db"
    });
    
    //var
    var cat = "", type = "", cost = 0, avlvl = 0, des = ""
   var imgPath=""
    var wrong = 0;
    new formidable.IncomingForm().parse(req)
        .on('field', (name, field) => {
            if (name === "cat") {
                cat = field;
            }
            else if (name === "type") {
                type = field;
            }
            else if (name === "cost") {
                cost = parseInt(field);
            }
            else if (name === "avlvl") {
                avlvl = parseInt(field);
            }
            else if (name === "des") {
                des = field
            }

        })
        .on('file', (name, file) => {
            // console.log('Uploaded file', name)
            //   fs.rename(file.path,__dirname+"a")
        })
        .on('fileBegin', function (name, file) {
            //console.log(mail);

            var fileType = file.type.split('/').pop();
            if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg') {

                a = path.join(__dirname, '../')
                ///  console.log(__dirname)
                //  console.log(a)
                if (name === "img") {
                    imgPath = (cat + type + cost + "." + fileType);
                }
                imgPath ='/assets/img/rooms/' + (cat + type + cost + "." + fileType)
                file.path = a + '/public/assets/img/rooms/' + (cat + type + cost + "." + fileType); // __dirname
            } else {
                console.log("Wrong File type")
                wrong = 1;
                res.render('admin/addhotel', { msg: "", err: "Wrong File type" });
            }
        })
        .on('aborted', () => {
            console.error('Request aborted by the user')
        })
        .on('error', (err) => {
            console.error('Error', err)
            throw err
        })
        .on('end', () => {

            if (wrong == 1) {
                console.log("Error")
            }
            else {

                //saveDir = __dirname + '/uploads/';
                
                data = "INSERT INTO `category`(`name`, `type`, `cost`, `available`, `img`, `dec`) "+
                         "VALUES('" +cat + "','" + type + "', '" + cost + "','" +avlvl + "' ,'" + imgPath + "' ,'" + des + "' )"
                connectDB.query(data, (err, result) => {

                    if (err) {
                        throw err;
                    }
                    else {
                        res.render('admin/addhotel', { msg: "Data Insert Successfuly", err: "" });
                    }
                });
            }
        })
} */
const multer = require('multer');

// Database connection
const connectDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rupam123",
    database: "hotel_db",
});

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/assets/img/rooms')); // Upload directory
    },
    filename: (req, file, cb) => {
        const fileType = path.extname(file.originalname); // Get the file extension
        const uniqueName = `${Date.now()}-${file.fieldname}${fileType}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPG, PNG, and JPEG are allowed."), false);
        }
    },
}).single('img'); // Expecting a single file with the field name 'img'

exports.postAddHotel = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.render('admin/addhotel', { msg: "", err: err.message });
        }

        // Extract fields from the request
        const { cat, type, cost, avlvl, des } = req.body;

        if (!cat || !type || !cost || !avlvl || !des || !req.file) {
            return res.render('admin/addhotel', { msg: "", err: "All fields are required." });
        }

        const imgPath = `/assets/img/rooms/${req.file.filename}`;
        const sql = `INSERT INTO category VALUES (?, ?, ?, ?, ?, ?)`;

        connectDB.query(sql, [cat, type, parseInt(cost), parseInt(avlvl), imgPath, des], (dbErr, result) => {
            if (dbErr) {
                console.error("Database error:", dbErr);
                return res.render('admin/addhotel', { msg: "", err: "Database error occurred." });
            }
            res.render('admin/addhotel', { msg: "Data Inserted Successfully", err: "" });
        });
    });
};


//get update page
exports.getSearch = (req, res, next) => {
    res.render('admin/search', { msg: "", err: "" })
}

//post request
exports.postSearch = (req, res, next) => {
    //console.log(req.body);

    var connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rupam123",
        database: "hotel_db"
    });

    data = "SELECT * " +
        "FROM category " +
        "WHERE name = " + mysql.escape(req.body.cat);

    connectDB.query(data, (err, result) => {
        if (err) throw err;
        else {
            return res.render('admin/update', { msg: "", err: "", data: result });
        }
    })

}

exports.getAllRooms = (req, res, next) => {
    // Create a database connection
    const connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rupam123",
        database: "hotel_db"
    });

    // SQL query to fetch all rooms
    const query = "SELECT * FROM category";

    // Execute the query
    connectDB.query(query, (err, result) => {

        if (err) {
            console.error("Database query error:", err);
            return res.render('admin/update', { msg: "", err: "Failed to fetch rooms", data: [] });
        }

        // Render the page with the fetched data
        return res.render('admin/update', { msg: "", err: "", data: result });
    });
};


//get update page 

exports.getUpdate = (req, res, next) => {
    // console.log(req.body);
    var connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rupam123",
        database: "hotel_db"
    });

    data = "SELECT * " +
        "FROM category " +
        "WHERE name = " + mysql.escape(req.body.cat) +
        " AND type = " + mysql.escape(req.body.type) +
        " AND cost = " + mysql.escape(req.body.cost);

    connectDB.query(data, (err, result) => {
        if (err) throw err;
        else {
            req.session.info = result[0];
            res.render('admin/updatePage', { data: result[0] });
        }
    })
}

//update previous data

exports.updatePrevData = (req, res, next) => {

    var connectDB = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rupam123",
        database: "hotel_db"
    });

    data = "UPDATE category " +
        "SET type = " + mysql.escape(req.body.type) +
        ", cost = " + mysql.escape(parseInt(req.body.cost)) +
        ", available = " + mysql.escape(parseInt(req.body.avlvl)) +
        ", `dec` = " + mysql.escape(req.body.des) +
        " WHERE name = " + mysql.escape(req.session.info.name) +
        " AND type = " + mysql.escape(req.session.info.type) +
        " AND cost = " + mysql.escape(parseInt(req.session.info.cost))

    //  console.log(req.session.info);    
    //  console.log(req.body); 
    //  console.log(data);        

    connectDB.query(data, (err, result) => {
        if (err) throw err;
        else {
            res.render('admin/update', { msg: "Update Done Successfuly", err: "" })
        }
    })

}

//logout
exports.logout = (req, res, next) => {
    req.session.destroy();
    res.render('admin/login', { msg: "", err: "" });
}

