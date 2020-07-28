const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const Auth = require('../../../models/Auth');
const auth = require('../../../middleware/auth');

module.exports = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check for validation errors
  // If any, return them
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ errors: errors.array() });
  }

  // Establish date
  const date = Date.now();

  try {
    // Check to see if user already exists
    let user = await Auth.findOne({
      email,
    });

    // If so, return errors json for
    // for frontend parsing
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      });
    } else {
      user = new Auth({
        name,
        email,
        password,
        role,
        active: true,
        date,
      });

      // Hash password
      const salt = await bcrypt.genSalt(saltRounds);
      user.password = await bcrypt.hash(password, salt);

      // Save newly created user
      await user.save();

      // Login User after successful registration
      const payload = {
        user: {
          id: user.id,
          email: user.email,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRETKEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token });
          }
        }
      );
    }
  } catch (err) {
    console.error(err.message);

    return res.status(500).json({
      message: err.message,
    });
    //res.status(500).send(err.message);
  }
};
