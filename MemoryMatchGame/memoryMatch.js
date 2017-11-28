var clickedCells = []
var interval
var started = false
var time = 0
var ready = true
var numCompleted = 0
var blue = "#3F51B5"
var red = "#F44336"
var orange = "#FF9800"
var green = "#4CAF50"

setUp()

function completed(cell){
    numCompleted++
    cell.completed = true
    cell.style.backgroundColor = green
}

function hide(cell){
    cell.style.background = blue
    cell.innerHTML = ""
    cell.clicked = false
}

function randomAnswers(){
    var answers = [1, 1, 2, 2, 3, 3, 4, 4, 5];
    answers.sort(function(item){
        return 0.5 - Math.random()
    })
    return answers
}

function reveal(cell){
    cell.style.background = red
    cell.innerHTML = cell.value
    cell.clicked = true
}

function startTimer(){
    if(!started){
        interval = setInterval(function(){
            time++
            document.getElementById("timer").innerHTML = "Tiempo transcurrido: " + time
        }, 1000)
        started = true
    }
}

function setUp(){
    var grid = document.getElementsByTagName("td")
    var answers = randomAnswers()
    for(var i = 0; i < grid.length; i++){
        var cell = grid[i]
        cell.completed = false
        cell.clicked = false
        cell.value = answers[i]
        cell.addEventListener("mouseenter", function(){
            if(!this.completed && !this.clicked)
                this.style.background = orange
        })
        cell.addEventListener("mouseleave", function(){
            if(!this.completed && !this.clicked)
                this.style.background = blue
        })
        cell.addEventListener("click", function(){
            if(!ready)
                return
            startTimer()
            if(!this.clicked && !this.completed){
                clickedCells.push(this)
                reveal(this)
            }
            if(clickedCells.length == 2){           
                if(clickedCells[0].value == clickedCells[1].value){
                    completed(clickedCells[0])
                    completed(clickedCells[1])
                    clickedCells = []
                    if(numCompleted == 8){
                        clearInterval(interval)
                        alert("¡Ganaste en " + time + " segundos!")
                    }
                }else{
                    ready = false
                    document.getElementById("gridTable").style.border = "5px solid " + red
                    setTimeout(function(){
                        ready = true
                        document.getElementById("gridTable").style.border = "5px solid black"
                        hide(clickedCells[0])
                        hide(clickedCells[1])
                        clickedCells = []
                    }, 500)
                }
            }
        })     
    }
    document.addEventListener('keydown', function(event){
        if(event.key > 0 && event.key < 10 ){
            grid[event.key - 1].click();
        }    
    });
    document.getElementById("restart").addEventListener("click", function(){
        location.reload()
    })
}