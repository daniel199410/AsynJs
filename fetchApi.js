var URL = "https://jsonplaceholder.typicode.com/todos/1"

var body = {
    id: 12345,
    name: 'abc',
    age: 21
}

var myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')

var initObject = {
    method: "GET",
    headers: myHeaders,
    mode: 'cors',
    body: JSON.stringify(body)
}

var request = new Request(URL, initObject)

fetch(request).then(function(response){
    if(response.ok)
        return response.json()
    else
        return Promise.reject(response.status)
}).then(function(result){
    console.log(result)
}).catch(function(err){
    console.log(`Error ${err}`)
})