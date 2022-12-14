const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const imagesRouter = require('./images.js');
router.post('/test', function (req, res, next) {
    res.json({ requestBody: req.body });
});

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user });
});

const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);

const { requireAuth } = require('../../utils/auth.js');
router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);
router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

router.use('/images', imagesRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;

/*
fetch('/api/test', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": "KnsCGYVh-vWZLd-mhOedyHYq2INrwMqEVpVU"
    },
    body: JSON.stringify({ hello: 'world' })
}).then(res => res.json()).then(data => console.log(data));
*/