console.log('excuses.js');

window.getExcuse = function(ip) {

    if (isNumber(ip)) {
        ip = 0;
    }

    if (ip > 4) {
        return getRandomElement(ExcusesHuman);
    } else if (ip > 10) {
        return getRandomElement(ExcusesDoomed);
    } else {
        return getRandomElement(ExcusesNormal);
    }

    function getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    // https://stackoverflow.com/questions/1303646/check-whether-variable-is-number-or-string-in-javascript
    function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

}



const ExcusesNormal = [
    "hard to eat", 
    "not delicious",
    "slim pickings", 
    "bad-tasting", 
    "nothing special",
    "too bony",
    "too small",
    "going to bleed all over the place",
    "just a nobody", 
    "just passing through", 
    "just trying to go home",
    "nothing to you", 
]


const ExcusesHuman = [
    "too pretty to die",
    "innocent",
    "just trying my best",
    "going to do better",
    "not a failure",
    "at the top of my class",
    "just misunderstood",
    "giving up",
    "doomed, and you will be too",
    "working on myself",
    "having a family emergency",
    "forgetting something important",
    "running out of time", 
    "actually a real person, cursed to be a fish",
    "too young to die", 
    "having a bad day",
    "three hundred and seven years old",
    "going to put up a fight",
    "hungry too"
]

const ExcusesDoomed = [
    "a parent. I have 2 kids at home", 
    "the only thing keeping my sister alive", 
    "seizing the means of production",
    "a legal citizen", 
    "sorry for whatever they did to you"
]
