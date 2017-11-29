var promise = new Promise(function(resolve, reject){
    setTimeout(function(){
        var val = Math.random()
        if(val > .5)
            resolve(val)
        else
            reject(val)
    }, 5000)
})

promise.then(function(val){
    console.log(`Success: ${val}`)
}).catch(function(val){
    console.log(`Error: ${val}`)
})

promise.then(function(val){
    console.log(`Success: ${val}`)    
}, function(val){
    console.log(`Error: ${val}`)
})