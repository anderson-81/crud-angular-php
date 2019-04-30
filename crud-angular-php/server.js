/*
const express = require('express');
const path = require('path');
const app = express();
*/

const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
var path = require('path');

app.use(express.static(__dirname + '/dist/crud-angular-php'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/crud-angular-php/index.html'));
});

app.use('/334debcfbdc435a8be6114154ea397098f232757ae4acc3e061186a8b06d20140a32e8a5b03e4018589aa045d697abbe28f2646c7ff2515bf63c0da6b18f71a6', proxy({
  target: 'http://localhost:80/api/index.php',
  changeOrigin: true
}));

app.listen(3000, () => {
});

// app.listen(process.env.PORT || 8080);
