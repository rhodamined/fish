console.log('barter.js');

window.getBarter = function(ip) {

    if (isNumber(ip)) {
        ip = 0;
    }

    if (ip > 4) {
        return getRandomElement(BarterHuman);
    } else if (ip > 10) {
        return getRandomElement(BarterDoomed);
    } else {
        return getRandomElement(BarterNormal);
    }

    function getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    // https://stackoverflow.com/questions/1303646/check-whether-variable-is-number-or-string-in-javascript
    function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

}

const BarterNormal = [
    "sI'll tell you a secret", 
    "xI'll show you a better place to fish"
]

const BarterHuman = [
    "you'll never have to see me again", 
    "I'll be better",
    "xI'll show you a beautiful view of the ocean"
]

const BarterDoomed = [
    "xI'll show you where my enemies are. Together we can eat them instead"
]