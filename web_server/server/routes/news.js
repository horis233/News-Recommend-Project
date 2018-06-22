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
/* GET News List. */
/* GET news list. */
// router.get('/userId/:userId/pageNum/:pageNum', check_auth, function(req, res) {
// 	// mind that all params are intepreted as strings
// 	// TODO: error handling for invalid parameters
//     rpc_client.getNewsSummariesForUser(req.params['userId'], req.params['pageNum'],
//         function(news_list) {
//             res.json(news_list);
//         },
//         function(err) {
//             res.status(500).json({
//                 success: false,
//                 error: "Web Server failed to fetch news"
//             });
//         }
//     );
// })

// router.get('/click-log/userId/:userId/newsDigest/:newsDigest', check_auth,
//     function(req, res) {
//         var userId = req.params.userId, digest = req.params.newsDigest;
//         logger.debug('click happened');
//         rpc_client.logNewsClickForUser(userId, digest,
//             function(result) {
//                 logger.debug(`user '${userId}' clicked news '${digest}' on the front'`);
//                 res.status(200).end();
//             },
//             function(err) {
//                 res.status(500).json({
//                     success: false,
//                     error: "Web Server failed deliver click log"
//                 });
//             }
//         );
// })


module.exports = router;
