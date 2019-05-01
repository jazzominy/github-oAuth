import express from 'express';
import request from 'request';

const port = 9000;
const AUTHORIZE_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENTID}&redirect_uri=http://localhost:9000&scope=user:email,read:user&state=QaWsEdRfTg&allow_signup=false`;
const TOKEN_URL = `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENTID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&state=QaWsEdRfTg&code=`;

const app = express();
app.use(express.static(__dirname));

app.get('/github-login', (req, res) => {
  res.redirect(AUTHORIZE_URL);
});

app.get('/github-code', (req, res) => {
  const params = req.query;
  const url = TOKEN_URL + params.code;

  request.post(url,{
      headers: {
        'Accept': 'application/json'
      }
    },(err, resp, body) => {

      if (err) {
        console.log('Error occurred when getting token', err);
      }

      res.status(200).send(body);
  })
});

app.listen(port, function(err) {
	if(err) {
    console.log(err);
    return;
	}
	
	console.log(`Server running at http://localhost:${port}`);
});