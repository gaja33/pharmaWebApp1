'use strict';

module.exports = function(app) {
  app.dataSources.postgres.autoupdate(function(err, result) {
    if (err) {
      console.log('err:' + err);
    } else {
      console.log('result1' + result);
    }
  });
};
