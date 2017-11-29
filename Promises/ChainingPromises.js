function getRandomNumber(){
    var promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            var val = Math.random()
            resolve(val)
        }, 5000)
    })
    return promise
}

function getNameFromNumber(number){
    var promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            var name = "Name"
            resolve(name)
        })
    })
    return promise
}

function getAgeFromName(number){
    var promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            var age = Math.random() * 50
            resolve(age)
        })
    })
    return promise
}

getRandomNumber().then(function(result){
    console.log(result)
    return getNameFromNumber(result)
}).then(function(result2){
    console.log(result2)
    return getAgeFromName(result2)
}).then(function(result3){
    console.log(result3)
}).catch(function(error){
    console.log(error)
})