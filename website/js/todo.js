const list = document.getElementById("list")

function addItem(item = null) {
    // Get the text in the input tag
    let newItem = !item ? document.getElementById("input").value : item
    // Create a new HTML element that will have the new text in it
    let newElement = document.createElement("li")
    newElement.innerText = newItem
    // Create an onclick event that can remove an item
    newElement.onclick = function () {
        list.removeChild(newElement)
    }
    // Now that we have the element set up, we need to add it to the page
    list.appendChild(newElement)
    document.getElementById("input").value = ""
    save()
}

function save() {
    // Create an array
    let activeList = []
    // For every item, add it to our array
    for (i = 0; i < document.getElementsByTagName("li").length; i++) {
        activeList.push(document.getElementsByTagName("li")[i].innerText)
    }
    // Store the array as a string in localstorage so it presists after a reload of the page
    window.localStorage.setItem("todolist", activeList)
}

function load() {
    const savedList = window.localStorage.getItem("todolist").split(',')
    savedList.forEach((v) => {
        addItem(v)
    })
}

// Have the page "listen" for the enter key when typing in the input box
window.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter") {
        addItem()
    }
})

window.onload = load()