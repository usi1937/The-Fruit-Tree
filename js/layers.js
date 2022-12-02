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
    doReset(layer) {
        if (layers[layer].row <= layers[this.layer].row) return;
        const keep = []
        if (hasMilestone('b', 0)) keep.push("upgrades")
        layerDataReset(this.layer, keep)
    },
    passiveGeneration() {return hasMilestone('b', 1)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('a', 15)) mult = mult.times(2)
        if (hasUpgrade('a', 22)) mult = mult.times(2)
        if (hasUpgrade('a', 24)) mult = mult.times(2.5)
        if (hasUpgrade('a', 31)) mult = mult.times(5)

        if (hasUpgrade('b', 12)) mult = mult.times(1.5)
        if (hasUpgrade('b', 14)) mult = mult.times(player.a.points.add(10).log(10))
        if (hasUpgrade('b', 21)) mult = mult.times(2)
        if (hasUpgrade('b', 22)) mult = mult.times(5)

        if (hasUpgrade('c', 11)) mult = mult.times(4)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "a", description: "a: Reset for Apples", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
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
            effectDisplay() { return `x${format(upgradeEffect(this.layer, this.id))}` },
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
            description: "Get x3 more seed and unlock a new layer",
            cost: new Decimal("25e3")
        },
        31: {
            title: "BananaBoost?",
            description: "Boost apples by x5",
            unlocked() { return hasUpgrade('b', 23) },
            cost: new Decimal("1e9")
        },
        32: {
            title: "Extra Seedy",
            description: "Get 10x Seed",
            unlocked() { return hasUpgrade('b', 23) },
            cost: new Decimal("1e11")
        },
        33: {
            title: "Seedy Seeds",
            description: "Seeds boost themselves. ",
            effectDisplay() { return `x${format(upgradeEffect(this.layer, this.id))}` },
            effect() { return player.points.add(10).log(10) },
            unlocked() { return hasUpgrade('b', 23) },
            cost: new Decimal("1e12")
        },
        34: {
            title: "Exponential",
            description: "Power seed gain by 1.01",
            unlocked() { return hasUpgrade('b', 23) },
            cost: new Decimal("1e13")
        },
        35: {
            title: "A to B",
            description: "Boost Banana gain by three times",
            unlocked() { return hasUpgrade('b', 23) },
            cost: new Decimal("1e30")
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
    doReset(layer) {
        if (layers[layer].row < layers[this.layer].row || layers[layer].position <= layers[this.layer].position) return;
        const keep = []
        if (hasMilestone('c', 0)) keep.push("milestones")
        layerDataReset(this.layer, keep)
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('a', 35)) mult = mult.times(3)

        if (hasUpgrade('b', 21)) mult = mult.times(2)
        if (hasUpgrade('b', 23)) mult = mult.times(2)

        if (hasUpgrade('c', 11)) mult = mult.times(4)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "b", description: "b: Reset for Bananas", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('a', 25) || player.c.unlocked || player.b.unlocked },
    milestones: {
        0: {
            requirementDescription: "5 Bananas",
            effectDescription: "Bananas do not reset Apple upgrades",
            done() { return player.b.points.gte(5) },
        },
        1: {
            requirementDescription: "50 Bananas",
            effectDescription: "Gain 100% of Apple gain per second",
            done() { return player.b.points.gte(50) },
        },
    },
    upgrades: {
        11: {
            title: "BANANAS!!!!",
            description: "Gain 3 times more Seed!",
            cost: new Decimal(1)
        },
        12: {
            title: "Super Seeds",
            description: "Gain 2 times more Seed and 1.5 times more Apples!",
            cost: new Decimal(2)
        },
        13: {
            title: "Banana Boost",
            description: "Gain more Seed based on Bananas!",
            effectDisplay() { return `x${format(upgradeEffect(this.layer, this.id))}` },
            effect() { return player.b.points.sqrt().add(1) },
            cost: new Decimal(6)
        },
        14: {
            title: "Duplication",
            description: "Apples boost themselves",
            effectDisplay() { return `x${format(upgradeEffect(this.layer, this.id))}` },
            effect() { return player.a.points.add(10).log(10) },
            cost: new Decimal(15)
        },
        21: {
            title: "Fruit Ninja",
            description: "Gain twice as much Banana and Apple",
            cost: new Decimal("40")
        },
        22: {
            title: "Apple Seeds",
            description: "Gain 5x as much Apple and Seed",
            cost: new Decimal("250")
        },
        23: {
            title: "Banana Box",
            description: "x2 Bananas and unbox new Apple upgrades",
            cost: new Decimal("3e3")
        },
        24: {
            title: "",
            description: "Unlock a new layer",
            cost: new Decimal("2.5e13")
        },

    },

})

addLayer("c", {
    name: "Coconuts", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ["a", "b"],
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#cfcfcf",
    requires: new Decimal("1e14"), // Can be a function that takes requirement increases into account
    resource: "Coconuts", // Name of prestige currency
    baseResource: "Bananas", // Name of resource prestige is based on
    baseAmount() { return player.b.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "c", description: "c: Reset for Coconut", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('b', 24) || player.c.unlocked},
    milestones: {
        0: {
            requirementDescription: "4 Coconut",
            effectDescription: "Keep Banana milestones on reset",
            done() { return player.c.points.gte(4) },
        },
    },
    upgrades: {
        11: {
            title: "Coconuts for days",
            description: "Gain 4 times more Apples and Bananas",
            cost: new Decimal(1)
        },
        12: {
            title: "Coconut Seeds",
            description: "Gain x10 Seed",
            cost: new Decimal(3)
        },
    },
})
