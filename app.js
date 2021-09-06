let fName = document.getElementById("fName")
let lName = document.getElementById("lName")

let fullName = document.getElementById("fullName")

let setDelay = 250

database = firebase.database();

var ref = database.ref("Questions");
ref.on("value", gotData);

let queCount;
let questions =[]
function gotData(data) {
    var firebaseData = data.val();
    
    var keys = Object.keys(firebaseData);
    for (var i = 0; i < keys.length; i++) {
        var ques = keys[i];
        var quesArray = firebaseData[ques];
        questions.push(quesArray)
    }
    queCount = questions.length
}


let question = document.getElementById("question")
let options = document.getElementById("options")
let message = document.getElementById("message")
let totalQuestions = document.getElementById("totalQuestions")
let quizPage = document.getElementById("quizPage")
let questionNum = document.getElementById("questionNum")
let tQues = document.getElementById("tQues")
let quizInfoDiv = document.getElementById("quizInfoDiv")
let nextBtn = document.getElementById("nextBtn")
let scoreCard = document.getElementById("scoreCard")
let qTopic = document.getElementById("qTopic")
let numberOfCorrectAnswers = document.getElementById("numberOfCorrectAnswers")
let percentage1 = document.getElementById("percentage")
let grade1 = document.getElementById("grade")
let status1 = document.getElementById("status")
 
let file = document.getElementById("file")


setTimeout(() => {
    file.max = queCount
    tQues.innerHTML = queCount

}, 2000);




let status;

let start = 0
let score = 0

let grade;
let percentage;



function startQuiz() {
   setTimeout(() => {
    if (fName.value.length == 0 && lName.value.length == 0) {
        message.classList.remove("hidden")

    }
    else {

        file.value = 1
        firstPageMain.innerHTML = ""
        totalQuestions.innerHTML = questions.length
        quizPage.classList.remove("hidden")
        questionNum.innerHTML = 1

        question.innerHTML = `<h4 class="mb-4">Q${start+1}: ${questions[0].question}</h4>`


        for (i = 0; i < questions[start].options.length; i++) {

            options.innerHTML += `<label class=" labelquiz form-check-label d-block my-3 p-3 option-radios" for="q${start+1+"-op"+(i+1)}"><input class="me-2" type="radio" onclick="CheckAns(this)" value="${questions[start].options[i]}" name="q${start+1}" id="q${start+1+"-op"+(i+1)}">${questions[start].options[i]}</label>`
        }

    }
   }, setDelay);
}

let answer;

function CheckAns(e){
   setTimeout(() => {
    answer = e.value
    if(e.checked == true){
        e.classList.add("active")
    }

    nextBtn.disabled = false
   }, setDelay);
}


function finish(){
    setTimeout(() => {
        if(answer == questions[questions.length-1].answer){
            score++
        }
    
        quizPage.classList.add("hidden")
        scoreCard.classList.remove("hidden")
    
        fullName.innerHTML = fName.value + " " + lName.value
        qTopic.innerHTML = "General Knowledge"
        numberOfCorrectAnswers.innerHTML = score + "/" + questions.length 
    
        percentage = (100/questions.length*score).toFixed(2)
    
    
            if (percentage <= 100 && percentage >= 90) {
                    grade = "A+";
            }
            else if (percentage < 90 && percentage >= 80) {
                grade = "A";
            }
            else if (percentage < 80 && percentage >= 70) {
                grade = "B";
            }
            else if (percentage < 70 && percentage >= 60) {
                grade = "C";
            }
            else if (percentage < 60 && percentage >= 50) {
                grade = "D";
            }
            else {
                grade = "F";
        
        }
    
        if(percentage >=75){
            status = "Pass"
        }
        else{
            status = "Fail"
        }
    
        percentage1.innerHTML = percentage +"%"
        grade1.innerHTML = grade
        status1.innerHTML = status
        
    }, setDelay);

}


function next() {
    setTimeout(() => {
        
    if(answer == questions[start].answer){
        score++
    }

    question.innerHTML = ""
    options.innerHTML = ""

    start++

    file.value = start + 1
    questionNum.innerHTML = start + 1  
    question.innerHTML = `<h4 class="mb-4">Q${start+1}: ${questions[start].question}</h4>`
    for (n = 0; n < questions[start].options.length; n++) {

        options.innerHTML += `<label class="labelquiz form-check-label d-block my-3 p-3 option-radios" for="q${start+1+"-op"+(n+1)}"><input class="me-2" type="radio" onclick="CheckAns(this)" value="${questions[start].options[n]}" name="q${start+1}" id="q${start+1+"-op"+(n+1)}">${questions[start].options[n]}</label>` 
    }
    nextBtn.disabled = true

    if (start + 1 == queCount) {
        nextBtn.innerHTML = "Finish"

        nextBtn.removeAttribute("onclick", "next()")
        nextBtn.setAttribute("onclick", "finish()")
        
    }
        
    }, setDelay);
}

function closeBtn(){
    window.location.href = window.location.href
}
