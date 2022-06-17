const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require("./utils/geoCode.js")
const forecast = require("./utils/forecast.js")

const app = express()

// we need to provide absolute address of the file, thus __dirname and path come handy
//define paths for express config(both static and dynamic.)
const filePath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(filePath))
hbs.registerPartials(partialsPath)

app.get("/", (req,res) => {
    res.render("index", {
        title: "Weather-app",
        name : "Priyansh Mehta"
    })
})

app.get("/about", (req,res) => {
    res.render("about", {
        title: "About Me",
        name: "Priyansh Mehta"
    })
})

app.get("/help", (req,res) => {
    res.render("help", {
        title: "Help",
        mssg: "In case you need help, please contact us.",
        name: "Priyansh Mehta"
    })
})

app.get("/weather", (req,res) => {
    if(!req.query.address)
        return res.send({Error: "Please send location."})
    const location = req.query.address
    geocode(location, (error,{latitude,longitude,place}={})=>{
        if(error)
            return res.send({error});
        else{
            forecast(latitude, longitude, (error, data) => {
                if(error)
                    return res.send({error})
                else{
                    res.send({
                        Data: data,
                        Location: place
                    })
                }
            })
        }
            
    })
})

app.get("*", (req,res) => {
    res.render("404-Error", {
        title: "404 Error",
        name: "Priyansh Mehta"
    })
})


app.listen(3000, () => {
    console.log("Server is up on port 3000.");
})