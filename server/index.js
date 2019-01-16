const express = require('express');
const request = require('request');
const app = express();
const port = 3001;
const apiKey = 't1s1GeJilKf8t0gKF3gHWzk4qKGi6PCz';

// respond with "hello world" when a GET request is made to the homepage
app.get('/api/popular', function(req, res) {
    const period = req.query.period || 1;
    const uri = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=${apiKey}`;
    request(uri, (error, response, body) => {
        const resBody = JSON.parse(body);
        res.send({
            status: 200,
            data: {
                numResults: resBody.num_results,
                results: resBody.results
            }
        });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
