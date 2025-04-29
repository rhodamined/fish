console.log("fish.js");

window.getFish = function(zone) {

    let newFish = false;
    
    while (!newFish) {
        let fish = getRandomElement(FishArr);
        if (fish.zones.includes(zone)) {
            newFish = true;
            return fish;
        }
    }

    function getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}

class Fish {

    constructor({species, type, size_range, zones, varieties, descriptors, is_tasty, is_bfeeder}) {
        this.species = species;
        this.type = type;
        this.size_range = size_range;
        this.zones = zones;
        this.varieties = varieties;
        this.descriptors = descriptors;
        this.is_tasty = is_tasty;
        this.is_bfeeder = is_bfeeder;    
      }

    get getSpecies() {
        return this.species;
    }

    get getType() {
        return this.type;
    }

    get getSizeRange() {
        return this.size_range;
    }
    
    get getSizeMin() {
        return this.size_range[0];
    }

    get getSizeMax() {
        return this.size_range[1];
    }

    get getZones() {
        return this.zones;
    }

    get getDescriptors() {
        return this.descriptors;
    }

    get getVarieties() {
        return this.varieties;
    }

    get isBottomFeeder() {
        return this.is_bfeeder;
    }

    get isTasty() {
        return this.is_tasty;
    }
}


const Anchovy = new Fish({
    species: "anchovy", 
    type: "fish",
    size_range: [1, 8],
    zones: [1, 2, 3, 4, 5, 6, 7, 8],
    varieties: [],
    descriptors: ["small", "tiny", "fluttering", "wagging", "doleful", "baleful", "queasy", "squeamish"],
    is_tasty: true,
    is_bfeeder: false
})


const Bass = new Fish({
    species: "bass",
    type: "fish",
    size_range: [3, 54],
    zones: [1, 2, 3, 4, 5, 6, 7, 8],
    varieties: ["striped"],
    descriptors: ["shiny", "weak", "soulful", "melancholic", "firm", "stern", "floppy", "upset"],
    is_tasty: true,
    is_bfeeder: false
});

const Bluefish = new Fish({
    species: "bluefish", 
    type: "fish",
    size_range: [3, 42],
    zones: [1, 2, 3, 4, 5, 6, 7, 8],
    varieties: [],
    descriptors: ["oblong", "pointy", "unsurprised", "wet", "strong", "angry"],
    is_tasty: true,
    is_bfeeder: false
})

const Eel = new Fish({
    species: "eel", 
    type: "eel",
    size_range: [7, 32],
    zones: [1, 2, 3, 4, 5, 6, 7, 8],
    varieties: ["American", "conger"],
    descriptors: ["slippery", "rosy", "black", "spotted", "slick", "sad", "buttery", "complacent", "fleshy"],
    is_tasty: true,
    is_bfeeder: true
})


const Flounder = new Fish({
    species: "flounder", 
    type: "flatfish",
    size_range: [7, 32],
    zones: [1, 2, 3, 4, 5, 6, 7, 8],
    varieties: ["summer", "winter", "windowpane"],
    descriptors: ["round", "hefty", "lean", "pale", "put-upon", "spiny", "bony", "bubbly", "blushing", "bruised", "gasping", "limp"],
    is_tasty: true,
    is_bfeeder: true
})


const Fluke = new Fish({
    species: "fluke", 
    type: "flatfish",
    size_range: [14, 36],
    zones: [1, 2, 3, 4, 5, 6, 7, 8],
    varieties: [],
    descriptors: ["brown", "beige", "spotted", "damp", "extra-flat", "morose", "gasping"],
    is_tasty: true,
    is_bfeeder: true
})


const Herring = new Fish({
    species: "herring", 
    type: "fish",
    size_range: [8, 18],
    zones: [1, 2, 3, 4, 5, 6, 7, 8],
    varieties: ["mossbunker"],
    descriptors: ["bug-eyed", "spotted", "angry", "beautiful", "slow", "conservative"],
    is_tasty: false,
    is_bfeeder: false
})


const Mummichog = new Fish({
    species: "mummichog", 
    type: "fish",
    size_range: [1, 3],
    zones: [1, 2, 3, 4, 5, 6, 7, 8],
    varieties: [],
    descriptors: ["thick little", "small but mighty", "unfriendly", "woefully egg-laden", "thin, pale", "olive-green or possibly olive-brown", "wise little", "slick", "muddy"],
    is_tasty: false,
    is_bfeeder: true
})


const Perch = new Fish({
    species: "perch", 
    type: "fish",
    size_range: [6, 12],
    zones: [1, 2, 3, 4, 5, 6, 7, 8],
    varieties: ["silver", "white"],
    descriptors: ["silly", "striped", "punk-ass", "chubby", "big-finned", "unsavory"],
    is_tasty: false,
    is_bfeeder: false
})


const Porgy = new Fish({
    species: "porgy", 
    type: "fish",
    size_range: [6, 12],
    zones: [1, 2, 3, 4, 5, 6, 7, 8],
    varieties: [],
    descriptors: ["fat", "thin", "slim", "scuffed-up", "calico", "sleek", "wiggling", "struggling", "hard-fighting"],
    is_tasty: true,
    is_bfeeder: true
})


const Stingray = new Fish({
    species: "stingray", 
    type: "fish",
    size_range: [12, 48],
    zones: [1],
    varieties: [],
    descriptors: ["plate-like", "wise", "chubby", "silty", "brown", "wan", "lumbering", "lost", ],
    is_tasty: false,
    is_bfeeder: true
})


const FishArr = [Anchovy, Bass, Bluefish, Eel, Flounder, Fluke, Herring, Mummichog, Perch, Porgy, Stingray]
