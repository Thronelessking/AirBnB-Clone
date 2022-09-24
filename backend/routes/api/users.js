const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Spot, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const router = express.Router();

router.get('/:userId', requireAuth, async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    include: { model: Review },
    include: { model: Spot },
    include: { model: Booking }
  })
  res.json(user)
});

//Log In
// router.post('/session');

//Sign Up a User
router.post('/',
  validateSignup,
  async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;
    const user = await User.signup({ firstName, lastName, email, username, password });

    await setTokenCookie(res, user);
    console.log(await setTokenCookie(res, user))
    return res.json({
      user
    });
  }
);

// Sign up
// router.post(
//   '/',
//   validateSignup,
//   async (req, res) => {
//     const { email, password, username } = req.body;
//     const user = await User.signup({ email, username, password });

//     await setTokenCookie(res, user);

//     return res.json({
//       user
//     });
//   }
// );



module.exports = router;

/*
fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": "N9sg8KYl-HkSkXY8_WUZsEcKtPs_fxHA95tM"
  },
  body: JSON.stringify({
    email: 'spidey@spider.man',
    username: 'Spidey',
    password: 'password'
  })
}).then(res => res.json()).then(data => console.log(data));
*/