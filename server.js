const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/stocks-dashboard'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/stocks-dashboard/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080 , (err) => {
    if(err){
        console.log("Error occurred");
        throw err;
    } 
    console.log("Server started successfully");
});