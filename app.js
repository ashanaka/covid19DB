const express = require('express');



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
    res.render('/home');
});