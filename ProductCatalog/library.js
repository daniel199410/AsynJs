(function(window){
    var catalog = createRandomCatalog(100)
    
    function createRandomProduct(){ 
        var typeArray = ['Electronics', 'Book', 'Clothing', 'Food']     
        var price = (Math.random() * 500).toFixed(2)
        var type = typeArray[Math.floor(Math.random() * 4)]
        return {price: price, type: type}
    }

    function createRandomCatalog(num){
        var catalog = []
        for(var i = 0; i < num; i++){
            var obj = createRandomProduct()
            catalog.push({id: i, price: obj.price, type: obj.type})
        }
        return catalog
    }

    function searchAllProducts(){
        var promise = new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve(catalog)
            }, 1000)
        })
        return promise
    }

    function searchProductById(id){
        var promise = new Promise(function(resolve, reject){
            var i = 0
            setTimeout(function(){
                while(i < catalog.length){
                    if(catalog[i].id == id)
                        resolve({id: id, price: catalog[i].price, type: catalog[i].type})
                    i++
                }
                reject(`Invalid ID: ${id}`)
            }, 1000)
        })
        return promise
    }

    function searchProductsByType(type){
        var promise = new Promise(function(resolve, reject){
            var i = 0
            var productsSameType = []
            var typeArray = ['Electronics', 'Book', 'Clothing', 'Food']
            if(!typeArray.includes(type))
                reject(`type ${type} not found`)
            setTimeout(function(){
                while(i < catalog.length){
                    if(catalog[i].type == type)
                        productsSameType.push({id: catalog[i].id, price: catalog[i].price, type: catalog[i].type})
                    i++
                }
                resolve(productsSameType)
            }, 1000)
        })
        return promise
    }

    function searchProductsByPrice(price, difference){
        var promise = new Promise(function(resolve, reject){
            var i = 0
            var productsSamePrice = []
            if(!isFinite(price))
                reject(`${price} is not a valid price`)
            setTimeout(function(){
                while(i < catalog.length){
                    if (Math.abs(catalog[i].price - price) < difference)
                        productsSamePrice.push({id: i, price: catalog[i].price, type: catalog[i].type})
                    i++
                }
                console.log(productsSamePrice)
                resolve(productsSamePrice)
            }, 1000)
        })
        return promise
    }

    function myLibrary(){
        return {
            searchProductById: searchProductById,
            searchProductsByPrice: searchProductsByPrice,
            searchProductsByType: searchProductsByType,
            searchAllProducts: searchAllProducts
        }
    }
    if(typeof(window.api === 'undefined'))
        window.api = myLibrary()
})(window)