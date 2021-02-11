const badge = gsap.timeline({
    onHover: true,
    repeat: -1,
    paused: true,
});

badge.to(".badge, .badge-shadow", 15, {
    rotation: "360",
    ease: Linear.easeNone,
    transformOrigin: "center",
});

const badgeShadow = document.querySelectorAll(".badge-shadow");
const alanavatar = document.querySelectorAll("#alanavatar");
alanavatar.forEach(function (el) {
    el.addEventListener("mouseover", function () {
        // badge.play();
    });
    el.addEventListener("mouseout", function () {
        // badge.pause();
    });

    el.addEventListener("click", function () {
        if (badge.isActive()) {
            badge.pause();
            badgeShadow[0].classList.remove("pink-fill");
            firebase.analytics().logEvent("click_face", { active: false });
        } else {
            badge.play();
            badgeShadow[0].classList.add("pink-fill");
            firebase.analytics().logEvent("click_face", { active: true });
        }
    });
});

const blink = gsap.timeline({
    repeat: -1,
    repeatDelay: 3.5,
    paused: true,
});

blink
    .to(
        ".right-eye, .left-eye",
        {
            duration: 0.05,
            opacity: 0,
        },
        0
    )
    .to(
        ".right-eye2, .left-eye2",
        {
            duration: 0.05,
            opacity: 1,
        },
        0
    )
    .to(
        ".right-eye, .left-eye",
        {
            duration: 0.05,
            opacity: 1,
        },
        0.15
    )
    .to(
        ".right-eye2 , .left-eye2",
        {
            duration: 0.05,
            opacity: 0,
        },
        0.15
    );

// "look at cursor" code
let xPosition;
let yPosition;

let height;
let width;

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}

function updateScreenCoords(event) {
    xPosition = event.clientX;
    yPosition = event.clientY;
}

let storedXPosition = 0;
let storedYPosition = 0;

// gsap can use queryselector in the quick setter but this is better for performance as it touches the DOM less
const dom = {
    head: document.querySelector(".head"),
    innerFace: document.querySelector(".inner-face"),
    eye: document.querySelectorAll(".eyes"),
    hairFringe: document.querySelector(".hair-fringe"),
    glasses: document.querySelector(".glasses"),
    shadow: document.querySelectorAll(".shadow"),
    ear: document.querySelectorAll(".ears"),
    mouth: document.querySelectorAll(".mouth"),
    eyebrowLeft: document.querySelector(".eyebrow-left"),
    eyebrowRight: document.querySelector(".eyebrow-right"),
    nostrilLeft: document.querySelector(".left-nostril"),
    nostrilRight: document.querySelector(".right-nostril"),
};

function animateFace() {
    if (!xPosition) return;
    // important, only recalculating if the value changes
    if (storedXPosition === xPosition && storedYPosition === yPosition) return;

    // range from -50 to 50
    let x = percentage(xPosition, width) - 50;
    let y = percentage(yPosition, height) - 50;

    // range from -20 to 80
    let yHigh = percentage(yPosition, height) - 20;
    // range from -80 to 20
    let yLow = percentage(yPosition, height) - 80;

    gsap.to(dom.head, {
        yPercent: yLow / 30,
        xPercent: x / 30,
    });
    gsap.to(dom.innerFace, {
        yPercent: yHigh / 3,
        xPercent: x / 2,
    });
    gsap.to(dom.glasses, {
        yPercent: yHigh / 6,
        xPercent: x / 10,
    });
    gsap.to([dom.nostrilLeft, dom.nostrilRight], {
        yPercent: yHigh / 2,
        xPercent: x,
    });
    gsap.to(dom.hairFringe, {
        yPercent: yHigh / 15,
        xPercent: x / 22,
    });
    gsap.to(dom.shadow, {
        yPercent: (yLow / 20) * -1,
        xPercent: (x / 20) * -1,
    });
    gsap.to(dom.ear, {
        yPercent: (y / 1.5) * -1,
        xPercent: (x / 30) * -1,
    });
    gsap.to([dom.eyebrowLeft, dom.eyebrowRight], {
        yPercent: y / 3,
    });

    storedXPosition = xPosition;
    storedYPosition = yPosition;
}

function addMouseEvent() {
    const safeToAnimate = window.matchMedia(
        "(prefers-reduced-motion: no-preference)"
    ).matches;

    if (safeToAnimate) {
        window.addEventListener("mousemove", updateScreenCoords);

        // gsap's RAF, falls back to set timeout
        gsap.ticker.add(animateFace);

        blink.play();
    }
}

// update if browser resizes
function updateWindowSize() {
    height = window.innerHeight;
    width = window.innerWidth;
}
updateWindowSize();
window.addEventListener("resize", updateWindowSize);

addMouseEvent();
