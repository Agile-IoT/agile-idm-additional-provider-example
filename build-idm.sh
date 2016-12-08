git clone https://github.com/Agile-IoT/agile-idm-web-ui
cd agile-idm-web-ui
git checkout 9bb7b2e83eae4592b96e87c29872b94ca257952b
cp ../routes/my-demo.js  ./routes/providers/
cp ../strategies/my-demo.js ./lib/auth/providers/
cp ../agile-ui-conf.js  ./conf/
npm install 
cd scripts
#create alice: our 'company' in the authentication mechanism we defined
node createUser.js --username=alice   --auth=my-demo
#create bob using agile-local, and register the client as it belonged to him. The clent could also belong to alice...
node createUser.js --username=bob --password=secret   --auth=agile-local
node createClient.js --client=MyAgileClient2 --name="My first example as IDM client" --secret="Ultrasecretstuff" --owner=bob --auth_type=agile-local --uri=http://localhost:3002/auth/example/callback
cd ../
node app.js
