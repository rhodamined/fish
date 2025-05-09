console.log('confidence.js');

window.getConfidence = function(ip) {

    if (!isNumber(ip)) {
        ip = 0;
    }

    if (ip > 4) {
        return getRandomElement(ConfidenceMaybe);
    } else if (ip > 10) {
        return getRandomElement(ConfidenceBad);
    } else {
        return getRandomElement(ConfidenceNormal);
    }

    function getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    // https://stackoverflow.com/questions/1303646/check-whether-variable-is-number-or-string-in-javascript
    function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

}

const ConfidenceNormal = [
    "looks like", 
    "you think it's", 
    "kind of looks like",
    "is definitely"
]


const ConfidenceMaybe = [
    "might be", 
    "is probably", 
    "could be", 
    "reminds you of"    
]

const ConfidenceBad = [
    "should be",
    "bears a passing resemblance to",
    "could be mistaken for", 
    "vaguely reminds you of",
    "is reminiscent of",
    "could at one point have been described as"
]
