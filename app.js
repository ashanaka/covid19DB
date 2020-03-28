const express = require('express');
const path = require('path');
const request = require('request');


let app = express();


app.listen(3000, () => {
    console.log('Express server started using port : 3000');
});

//setting-up handle-bars
const exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');


app.get('/', function(req, res){

    let apiURL = "https://hpb.health.gov.lk/api/get-current-statistical";

    request(apiURL, function(error, response, body){
        if(!error && response.statusCode == 200){
            var parsedData = JSON.parse(body);
            res.render('home',{
                passedData: parsedData["data"]["local_total_cases"],
            });
        }else{
            console.log("Something went wrong!");
            console.log(error);
        }
    });

    
});