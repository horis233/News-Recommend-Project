var jayson = require('jayson');

// create a client
var client = jayson.client.http({
  hostname: 'localhost',
  port: 4040
});

function add(a, b, callback) {
  client.request('add', [a, b], function(err, response) {
    if(err) throw err;
    console.log(response.result);
    callback(response.result);
  });
}
function getNewsSummariesForUser(user_id, page_num, callback) {
  client.request('getNewsSummariesForUser', [user_id, page_num], function(err, response) {
    if (err) throw err;
    console.log(response);
    callback(response.result);
  });
}

// Log a news click event for a user
function logNewsClickForUser(user_id, news_id) {
    client.request('logNewsClickForUser', [user_id, news_id], function(err, error, response) {
        if (err) throw err;
        console.log(response);
    });
}

// Search news
function searchNews(keyword, page_num, callback) {
    client.request(
        'searchNews', [keyword, page_num], (err,error, response) => {
            if (err) {
                throw err;
            }

            console.log('[+] Search results received:');
            console.log(response);
            callback(response);
        }
    );
}

module.exports = {
  add : add,
  getNewsSummariesForUser : getNewsSummariesForUser,
  logNewsClickForUser : logNewsClickForUser,
  searchNews : searchNews
}
