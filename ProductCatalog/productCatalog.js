window.api.searchAllProducts().then(function(value){
    updateTable("allTable", value)
})

document.getElementById("inputButton").addEventListener('click', function(){
    processSearch(document.getElementById("input").value)
})

function createTableHeader(tableId){
    var table = document.getElementById(tableId)
    var tr = document.createElement("tr")
    var th1 = document.createElement("th")
    var th2 = document.createElement("th")
    var th3 = document.createElement("th")
    var th4 = document.createElement("th")
    th1.appendChild(document.createTextNode("Product Id"))
    th2.appendChild(document.createTextNode("Type"))
    th3.appendChild(document.createTextNode("Price"))
    th4.appendChild(document.createTextNode("Examine"))
    tr.appendChild(th1)
    tr.appendChild(th2)
    tr.appendChild(th3)
    tr.appendChild(th4)
    table.appendChild(tr)
}

function updateTable(tableId, products){
    var tableBody = document.getElementById(tableId)
    while(tableBody.hasChildNodes()){
        tableBody.removeChild(tableBody.firstChild)
    }
    createTableHeader(tableId)
    for(i = 0; i < products.length; i++){
        var tr = document.createElement('tr')
        var td1 = document.createElement('td')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')
        var td4 = document.createElement('button')
        td4.addEventListener('click', function(){
            processSearch(this.parentNode.firstChild.innerHTML)
        })
        td1.appendChild(document.createTextNode(products[i].id))
        td2.appendChild(document.createTextNode(products[i].type))
        td3.appendChild(document.createTextNode(products[i].price))
        td4.appendChild(document.createTextNode("Examine"))
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tableBody.appendChild(tr)
    }
}

function updateExaminedText(product){
    var outputString = "Product Id: " + product.id;
    outputString += "<br> Price: " + product.price;
    outputString += "<br> Type: " + product.type;
    document.getElementById("productText").innerHTML = outputString;
}

function getIntersection(arrA, arrB, searchedId){
    var samePrice = arrA
    var sameType = arrB
    var similarArray = []
    samePrice.forEach(function(obj1){
        sameType.forEach(function(obj2){
            if(obj1.id == obj2.id && obj1.id != searchedId)
                similarArray.push(obj1)
        })
    });
    return similarArray
}

function processSearch(searchedId){
    window.api.searchProductById(searchedId).then(function(val){
        return Promise.all([window.api.searchProductsByPrice(val.price, 50), window.api.searchProductsByType(val.type), val])
    }).then(function(val){
        var similarArray = getIntersection(val[0], val[1], val[2].id)
        updateExaminedText(val[2])
        updateTable("similarTable", similarArray)
    }).catch(function(val){
        console.log(val)
    })
}