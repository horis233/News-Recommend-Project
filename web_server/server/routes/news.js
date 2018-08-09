var express = require('express');
var router = express.Router();
var rpc_client = require('../rpc_client/rpc_client');
const check_auth = require('../middleware/auth_checker');


router.get('/userId/:userId/pageNum/:pageNum', function(req, res, next) {
  console.log("Fetching news...");
  user_id = req.params['userId'];
  page_num = req.params['pageNum'];

  rpc_client.getNewsSummariesForUser(user_id, page_num, function(response) {
    res.json(response);
  })
});

router.post('/userId/:userId/newsId/:newsId', function(req, res, next) {
  console.log("Logging news click...");
  user_id = req.params['userId'];
  news_id = req.params['newsId'];
  rpc_client.logNewsClickForUser(user_id, news_id);
  res.status(200);
});

router.post('/search', function(req,res) {
  console.log('Searching news...');
   let keyword = req.body['keyword'];
   let page_num = req.body['pageNum'];
   rpc_client.searchNews( keyword, page_num , function(response) {
   res.json(response);
  });
});


module.exports = router;
