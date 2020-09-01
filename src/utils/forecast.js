const request =  require('request')

const forecast = (longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=221c4c25094e08ac0655c59f37a4e69d&query='+ latitude +','+longitude

    request({url, json: true},(error, {body})=>{
        if(error){

            callback('unable to connect to location servies', undefined)
        }
        else if(body.error){
            callback('unable to find location. try another seach', undefined)
        }else{

        callback(undefined, body.current.weather_descriptions[0]+
            body.current.temperature+
        body.current.feelslike)            
        }

    })

}


 module.exports = forecast