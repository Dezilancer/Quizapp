let questions = {
}


database = firebase.database().ref("Questions")

let options = [];


let optionsDiv = document.getElementById("optionsDiv")
let question = document.getElementById("question")
let answerSelect = document.getElementById("answerSelect")
let addBtn = document.getElementById("addBtn")
let optionsSpan = document.getElementById("optionsSpan")
optionCount = 1

function addOpt() {
    if (optionCount === 4) {
        addBtn.disabled = true
    }
    else {
        let div = document.createElement("div")
        let insideDiv = document.createElement("div")
        let label = document.createElement("label")
        insideDiv.setAttribute("class", "d-flex justify-content-between align-items-center")
        let p = document.createElement("p")
        let pTextNode = document.createTextNode("Edit")
        insideDiv.appendChild(p)
        p.appendChild(pTextNode)
        p.setAttribute("class", "me-4 editBtn")
        p.setAttribute("onclick", "editOpt(this)")
        let editbtn = document.createElement("button")
        labelTxt = "Option " + (optionCount + 1)
        let labelTxtNode = document.createTextNode(labelTxt)
        label.appendChild(labelTxtNode)
        label.setAttribute("for", "Op0" + (optionCount + 1))
        div.appendChild(label)
        div.appendChild(insideDiv)
        let input = document.createElement("input")
        input.setAttribute("type", "text")
        input.setAttribute("class", "w-75 d-block mt-2 mb-4 py-2 px-3")
        input.setAttribute("onblur", "toSelectList(this)")
        input.setAttribute("id", "Op0" + (optionCount + 1))
        insideDiv.appendChild(input)
        insideDiv.appendChild(p)
        optionsDiv.appendChild(div)
        optionCount++
    }


}

function forEdit(e){
document.getElementById("optId" + (e.id.slice(-1))).remove()

e.setAttribute("onblur", "toSelectList(this)")



}


function toSelectList(e) {
        let option = document.createElement("option")
        option.setAttribute("id", ("optId" + e.id.slice(-1)))
        let optKeys = e.value
        let optsTxtNode = document.createTextNode(optKeys)
        option.setAttribute("value", optKeys)
        option.appendChild(optsTxtNode)
        answerSelect.appendChild(option)
        

    let c = parseInt(e.id.slice(-1))
    options.splice((c - 1), 1, e.value);

    e.disabled = true
}




function checkval() {
}


function saveQuestion() {
    questions.question = question.value
    questions.options = options
    questions.answer = answerSelect.value
    questions.key = database.push().key
    

    database.push(questions)



    window.location.href = window.location.href

  
}

function editOpt(e) {

    e.previousSibling.disabled = false

    e.previousSibling.setAttribute("onfocus", "forEdit(this)")


}