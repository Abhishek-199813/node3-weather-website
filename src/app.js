const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//const { isAbsolute } = require('path')

const hbs = require('hbs')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// defines paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{

    res.render('index', {
    title: 'weather',
    name: 'Abhishek Dwivedi'})
})

app.get('/about', (req, res)=>{
    res.render('about', {

        title: 'about me',
        name:'Abhishek Dwivedi'
    })

})


app.get('/help', (req, res)=>{
    res.render('help',{
        helpText: 'how can i help you',
        title: 'help',
        name:'Abhishek Dwivedi'

    })
})

app.get('/weather', (req, res)=>{
    
    if(!req.query.address){
        return res.send(
            {
                error: 'you have to provide address'
            }
        )
    }
    

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error)
        {
         return res.send(error)
        }
          forecast(latitude, longitude, (error, forecastdata) => {
          if(error)
          {
            return res.send(error)
          }
            res.send({
                forcast: forecastdata,
                location:location,
                address: req.query.address
            })
      })
    })
})



app.get('/products', (req, res)=>{
    if(req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})


app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Abhishek',
        errorMessage: 'help article not found'
    })

})

app.get('*',(req, res) =>{
    res.render('404',{
        title: '404',
        name: 'Abhishek',
        errorMessage: 'page not found'
    })

})



app.listen(port, () => { 
    console.log('server is up for port ' +port)

})