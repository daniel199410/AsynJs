function run(){
    for(var i = 0; i < 10; i++){
        console.log(i)
    }
}

function runAsync(){
    for(var i = 0; i < 10; i++){
        var timeOut = setTimeout(function(){
            console.log("timeout" + i)
        }, 0)
        console.log(i)
    }
}

var count = 0
var interval = setInterval(function(){
    console.log(count)
    count++
    if(count > 10){
        clearInterval(interval)
    }
}, 1000)