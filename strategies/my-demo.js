var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var dateUtils = require('../../util/date');
var tokens = require('../../util/tokens');
var console = require('../../log');
var createError = require('http-errors');

// we need to execute this in the scripts folder of IDM to create the user expected by this strategy
// node createUser.js --username=alice   --auth=my-demo
function loadStrategy(conf, entityStorageConf) {
  var db = require('../../db')(conf, entityStorageConf);
  var auth_type = "my-demo";
  var enabled = conf.enabledStrategies.filter(function (v) {
    return (v === auth_type);
  });
  if (enabled.length === 0) {
    console.log('ignoring ' + auth_type + ' strategy for user authentication. Not enabled in the configuration');
    return false;
  } else {
    try {

      passport.use(auth_type, new LocalStrategy(
        function (username, password, done) {
          var default_exp = null;
          console.log("body"+username+"p"+password);

          db.users.findByUsernameAndAuthType(username, auth_type, function (err, user) {
            //error cases
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false);
            }
            //at this point we know there is a user with this authentication type and username in the database
            //if it doesn't fit our requirements (i.e. simple check for company_name and password...) we reject the request.
            //although the password could also be stored in the database of entities and checked against user.password, we make the check more explicit here.
            if ( username !== "alice" &&  password !== "secret") {
              return done(null, false);
            }
            //generate the token randomly
            var token = tokens.uid(30);
            db.accessTokens.save(token, user.id, null, "bearer", [conf.gateway_id], default_exp, null, function (err) {
              if (err) {
                return done(err);
              }
              //return the user back to the serializer to keep going
              return done(null, user);
            });
          });
        }
      ));
      console.log('finished registering passport ' + auth_type + ' strategy');
      return true;

    } catch (e) {
      console.log('FAIL TO register a strategy');
      console.log('ERROR: error loading ' + auth_type + ' passport strategy: ' + e);
      return false;
    }
  }
}
module.exports = loadStrategy;
