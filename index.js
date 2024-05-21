// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-59e65-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const EndorsmentInDB = ref(database, "endorsments")

const inputEndorsment = document.getElementById("endorsmentMsg")
const publishBtn = document.getElementById("publishBtn")
const endorsmentBoxInput = document.getElementById("endorsmentBox")
const usernameInput = document.getElementById("UserName")
const checkBox = document.getElementById("hiddenUser")

publishBtn.addEventListener("click", function() {
    
    if(checkBox.checked){
        usernameInput.value = "Anynomous"
    }
    
    if(usernameInput.value == "" && inputEndorsment.value == ""){
        alert("Please enter name & message!")
        
    } else if(usernameInput.value == "") {
        alert("Please enter name!")
        
    }else if(inputEndorsment.value == "") {
        alert("Please enter message!")
        
    } else{
        let endorsmentValue = inputEndorsment.value
        let usernameValue = usernameInput.key
        
        push(EndorsmentInDB, endorsmentValue)
        push(EndorsmentInDB, usernameValue)
        
        clearInputFieldEl()
    }
    
    
})

function clearEndorsmentList(){
    endorsmentBoxInput.innerHTML = ""
}
function clearInputFieldEl() {
    inputEndorsment.value = ""
    
}

onValue(EndorsmentInDB, function(snapshot){
    if(snapshot.exists()){
        let endorsmentArray = Object.entries(snapshot.val())
        clearEndorsmentList()
        
        for(let i = 0; i < endorsmentArray.length; i++){
            let currEndorsment = endorsmentArray[i]
            let currEndorsmentID = currEndorsment[0]
            let currEndorsmentValue = currEndorsment[1]
            
            appendEndorsment(currEndorsment)
        }
        
    } else {
        endorsmentBoxInput.innerHTML = "No current messages"
    }
    
})

function appendEndorsment(value){
    
    let endID = value[0]
    let endValue = value[1]
    
    let newEndorsment = document.createElement("li")
    
    newEndorsment.textContent = usernameInput.value + ":" + endValue
    
    newEndorsment.addEventListener("dblclick", function() {
        let exactLocationOfEndorsmentInDB = ref(database, `endorsments/${endID}`)
        
        remove(exactLocationOfEndorsmentInDB)
    })
    
    endorsmentBoxInput.append(newEndorsment)
      
    
}