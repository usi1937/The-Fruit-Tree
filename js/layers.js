addLayer("a", {
    name: "Apples", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#489650",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Apples", // Name of prestige currency
    baseResource: "Seed", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('a', 15)) mult = mult.times(2)
        if (hasUpgrade('a', 22)) mult = mult.times(2)
        if (hasUpgrade('a', 24)) mult = mult.times(2.5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "a", description: "A: Reset for Apples", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return true },
    upgrades: {
        11: {
            title: "First Upgrade",
            description: "Double your point gain!",
            cost: new Decimal(1)
        },
        12: {
            title: "Double Again!",
            description: "Double the effects of the previous upgrade!",
            cost: new Decimal(3)
        },
        13: {
            title: "More Multipliers!",
            description: "Triple your point gain!",
            cost: new Decimal(10)
        },
        14: {
            title: "More Apple Seeds",
            description: "Apples boost seed. ",
            effectDisplay() { return `Currently: x${format(upgradeEffect(this.layer, this.id))}` },
            effect() { return player.a.points.sqrt().add(1) },
            cost: new Decimal(20)
        },
        15: {
            title: "Seeds Grow Two",
            description: "Get twice as many apples",
            cost: new Decimal(100)
        },
        21: {
            title: "Not Double?",
            description: "Get x1.5 seed",
            cost: new Decimal(320)
        },
        22: {
            title: "Gold Plated",
            description: "Apples are now golden, and grow twice as much!",
            cost: new Decimal(450)
        },
        23: {
            title: "QUINTUPLE SEEDS????",
            description: "Gain x5 more seed!",
            cost: new Decimal(1500)
        },
        24: {
            title: "Big Boosts",
            description: "Gain x3 more seed and x2.5 more apples",
            cost: new Decimal(5000)
        },
        25: {
            title: "10th Boosts",
            description: "Get x3 more seed",
            cost: new Decimal("25e3")
        },
    },


})

addLayer("b", {
    name: "Bananas", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ["a"],
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#aecc27",
    requires: new Decimal("100e3"), // Can be a function that takes requirement increases into account
    resource: "Bananas", // Name of prestige currency
    baseResource: "Apples", // Name of resource prestige is based on
    baseAmount() { return player.a.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "b", description: "B: Reset for Bananas", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return true },
    upgrades: {
        11: {
            title: "BANANAS!!!!",
            description: "Gain 3 times more Seed!",
            cost: new Decimal(1)
        },

    },
})
