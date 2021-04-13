/**
 * gets a random number in between specified min and max
 * defaults to 0-1
 * @param {*} min
 * @param {*} max
 */
function getRandomInt(min, max) {
    if (!max) (min = 0), (max = 1);
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * check if letter is a vowel
 * @param {*} letter
 */
function isVowel(letter) {
    return /^[aeiou]$/i.test(letter);
}

/**
 * fetch html to load into html file
 * @param {*} url url of html file
 * @param {*} className classname to insert innerHTML
 */
async function loadHtml(url, className) {
    if (className && className[0] != ".") {
        className = "." + className;
    }

    let response = await fetch(url);
    let html = await response.text();
    document.querySelector(className).innerHTML = html;
}

export { loadHtml, getRandomInt, isVowel };
