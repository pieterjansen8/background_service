async function upload_file(){
    const btn = document.getElementById("art").style = "display:none;"
    const new_aria = document.createElement("article")
    new_aria.innerHTML = "<button  type='submit'class='secondary' aria-busy='true'> upload file</button>"
    const cont = document.getElementsByClassName("container")[0]
    cont.append(new_aria)

    const file = document.getElementById("file").files[0]
    const reader = new FileReader()
    reader.onload = async function(){
        const file = document.getElementById("file").files[0]
        const author = document.getElementById("author").value;
        const back = reader.result
        const body = JSON.stringify({
            "author": author,
            "file": back
        })
        const num = await fetch("https://pieterapi-data-default-rtdb.europe-west1.firebasedatabase.app/backgrounds/num.json")
        const json_num = await num.json()
        const to_post = json_num+1
        const file_name = file.name
        const f = await fetch("https://pieterapi-data-default-rtdb.europe-west1.firebasedatabase.app/"+author+"/"+file_name.replaceAll(".", "")+".json",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "put",
            body: body
        })
        const f_2 = await fetch("https://pieterapi-data-default-rtdb.europe-west1.firebasedatabase.app/"+json_num+".json",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "put",
            body: body
        })
        const f_3 = await fetch("https://pieterapi-data-default-rtdb.europe-west1.firebasedatabase.app/backgrounds.json",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "put",
            body: JSON.stringify({
                "num": to_post
            })
        })
        window.location.replace("/")
    }
    reader.readAsDataURL(file)
}