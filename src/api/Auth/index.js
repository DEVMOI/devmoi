const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getDB = require('../../db').getDB;
const ObjectID = require('mongodb').ObjectID;
const auth = require('../../middleware/auth');

// load Auth and Invitation models
const Invitation = require('../../models/Invitation');

// auth routes
const registerUser = require('./registerUser');
const inviteUser = require('./inviteUser');
const validateInvite = require('./validateInvite');
const sendResetUser = require('./sendResetUser');
const validateReset = require('./validateReset');
const getAllUsers = require('./getAllUsers');
const removeUser = require('./removeUser');

// encrypt query string
const encryptData = require('../../helpers/encryptData');
const decryptData = require('../../helpers/decryptData');

module.exports = (router, app) => {
  const db = getDB();

  // @route    GET api/auth
  // @desc     get user to load after authentication
  // @access   Public
  router.get('/api/auth', auth, async (req, res) => {
    try {
      let uid = req.user.id;
      if (!ObjectID.isValid(uid)) {
        throw 'Invalid MongoDB ID.';
      } else {
        let user = await db.collection('auths').findOne(ObjectID(uid));
        res.json(user);
      }
    } catch (err) {
      // console.log('error inside api/auth get', err);
      res.status(500).send('Server Error');
    }
  });

  // @route    GET api/auth/:id
  // @desc     get user by id
  // @access   Public
  router.get('/api/auth/user_by_id/:id', async (req, res) => {
    try {
      if (req.params.id) {
        // const user = await Auth.findById({
        //   _id: req.params.id,
        // }).select('-password');

        if (!ObjectID.isValid(req.params.id)) throw 'Invalid MongoDB ID.';
        const user = await users.findOne(ObjectID(id));
        console.log('/api/auth/user_by_id/:id');
        // return results
        res.json(user);
      }
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });

  /**
   * @method GET
   * @route /api/auth
   * @description get all users
   */
  router.get('/api/auth/allusers', (req, res) => {
    getAllUsers(req, res);
  });

  /**
   * @method POST
   * @route /api/auth/invite
   * @description Sends User Invite based on email
   */
  router.post(
    '/api/auth/inv(ite)?',
    [check('email').exists().isEmail(), check('role').not().isEmpty()],
    async (req, res) => {
      inviteUser(req, res);
    }
  );

  /**
   * @method
   * @route /api/users/validate-invite/:inviteHash
   * @route /api/users/ve/:inviteHash
   * @description Gets Hash from INV
   */
  router.get(
    '(/api)?/auth/v(alidate-invit)?e/:inviteHash',
    async (req, res) => {
      var validInvite = validateInvite(req, res);
      var getEmail = validInvite.email;
      var getRole = validInvite.role;
      var expDateString = validInvite.expiryDate;
      var expiryDate = new Date(1970, 0, 1);
      expiryDate.setSeconds(parseInt(expDateString));
      if (expiryDate >= new Date()) {
        const invitedUserStr = encryptData(
          { email: getEmail, role: getRole },
          process.env.SECRETKEY
        );
        const invitedUser = JSON.stringify(invitedUserStr);
        res.redirect('/register/' + invitedUser);
      } else {
        logger.info(`Link expired on ${expiryDate}`);
        res.status(400).json({ msg: `Link expired on ${expiryDate}` });
      }
    }
  );

  /**
   * @method GET
   * @route /register/:invitedUser
   * @description Gets registration form
   */
  router.get('/register/:invitedUser', (req, res) => {
    const userInfoStr = JSON.parse(req.params.invitedUser);
    const userInfo = decryptData(userInfoStr, process.env.SECRETKEY);
    return app.render(req, res, '/Register', {
      query: {
        serverEmail: userInfo.email,
        serverRole: userInfo.role,
      },
    });
  });

  /**
   * @method POST
   * @route /api/auth/reset
   * @description Sends User Reset Password based on email
   */
  router.post(
    '/api/auth/reset',
    [check('email').exists().isEmail()],
    async (req, res) => {
      sendResetUser(req, res);
    }
  );

  /**
   * @method
   * @route /api/users/validate-reset/:resetHash
   * @description Gets Hash from RESET PASSWORD EMAIL
   */
  router.get('(/api)?/auth/validate-reset/:resetHash', async (req, res) => {
    var validReset = validateReset(req, res);
    var getEmail = validReset.email;
    // var getRole = validReset.role;

    var expDateString = validReset.expiryDate;
    var expiryDate = new Date(1970, 0, 1);
    expiryDate.setSeconds(parseInt(expDateString));
    if (expiryDate >= new Date()) {
      const resetUserStr = encryptData(
        { email: getEmail },
        process.env.SECRETKEY
      );
      const resetUser = JSON.stringify(resetUserStr);

      res.redirect('/ResetPassword/' + resetUser);
    } else {
      logger.info(`Link expired on ${expiryDate}`);
      res.status(400).json({ msg: `Link expired on ${expiryDate}` });
    }
  });

  /**
   * @method GET
   * @route /reset-password/:user
   * @description Gets reset-password form
   */
  router.get('/ResetPassword/:user', (req, res) => {
    const userInfoStr = JSON.parse(req.params.user);

    const userInfo = decryptData(userInfoStr, process.env.SECRETKEY);
    return app.render(req, res, '/ResetPassword', {
      query: {
        serverEmail: userInfo.email,
      },
    });
  });

  /**
   * @method DELETE
   * @route /api/auth/inv/del
   * @description Deletes all invitations for given email
   */
  router.delete('/api/auth/inv/', (req, res) => {
    console.log('Email to delete:', req.body.email);

    try {
      // Find invatations for email
      Invitation.deleteMany(
        {
          recipientEmail: req.body.email,
        },
        (err, result) => {
          if (err) {
            res.json({ msg: 'Error:', err });
          } else {
            res.json({ msg: 'Successful Deletion:', result });
          }
        }
      );
    } catch (err) {
      res.json({ msg: 'Error: ' + err });
    }
  });

  /**
   * @method POST
   * @route /api/users/register
   * @description REGISTERS VALID USERS
   */
  router.post(
    '/api/auth/register',
    [
      check('email')
        .exists()
        .isEmail()
        .withMessage('Please enter a valid email.'),
      check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),
    ],
    async (req, res) => {
      registerUser(req, res);
    }
  );

  /**
   * @method POST
   * @route /api/users/login
   * @description LOGS IN A VALID USER
   */
  router.post(
    '/api/auth/login',
    [check('email').exists().isEmail(), check('password').exists()],
    async (req, res) => {
      const { email, password } = req.body;

      try {
        let user = await db.collection('auths').findOne({ email: email });
        // console.log('/api/auth/login:', user ? user : user);

        if (!user) {
          console.log('Username is invalid!');
          return res.status(400).json({
            errors: {
              msg: 'Invalid Credentials',
            },
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({
            errors: {
              msg: 'Invalid Credentials',
            },
          });
        }

        const payload = {
          user: {
            id: user._id,
          },
        };

        jwt.sign(
          payload,
          process.env.SECRETKEY,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            // console.log('i****** in here now*******', token);
            res.json({ token });
          }
        );
      } catch (err) {
        console.error('Error in api/Auth/index - /auth/login: ', err.message);
        res.status(500).send(err.message);
      }
    }
  );

  /**
   * @method PUT
   * @route /api/auth/update/name
   * @description UPDATES USERS name
   */
  router.put('/api/auth/update/name', async (req, res) => {
    const { id, name } = req.body;
    try {
      // let doc = await Auth.findOneAndUpdate(
      //   { _id: id },
      //   {
      //     name: name,
      //   },
      //   { new: true }
      // );

      let doc = await db.collection('auths').findOneAndUpdate(name);
      console.log('/api/auth/update/name:', doc ? doc.name : doc);
      res.json({ updatedUser: doc });
    } catch (error) {
      res.status(400).json({
        error: 'name Update Failed' + error,
      });
    }
  });

  /**
   * @method PUT
   * @route /api/auth/update/role
   * @description UPDATES USERS role
   */
  router.put('/api/auth/update/role', async (req, res) => {
    const { id, role } = req.body;
    try {
      console.log(id, role);
      // let user = await Auth.findOne({
      //   _id: id,
      // });

      if (!ObjectID.isValid(req.params.id))
        throw 'Invalid MongoDB ID - update/role';
      const user = await db.collection('auths').findOne(ObjectID(id));
      console.log('/api/auth/update/role');
      if (!user) {
        return res.status(400).json({
          errors: {
            msg: 'User not found',
          },
        });
      }

      // Set User roles equal to newly recieved array
      user.role = role;

      // Save newly created user
      await user.save();
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      console.log(payload);
      res.json({ payload });
    } catch (error) {
      res.json({ error });
    }
  });

  /**
   * @method PUT
   * @route /api/auth/update/:id/:email
   * @description UPDATES USERS EMAIL
   */
  router.put(
    '/api/auth/update/email',
    [check('email').exists().isEmail()],
    async (req, res) => {
      const { id, email } = req.body;

      try {
        // Find if email already exists for ANOTHER user id
        let otherUser = await Auth.where('email')
          .equals(email)
          .where('_id')
          .ne(id);

        if (otherUser.length !== 0) {
          res.status(400).json({
            field_type: 'EMAIL',
            error: 'Email already assigned to another user',
          });
        } else {
          let doc = await Auth.findOneAndUpdate(
            { _id: id },
            { email: email },
            { new: true }
          );
          res.json({ updatedUser: doc });
        }
      } catch (error) {
        res.status(400).json({
          field_type: 'EMAIL',
          msg: 'Email Update Failed',
        });
      }
    }
  );

  //TODO: Needs to accept complete new set of permissions aka
  //      the array of permissions should be updated before it gets here
  /**
   * @method PUT
   * @route /api/auth/update/:id/:permissions
   * @description UPDATES USERS PERMISSIONS
   */
  router.put('/api/auth/update/permissions', async (req, res) => {
    const { id, permissions } = req.body;
    try {
      let doc = await Auth.findOneAndUpdate(
        { _id: id },
        { permissions: permissions },
        { new: true }
      );
      res.json({ updatedUser: doc });
    } catch (error) {
      res.status(400).json({
        error: 'Permissions Update Failed',
      });
    }
  });

  /**
   * @method PUT
   * @route /api/auth/update/password
   * @description UPDATES USERS PASSWORD
   */
  router.put('/api/auth/update/password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
      let user = await Auth.findOne({
        email: email,
      });

      if (!user) {
        return res.status(400).json({
          errors: {
            msg: 'User Not Found',
          },
        });
      }

      // Hash New Password
      user.password = await bcrypt.hash(
        newPassword,
        await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
      );

      // Save User with new password
      await user.save();
      const payload = {
        user: {
          id: user.id,
          password: user.password,
        },
      };

      res.json({ payload, success: 'true' });
    } catch (error) {
      res.json({ error });
    }
  });

  /**
   * @method POST
   * @route /api/users/deactivate
   * @description DEACTIVATES USERS ACCOUNT
   */
  router.post('/api/auth/deactivate', (req, res) => {
    deactivateUser(req, res);
  });

  /**
   * @method DELETE
   * @route /api/users/remove
   * @description REMOVES ACCOUNT FROM DB
   */
  router.delete('/api/auth/removeuser/:id', (req, res) => {
    removeUser(req, res);
  });
};
