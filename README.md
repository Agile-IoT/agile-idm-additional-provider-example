# Adding Another Identity Provider to AGILE IDM

This repository contains the necessary files (2 files), and the required instructions to extend an installation of agile-idm-web-ui 
to support an additional (dummy) identity provider. 

The dummy provider uses a local passport strategy. This strategy allows the provider to obtain username and password from the agile ui. 
The strategy allows only users registered with agile which have username "alice" and password "secret". This strategy must not be used 
in production, but it comprises a minimalistic example to integrate a new strategy with AGILE IDM.

## Installation

To install the new strategy just execute the following commands in a terminal to checkout agile-idm-web-ui v 1.0.1:
```
git clone https://github.com/Agile-IoT/agile-idm-web-ui
cd agile-idm-web-ui
git checkout v1.0.1
```

Then copy the strategy and the routes to agile-idm-web-ui and install it (still from the agile-idm-web-ui directory):
```
cp ../routes/my-demo.js  ./routes/providers/
cp ../strategies/my-demo.js ./lib/auth/providers/
cp ../agile-ui-conf.js  ./conf/
npm install 
```

Then set-up an admin user, for example using the agile-local strategy. Also create a client (to execute the oauth2 example available here:https://github.com/Agile-IoT/agile-idm-oauth2-client-example):

```
cd scripts
node createUser.js --username=bob --password=secret   --auth=agile-local
node createClient.js --client=MyAgileClient2 --name="My first example as IDM client" --secret="Ultrasecretstuff" --owner=bob --auth_type=agile-local --uri=http://localhost:3002/auth/example/callback
```

Now create the user expected by this strategy:
```
node createUser.js --username=alice   --auth=my-demo
```
Note that the client has a new authentication type called *my_demo*. This matches the authentication type that is registered in this example.

Then, execute IDM:

```
cd ../
node app.js
```

Then clone, install and start the demo app according to the agile-idm-oauth2-example readme.

If you want to set-up IDM in just one step,  execute the "build-idm.sh" script, which will set-up idm and start it. 





