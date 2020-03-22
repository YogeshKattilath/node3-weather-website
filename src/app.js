const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
// console.log(__dirname);
// console.log(path.join(__dirname,'../puliic'));
// console.log(__filename);
const app = express()
const public_path = path.join(__dirname,'../public')
const view_path = path.join(__dirname,'../templates/views')
const partials_path = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',view_path)
hbs.registerPartials(partials_path)

//setup static directory to serve
app.use(express.static(public_path))

app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Yogesh Kattilath'
    })
});

app.get('/help',(req,res)=>{
    res.send('Help page')
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name: 'Yogesh Kattilath'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide the address!'
        });    
    }

    geocode(req.query.address, (error, { latitude, longitude, location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude,(error,forecast_data) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecast_data,
                location,
                address: req.query.address
            })
        })
    })
        


    // res.send({
    //     forecast: 'it is corona vid 19',
    //     location: 'Mumbai',
    //     address: req.query.address
    // });
});

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        name: 'Yogesh Kattilath'
    })
});

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})