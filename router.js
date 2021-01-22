

const router = require('express').Router();
const passport = require('passport');
const { isEqual } = require('lodash')
const csvStringify = require('csv-stringify');
const { Interest } = require('./models/model');
const { userIsLoggedIn } = require('./security/security');
const { DataResponse } = require('./config');


// ==================================================
// GET
// ==================================================

router.get('/interests', userIsLoggedIn, async (req, res) => {

    try {
        Interest.findAll().then(results => {
            res.send( new DataResponse(
                success=true,
                data=results,
                message="Successfully retrieved interest data",
                error=null
            ))
        })
    } catch (e) {
        res.send(new DataResponse(error=e))
    }
})

router.get('/download/interests', userIsLoggedIn, async (req, res) => {

    try {
        Interest.findAll().then(results => {

            let jsonData =  JSON.parse(JSON.stringify(results));

            csvStringify( 
                Object.values(jsonData), 
                { header: true, columns: [`id`, `interest_id`, `title`, `value`, `createdAt`, `updatedAt`]},
                (err, data) => {

                if (err) {
                    res.status(500);
                    return;
                }

                res.setHeader('Content-Type', 'text/csv');
                res.attachment('interests.csv')
                res.status(200).send(data);
                return;

            });
        })
    } catch (e) {
        res.status(500);
        return;
    }
})

router.get('/logout', async (req, res, next) => {
    req.session.destroy();
});

router.get('/', (req, res) => res.sendFile(`${__dirname}/dist/index.html`));




// ==================================================
// POST
// ==================================================

router.post('/login', async (req, res, next) => {

    passport.authenticate('local', (err, user) => {

        const errorResponse = new DataResponse(
            success=false,
            data=null,
            message="Invalid username or password",
            error="Invalid username or password",
        );

        if (err || !user) return res.send(errorResponse);

        req.logIn(user, (err) => {
            if (err) return res.send(errorResponse);

            return res.send( new DataResponse(
                success=true,
                data=null,
                message="Successfully logged in",
                error=null
            ));
        });

    })(req, res, next);

});

router.post('/interests', async (req, res) => {

    const errorResponse = new DataResponse(
        success=false,
        data=null,
        message="Invalid input",
        error="Invalid input"
    );

    try {
        
        if (!req.body) res.send(errorResponse)

        const inputIsValid = req.body.every(item => {
            return isEqual( Object.keys(item).sort(), ['id', 'text', 'interest'] );
        })

        if (!inputIsValid) res.send(errorResponse)

        let data = req.body.map(item => {
            return {
                id: item.id,
                interest_id: item.id,
                text: item.text,
                interest: item.interest,
            }
        })

        Interest.bulkCreate(data).then( () => {
            res.send( new DataResponse(
                success=true,
                data=null,
                message="Thank you",
                error=null
            ))
        })

    } catch (e) {
        res.send(errorResponse)
    }
})

module.exports = router, { DataResponse };