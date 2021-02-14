class Building {
    /**
     * Building class, this acts as a blueprint for creating all of our buildings
     * @param {String} name 
     * @param {Number} baseCost 
     * @param {Number} perSecond 
     * @param {Number} owned 
     */
    constructor (name, baseCost, perSecond, owned = 0) {
        this.name = name
        this.cost = baseCost
        this.perSecond = perSecond
        this.owned = owned
    }
    buy () {
        // Does the user have enough currency to buy this building?
        if (Game.coins >= this.cost) {
            this.owned++
            Game.coins -= this.cost
            Game.coinsPerSecond += this.perSecond
            // Cost increase function
            this.cost = Math.ceil(this.cost + Math.pow(1.07, 2 * this.owned))
            // Visually update
            document.getElementById(`${this.name}Owned`).innerText = this.owned
            document.getElementById(`${this.name}Cost`).innerText = this.cost
        }
    }
}

function loadBuildings () {
    // The info loaded from the save is going to make this an object, so we need to reset it to be a map
    Game.buildings = new Map
    // Get the save
    const save = window.localStorage.getItem("MVCBuildings")
    const ls = !!save ? JSON.parse(atob(save)) : false
    console.log(ls)
    // Does the save exist?
    // Object.keys makes an array of the property names of an object
    if (!!ls && ls.length > 0) {
        // Yes? Then transfer the old building data into the current Game object
        ls.forEach(v => {
            Game.buildings.set(v.name, new Building(v.name, v.cost, v.perSecond, v.owned))
        })
    } else {
        // No? Manually create new building instances as no other building instance exists
        // The following array is the only place we will be hardcoding the buildings
        const b = [new Building("Peasant Farm", 15, 1), new Building("Mine", 50, 2)]
        b.forEach(v => {
            Game.buildings.set(v.name, v)
        })
    }
    // DOM manipulatin in order to add the buildings to the page
    const map = Game.buildings.keys()
    for (let i = 0; i < Game.buildings.size; i++) {
        // Get the building
        const building = Game.buildings.get(map.next().value)

        // Create container
        const container = document.createElement('div')
        container.className = "building"
        console.log(building)
        container.id = building.name
        container.onclick = () => Game.buildings.get(building.name).buy()

        // Create Owned and Cost displays
        const owned = document.createElement('span')
        owned.id = `${building.name}Owned`
        owned.innerText = building.owned
        owned.style.paddingLeft = "50%"

        const cost = document.createElement('span')
        cost.id = `${building.name}Cost`
        cost.innerText = building.cost

        // Add them all together
        container.innerText = building.name
        container.appendChild(document.createElement('br'))
        container.appendChild(cost)
        container.appendChild(owned)

        // Add the final elemnet to the page
        document.getElementById('buildings-display').appendChild(container)
    }
}

window.addEventListener("load", loadBuildings)