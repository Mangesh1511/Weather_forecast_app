const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const request = require('requests');
const app = express()
require("dotenv").config()
// const API_KEY =process.env.API_KEY;

app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    console.log(req.body.city);
    res.render('index', { weather: null, errmsg: '' });
})

app.post('/', function (req, res) {

    let city = req.body.city;
    console.log(city);
    console.log(process.env.API_KEY);
    console.log(req.method);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`

    axios.get(url)
        .then((response) => {
            const obj = response.data;
           

            var data1 = JSON.parse(JSON.stringify(obj));
            console.log(data1.weather[0].main);
            descr="Feels like: "+data1.weather[0].description;
            var hum="Humidity: "+obj.main.humidity+"% "
            var temp_min_max = "Min: " + obj.main.temp_min + " | Max: " + obj.main.temp_max;
            res.render('index', { weather: obj, sit:descr, humidity: hum, city: obj.name, country: obj.sys.country, icon: obj.weather.icon, temp:"Temp:"+obj.main.temp, tempminmax: temp_min_max, errmsg:null });
        })
        .catch((err) => {
            console.log(err);
            res.render('index', { weather: null, errmsg: 'City not Found' })
        })

})

app.listen(5000, () => {
    
    console.log("Server is Listening at Port 5000");
})