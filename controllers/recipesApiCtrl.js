const requestLib = require('request');

const URL = process.env.API_URL;
const APP_ID = process.env.API_APP_ID;
const APP_KEY = process.env.API_KEY;

const index = function(req, res) {
    const search = req.query.q;
    const options = {
        url: URL + '?q=' + search + '&app_id=' + APP_ID + '&app_key=' + APP_KEY
    }

    requestLib(options, (err, response, body) => {
        console.log(err)
        console.log(body)

        if (err) {
            return res.json({ error: err })
        }
        const data = JSON.parse(body)
        res.json(data)
    });
};

module.exports = {
    index
}