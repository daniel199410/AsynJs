function add(x, y){
    return x + y
}

function mult(x, y){
    return x * y
}

function calculte(x, y, f){
    return f(x, y)
}

var a = calculte(10, 5, add)
var b = calculate(10, 5, mult)

var c = calculate(10, 5, function(x, y){
    return x - y
})

console.log(a)
console.log(b)
console.log(c)