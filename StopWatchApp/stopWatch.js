var stopped = true
var count = 0
var interval
var startButton = document.getElementById("start")
var resetButton = document.getElementById("reset")
var recordButton = document.getElementById("record")
var green = "#4CAF50"
var red = "#F44336"

setUp()

function deleteRecords(){
    location.reload()
}

function setUp(){
    startButton.addEventListener("click", function(){
        if(stopped)
            start()
        else
            stop()
    })
    resetButton.addEventListener("click", restart)
    recordButton.addEventListener("click", function(){
        var node = document.createElement("p")
        var textNode = document.createTextNode(count.toFixed(2))
        node.appendChild(textNode)
        document.getElementById("records").appendChild(node)
    })
    document.addEventListener("keydown", function(event){
        if(event.key == "s")
            startButton.click()
        if(event.key == "r")
            resetButton.click()
        if(event.key == "t")
            recordButton.click()
    })
}

function restart(){
    count = 0
    document.getElementById("timer").innerHTML = 0
    deleteRecords()
    stop()
}

function start(){
    stopped = false
    startButton.innerHTML = "Stop"
    startButton.style.backgroundColor = red
    interval = setInterval(function(){
        count += 0.05
        document.getElementById("timer").innerHTML = count.toFixed(2)
    }, 50)
}

function stop(){
    startButton.innerHTML = "Start"
    startButton.style.backgroundColor = green
    clearInterval(interval)
    stopped = true
}