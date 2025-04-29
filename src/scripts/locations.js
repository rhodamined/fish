console.log("locations.js");

window.getLocation = function() {

    return getRandomElement(LocationArr);

    function getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}



class Location {

    constructor({name, id, zone, boro, neighborhood, access_types, desc}) {
        this.name = name;
        this.id = id;
        this.zone = zone;
        this.boro = boro;
        this.neighborhood = neighborhood;
        this.access_types = access_types;
        this.desc = desc;
    }

    get getName() {
        return this.name;
    }

    get getId() {
        return this.id;
    }

    get getZone() {
        return this.zone;
    }

    get getBoro() {
        return this.boro;
    }

    get getNeighborhood() {
        return this.neighborhood;
    }

    get getAccessTypes() {
        return this.access_types;
    }

    get getDesc() {
        return this.desc;
    }

}

const Q42 = new Location({
    name: "MacNeil Park",
    id: "Q42",
    zone: 8,
    boro: "Queens",
    neighborhood: "College Point",
    access_types: ['R'],
    desc: "You can see Riker's Island to your left and and the Whitestone Bridge to your right."
})

const Q43 = new Location({
    name: "Powell's Cove Park",
    id: "Q43",
    zone: 8,
    boro: "Queens",
    neighborhood: "College Point",
    access_types: ['R', 'B'],
    desc: "This is the bottom of the deep bowl that is Powell Cove. The shoreline is lined with beautiful rushes and old trash."
})

const Q44 = new Location({
    name: "Malba Drive",
    id: "Q44",
    zone: 8,
    boro: "Queens",
    neighborhood: "Northern Queens",
    access_types: ['Pr'],
    desc: "The cul-de-sac at the end of a residential road, but without homes -- only water. It took a long time to get here and there's nowhere to sit, but the view of the Whitestone Bridge is panoramic."
})

const Q45 = new Location({
    name: "Francis Lewis Park",
    id: "Q45",
    zone: 8,
    boro: "Queens",
    neighborhood: "Northern Queens",
    access_types: ['Pr'],
    desc: "You are nestled in the eastern armpit of the Whitestone Bridge. If the trees had leaves, they would shield you from the traffic noise."
})

const Q52 = new Location({
    name: "Ralph DeMarco Park",
    id: "Q52",
    zone: 7,
    boro: "Queens",
    neighborhood: "Deep Ditmars",
    access_types: ['Pr'],
    desc: "You can feel the electric hum of the Astoria power station from behind the fences. You still remember the last time it arced. The sky was blue for 20 minutes at 7pm."
})


const Q54 = new Location({
    name: "the parking lot behind the Astoria Costco",
    id: "Q54",
    zone: 7,
    boro: "Queens",
    neighborhood: "Astoria",
    access_types: ['Pr'],
    desc: "If you squint, you can also see the dogs in the park across the water on Roosevelt Island."
})


const LocationArr = [Q42, Q43, Q44, Q45, Q52, Q54];