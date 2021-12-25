var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
let fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', 
[
  check('name')
    .isLength({ min: 1 })
    .withMessage('请输入网址')
],
function(req, res, next) {
  const errors = validationResult(req);
  console.log(req.body);
  console.log(errors);


  let userInput = req.body;
  userInput.email = encodeURIComponent(userInput.name);

  let fetchOption = {};

  let payload = {
    "method": "sendMessage",
    "chat_id": "-1001747981291",
    "text": userInput.name,
  };

  fetchOption.method = "post";
  fetchOption.body = JSON.stringify(payload);
  fetchOption.headers = {};
  fetchOption.headers["Content-Type"] = 'application/json';

 // let url ="http://localhost:8888"
  url = "https://api.telegram.org/bot" + 
  "5013108439:AAFhDlMJMHeQTxG3NE8_yquV7CB2Mqas9o8" + "/";

  fetch(url, fetchOption);
  console.Console(fetchOption.body.toString)

  res.render('index', { title: 'Express', userInput: userInput, errors: errors.array(), validInput: errors.isEmpty()});
});
module.exports = router;
