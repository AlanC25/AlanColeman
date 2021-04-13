import { loadHtml, getRandomInt, isVowel } from './scripts/helper.mjs'

// CONSTS
const adjectives = ["irish", "explorative", "wonderful", "responsible", "adventurous", "ambitious", "creative", "passionate", "front-end"];
const nouns = ["nerd", "designer", "coder", "gamer", "developer", "programmer", "geek", "engineer", "man", "tinkerer"];

// LOAD HTML
loadHtml('./sections/header/index.html', '.header').then(() => {
    // Loop subtitles
    let subtitle = document.getElementsByClassName('subtitle')[0];
    setInterval(() => {
        let adjective = adjectives[getRandomInt(0, adjectives.length)];
        let noun = nouns[getRandomInt(0, nouns.length)];
        let subject = `is ${isVowel(adjective[0]) ? 'an' : 'a'}`;
        let description = `${subject} ${adjective} ${noun}`;
        subtitle.innerHTML = description;
    }, 1500);

    // Load alanavatar script
    var tag = document.createElement("script");
    tag.src = "scripts/alanavatar.mjs";
    document.getElementsByTagName("head")[0].appendChild(tag);
});

loadHtml('./sections/about/index.html', '.about');
// loadHtml('./sections/portfolio/index.html', '.portfolio');
loadHtml('./sections/contact/index.html', '.contact');

// Make Nav appear
var nav = document.querySelector('.navigation');
var header = document.querySelector('.header').getBoundingClientRect();

var runOnScroll = function (evt) {
    // Display nav halfway through the header section
    if ((header.bottom / 2) <= window.scrollY) {
        nav.classList.add('display');
    } else if (nav.classList.contains('display')) {
        nav.classList.remove('display');
    }
};

window.addEventListener("scroll", runOnScroll);
