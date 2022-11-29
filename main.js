//variables
let edtNota = document.getElementById("edtNota")
let edtDate = document.getElementById("edtDate")
const btnAdd = document.getElementById("btnAdd")
const btnClear = document.getElementById("btnClear")
const bodyTask = document.getElementById("bodyTask")
const bntCheckbox = document.getElementById("bntCheckbox")

//fix min and max years
var today = new Date().toISOString().slice(0, 10)
document.getElementById("edtDate").setAttribute("min", today)
let n = 5 // value max years
var maxYear = new Date(new Date().setFullYear(new Date().getFullYear() + n)).toISOString().slice(0, 10)
document.getElementById("edtDate").setAttribute("max", maxYear)

num=localStorage.getItem("Num") //id (numerical order of the row)

console.log(num + " Inizio")

//function
function ClearList(){
    bodyTask.innerHTML=""
}

function AddToList(id, date, text){
    let increst=0
    let rowToAdd = []
    rowToAdd[increst] = document.createElement("tr") //create new row
    bodyTask.appendChild(rowToAdd[increst]) //append new row to the body

    let idToAdd = document.createElement("th") //order list
    idToAdd.innerHTML = id //id is the numerical order of the row
    rowToAdd[increst].appendChild(idToAdd) //append the id

    let dToAdd = document.createElement("td")  // creo elemento intestazione di riga (prima colonna)
    dToAdd.innerHTML = date
    rowToAdd[increst].appendChild(dToAdd)    // Inserisco elemento di colonna nella riga

    let hToAdd = document.createElement("td")
    hToAdd.innerHTML = text
    rowToAdd[increst].appendChild(hToAdd)


    let bToAdd = document.createElement("td")
    var checkbox = document.createElement('input')
    checkbox.type = "checkbox"
    checkbox.value = "value"
    checkbox.id = "bntCheckbox"
    checkbox.classList.add("checkbox")
    checkbox.classList.add("checkbox-error")
    bToAdd.appendChild(checkbox)
    rowToAdd[increst].appendChild(bToAdd)

    if(id % 2 == 0){
        rowToAdd[increst].classList.add("active")
    }
    
    increst++
}

//event
btnClear.onclick = function() {
    
    if(confirm("Warning: you are deleting the list!") == true){
        ClearList()
        localStorage.clear()
        num=1
    }
}

btnAdd.onclick = function() {

    if(num == null){
        num=1
        console.log(num + " Nullo")
    }

    if(edtDate.value == "" || edtNota.value == ""){
        alert("insert NOTE and DATE")
    }
    else{
        let date = edtDate.value
        let text = edtNota.value
        AddToList(num, date, text)
        num++
        edtDate.value = ""
        edtNota.value = ""
        edtNota.focus()
        localStorage.setItem("List", bodyTask.innerHTML)
        localStorage.setItem("Num", num)
        console.log(num + " Ok")
    }

    
}

//main
ClearList()
bodyTask.innerHTML = localStorage.getItem("List")
