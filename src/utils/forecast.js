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

        callback(undefined, ' Current overcast is '+ body.current.weather_descriptions[0] + ' It is currently '+
            body.current.temperature + ' degrees out. But it feels like ' +
        body.current.feelslike + ' degrees. The humidity is ' +body.current.humidity )            
        }

    })

}


 module.exports = forecast