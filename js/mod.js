let modInfo = {
	name: "The Fruit Tree",
	id: "mymoda",
	author: "usi1947",
	pointsName: "Seed",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.1</h3><br><br>
		12/1/2022<br>
		-More banana upgrades and milestones<br>
		-Coconut layer with an upgrade<br><br>
		11/29/2022<br>
		- Rebranded to the Fruit Tree.<br>
		- Apple layer<br>
		- Banana layer with a few upgrades`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('a', 11)) gain = gain.times(2)
	if (hasUpgrade('a', 12)) gain = gain.times(2)
	if (hasUpgrade('a', 13)) gain = gain.times(3)
	if (hasUpgrade('a', 14)) gain = gain.times(player.a.points.sqrt().add(1))
	if (hasUpgrade('a', 21)) gain = gain.times(1.5)
	if (hasUpgrade('a', 23)) gain = gain.times(5)
	if (hasUpgrade('a', 24)) gain = gain.times(3)
	if (hasUpgrade('a', 25)) gain = gain.times(3)
	if (hasUpgrade('a', 32)) gain = gain.times(10)
	if (hasUpgrade('a', 33)) gain = gain.times(player.points.add(10).log(10))
	if (hasUpgrade('a', 34)) gain = gain.times(gain.pow(1.01))

	if (hasUpgrade('b', 11)) gain = gain.times(3)
	if (hasUpgrade('b', 12)) gain = gain.times(2)
	if (hasUpgrade('b', 13)) gain = gain.times(player.b.points.sqrt().add(1))
	if (hasUpgrade('b', 22)) mult = mult.times(5)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}