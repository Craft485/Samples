// Global game object
var Game = {
    coins: 0,
    coinsPerSecond: 0,
    buildings: new Map
}

function save() {
    window.localStorage.setItem("MVC", btoa(JSON.stringify(Game)))
    // Maps will be saved as an object normally, so instead we'll make an array of the building objects
    const e = Game.buildings.entries()
    let x = []
    for (let i = 0; i < Game.buildings.size; i++) {
        x.push(e.next().value[1])
    }
    window.localStorage.setItem("MVCBuildings", btoa(JSON.stringify(x)))
    console.log(JSON.parse(atob(window.localStorage.getItem("MVCBuildings"))))
}

function load() {
    const a = window.localStorage.getItem("MVC")
    const ls = !!a ? JSON.parse(atob(a)) : null
    if (!!ls) Game = ls
}

// Tick/update function
window.setInterval(() => {
    document.getElementById("coins").innerText = Game.coins
    document.getElementById("coinsPerSecond").innerText = Game.coinsPerSecond
}, 250)

window.setInterval(() => Game.coins += Game.coinsPerSecond, 1000)

window.setInterval(save, 60000)

window.onload = load