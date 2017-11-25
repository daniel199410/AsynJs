var count = 0
var p = document.getElementById("p")
document.getElementById("button").addEventListener("click", function(){
  count++
  p.innerHTML = count
})
document.getElementById("reset").onclick = function(){
  count = 0
  p.innerHTML = count
}
function decrease(){
  count--
  p.innerHTML = count
}
document.addEventListener('keypress', handleKeyPressed)
function handleKeyPressed(event){
  var keyPressed = event.key
  document.getElementById("key").innerHTML = "Key Pressed: " +  keyPressed;
}