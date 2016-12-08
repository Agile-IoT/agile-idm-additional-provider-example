var passport = require('passport');
var express = require('express');

function RouterPassport(router) {

  //My Demo route
  router.route('/my-demo').get(function (req, res) {
    var options = [{
      "name": "username",
      "type": "text",
      "label": "company_name"
    }, {
      "name": "password",
      "type": "password",
      "label": "password"
    }];
    res.render('local', {
      auth_type: 'my-demo',
      fields: options
    });
  });
  router.route('/my-demo').post(
    passport.authenticate('my-demo' , {
      successReturnToOrRedirect: '/',
      failureRedirect: '/login'
    })
  );
  return router;
}
module.exports = RouterPassport;
