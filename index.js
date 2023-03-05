const express = require('express');
const https = require('https');
const sw = process.env['sw'];
const path = process.env['path'];
const app = express();

app.get('/temp', (req, res) => {
  const options = {
    hostname: 'api.switch-bot.com',
    path: path,
    headers: {
      'Authorization': sw
    }
  };

  https.get(options, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      const result = JSON.parse(data);
      const hum = result.body.humidity;
      const temp = result.body.temperature;
      const output = `humidity: ${hum}% | tempature: ${temp}℃`;
      res.send(output);
    });
  }).on('error', (error) => {
    console.error(error);
    res.status(500).send('An error occurred');
  });
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

