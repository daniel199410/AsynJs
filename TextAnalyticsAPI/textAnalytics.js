document.getElementById("analyseButton").addEventListener('click', analyse)

function analyse(){    
    var reqBody = {
        "url": document.getElementById("input").value
    }
    var image = document.getElementById("sourceImage")
    image.setAttribute('src',reqBody.url);
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
    };
    var myHeader = new Headers({
        'Content-type': 'application/json',
        'Ocp-Apim-Subscription-Key':'54efc270c26841b18158e5147c3cdbf3'
    })
    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }
    var request = new Request('https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender,emotion', initObject);
    fetch(request).then(function(response){
        if(response.ok)
            return response.json()
        else
            return Promise.reject(new Error(response.statusText))
    }).then(function(response){
        createItem("Género:", translateGender(getGender(response)))
        createItem("Edad:", Math.round(getAge(response)))
        createEmotionsList(response)
    }).catch(function(err){
        alert(err)
    })
}

function getGender(response){
    return response[0].faceAttributes.gender
}

function translateGender(gender){
    if(gender == 'female')
        return 'Femenino'
    else
        return 'Masculino'
}

function getAge(response){
    return response[0].faceAttributes.age
}

function createItem(itemName, value){
    var itemsSection = document.getElementById("emotions")
    var article = document.createElement("article")
    article.classList.add("emotion")
    var itemParagraph = document.createElement("p")
    var valueParagraph = document.createElement("p")
    itemParagraph.classList.add("pr-8")
    itemParagraph.innerHTML = itemName
    valueParagraph.innerHTML = value
    article.appendChild(itemParagraph)
    article.appendChild(valueParagraph)
    itemsSection.appendChild(article)
}

function createEmotionsList(response){
    var emotions = response[0].faceAttributes.emotion
    createItem("Rabia:", emotions.anger)
    createItem("Desprecio:", emotions.contempt)
    createItem("Disgusto:", emotions.disgust)
    createItem("Miedo:", emotions.fear)
    createItem("Felicidad:", emotions.happiness)
    createItem("Neutral:", emotions.neutral)
    createItem("Tisteza:", emotions.sadness)
    createItem("Sorpresa:", emotions.surprise)
}