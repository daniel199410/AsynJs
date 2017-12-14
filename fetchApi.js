var URL = "https://jsonplaceholder.typicode.com/todos/1"
fetch(URL).then(function(response){
    if(response.ok)
        return response.json()
    else
        return Promise.reject(response.status)
}).then(function(result){
    console.log(result)
}).catch(function(err){
    console.log(`Error ${err}`)
})