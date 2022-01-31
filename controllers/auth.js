const router = require("express").Router();
const Customer = require("../models/Customer");
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {
    // POST - adding the new user to the database
    console.log('===> Inside of /register');
    console.log(req.body);

    Customer.findOne({ email: req.body.email })
    .then(customer => {
        // if email already exists, a user will come back
        if (customer) {
            // send a 400 response
            return res.status(400).json({ message: 'Email already exists' });
        } else {
            // Create a new user
            const newCustomer = new Customer({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            // Salt and hash the password - before saving the user
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw Error;

                bcrypt.hash(newCustomer.password, salt, (err, hash) => {
                    if (err) console.log('==> Error inside of hash', err);
                    // Change the password in newUser to the hash
                    newCustomer.password = hash;
                    newCustomer.save()
                    .then(createdCustomer => res.json(createdCustomer))
                    .catch(err => console.log(err));
                });
            });
        }
    })
    .catch(err => {
        console.log('Error finding user', err);
        res.json({ message: 'An error occured. Please try again.'})
    })
});


// router.post("/register", async (req, res) => {
//     const newCustomer = new Customer({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//     });

//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) throw Error;

//         bcrypt.hash(newCustomer.password, salt, (err, hash) => {
//             if (err) console.log('==> Error inside of hash', err);
//             // Change the password in newUser to the hash
//             newCustomer.password = hash;
//             newCustomer.save()
//             .then(createdCustomer => res.json(createdCustomer))
//             .catch(err => console.log(err));
//         });
//     });

    // try {
    //     const saveCustomer = await newCustomer.save();
    //     res.status(201).json(saveCustomer);
    // } catch (err) {
    //     res.status(500).json(err);
    // }

// });


module.exports = router;