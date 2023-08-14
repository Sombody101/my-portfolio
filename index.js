const DEBUG = false;
const VERSION = "1.0.0.3";
contentLoaded = false;

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
        switchTheme(event.matches);
    });

async function showContent(force) {
    const overlayDiv = document.getElementById("overlayDiv");

    if (overlayDiv) {
        if (force) {
            window.scrollTo(0, 0);
            overlayDiv.style.opacity = "0";
            overlayDiv.remove();
        } else
            setTimeout(() => {
                if (contentLoaded) {
                    window.scrollTo(0, 0);
                    overlayDiv.style.opacity = "0";

                    setTimeout(() => overlayDiv.remove(), 1000);
                } else showContent();
            }, 100);
    }
}

window.onscroll = function () {
    hideHeadOnScroll();
};

var navbar = document.getElementById("head-menu");
var sticky = navbar.offsetTop;

function hideHeadOnScroll() {
    if (window.scrollY <= sticky) navbar.classList.add("nav-up");
    else navbar.classList.remove("nav-up");
}

const messages = [
    `<h1 class="title">
		Caution: Bytes in Progress
	</h1>
	<p>
		Hold tight, I'm crafting digital magic behind the scenes. Just like how this message was chosen at random (but let's not talk about that), my website is a realm of carefully curated code. Get ready for a coding spectacle!
	</p>`,

    `<h1 class="title">
		Embracing Controlled Chaos
	</h1>
	<p>
		My website might look like a tornado of pixels and code, but don't worry, I'm the mad scientist orchestrating this digital symphony. Chaos has never been so artfully designed—get ready for the show!
	</p>`,

    `<h1 class="title">
		Pixels, Coffee, and Unicorns
	</h1>
	<p>
		Imagine my website as a magical potion brewing in a pixelated cauldron. While others think it's a random concoction, it's actually crafted with pixel love, a dash of coffee, and a sprinkle of unicorn magic.
	</p>`,

    `<h1 class="title">
		Unraveling My Digital Daydream
	</h1>
	<p>
		Think of my website as a journey through my imagination—a place where code and creativity collide. It may seem random, but it's a labyrinth of ideas woven together with digital thread. Get ready to explore my mind!
	</p>`,

    `<h1 class="title">
		Curating Chaos, One Line at a Time
	</h1>
	<p>
		My website is like a gallery of controlled chaos, and I'm the curator wielding a keyboard instead of a brush. Each pixel has been meticulously placed—though it might look random, it's a masterpiece in pixel diplomacy.
	</p>`,

    `<h1 class="title">
		Unveiling the Curtain of Code
	</h1>
	<p>
		Imagine my website as a stage, and I'm the magician pulling back the digital curtain. Every trick, every pixel—it might seem random, but it's a carefully scripted show designed to leave you amazed!
	</p>`,

    `<h1 class="title">
		Cracking the Code Safe
	</h1>
	<p>
		My website is like a vault of digital secrets, and I'm the code cracker working tirelessly to unlock its potential. It might appear random, but trust me, each line of code is a step closer to online enlightenment.
	</p>`,

    `<h1 class="title">
		Under development!
	</h1>
	<p>
		Here's a funny quote for your trouble 
	</p>
	<p>
		"Debugging is like being the detective in a crime movie where you are also the murderer." 
	</p>
	<p>
		- Filipe Fortes
	</p>`,
];

function Main() {
    showContent();

    const site = window.location.pathname;
    const footer = document.getElementById("crFooter");
    footer.innerHTML = `
	<p>
		<div>
			<p class="footer-sub-text left">
				Have any suggestions? Keep them to yourself.
			</p>
			<p class="footer-sub-text left">
				Not that I don't want them. There's just no way for you to tell me!
			</p>
		</div>
		<div style="display: flex; width: 100%">
			<p style="font-size: 10px; margin: auto;">
				${
        		    "© 2023 Evan Heyborne | " +
        		    window.location.hostname +
        		    (DEBUG ? " | DEBUG MODE ACTIVE" : "") + " | v" + VERSION
        		}
			</p>
		</div>
	</p>
	`;

    const main = document.getElementById("main");
    main.innerHTML = `
	<div class="display-box centered">
		${messages[Math.floor(Math.random() * messages.length)]}
		<p>
			But thanks for visiting anyways! 😁
		</p>
	</div>
	`;

    console.log("Current site: '" + site + "'");

    const img = document.getElementById("me-img");
    let imgLoaded = false;

    img.addEventListener("load", () => {
        imgLoaded = true;
    });

    // This should be the last thing to happen
    function waitForImg() {
        if (!imgLoaded && !DEBUG) {
            setTimeout(waitForImg, 100);
            return;
        }
        contentLoaded = true;
    }
    waitForImg();
}

window.onload = Main();
