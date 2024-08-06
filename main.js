async function  setup() {
    const f_1 = await fetch("https://pieterapi-data-default-rtdb.europe-west1.firebasedatabase.app/backgrounds/num.json")
    const j_1 = await f_1.json()
    var start_num = j_1 - 1 
    for(let i = 0; i < j_1 ; i++){
        const f = await fetch("https://pieterapi-data-default-rtdb.europe-west1.firebasedatabase.app/"+start_num+".json")
        const json = await f.json()
        const file = json.file 
        const article = document.createElement("article")
        const img = document.createElement("img")
        const h2 = document.createElement("h2")
        const text = document.createTextNode("Author: "+json.author)
        h2.append(text)
        const container = document.getElementsByClassName("container")[0]
        img.src = file
        article.append(img)
        article.append(h2)
        container.append(article)
        start_num -=1
    }
}
setup()