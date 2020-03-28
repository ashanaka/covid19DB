const express = require('express');
const path = require('path');
const request = require('request');


let app = express();


app.listen(process.env.PORT, process.env.IP);
// app.listen(3000, () => {
//     console.log('Express server started using port : 3000');
// });

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
                local_new_cases: parsedData["data"]["local_new_cases"],
                local_active_cases: parsedData["data"]["local_active_cases"],
                local_total_cases: parsedData["data"]["local_total_cases"],
                local_deaths: parsedData["data"]["local_deaths"],
                local_recovered: parsedData["data"]["local_recovered"],
                local_total_number_of_individuals_in_hospitals: parsedData["data"]["local_total_number_of_individuals_in_hospitals"],
                global_total_cases: parsedData["data"]["global_total_cases"],
                global_deaths: parsedData["data"]["global_deaths"],
                update_date_time: parsedData["data"]["update_date_time"],
            });
        }else{
            console.log("Something went wrong!");
            console.log(error);
        }
    });

    
});