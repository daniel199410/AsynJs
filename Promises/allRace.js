function delayedResolve(time){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve(`Promesa resuelta en ${time}`)
        }, time)
    })
}

function delayedReject(time){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            reject("Promesa rechazada en: " + time)
        }, time)
    })
}

var promise1 = delayedResolve(500)
var promise2 = delayedReject(400)
var promise3 = delayedResolve(600)

Promise.race([promise1, promise2, promise3]).then(function(val){
    console.log(val)
}).catch(function(val){
    console.log(val) //Resuelve solo el reject ya que es la que ocurre mas rápido
})

Promise.all([promise1, promise2, promise3]).then(function(val){
    console.log(val) //Si ninguna se rechaza, retorna un array con los resultados de todas las promesas
}).catch(function(val){
    console.log(val) //Retorna la primera promesa rechazada
})