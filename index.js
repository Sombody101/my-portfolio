const DEBUG = false;
const VERSION = "1.0.0.3";
contentLoaded = false;

window.onscroll = function () {
    if (window.scrollY <= sticky) navbar.classList.add("nav-up");
    else navbar.classList.remove("nav-up");
};

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

var navbar = document.getElementById("head-menu");
var sticky = navbar.offsetTop;

const messages = [
    `<h1 class="title">
		Caution: Bytes in Progress
	</h1>
	<p class="quote">
		Hold tight, I'm crafting digital magic behind the scenes. Just like how this message was chosen at random (but let's not talk about that), my website is a realm of carefully curated code. Get ready for a coding spectacle!
	</p>`,

    `<h1 class="title">
		Embracing Controlled Chaos
	</h1>
	<p class="quote">
		My website might look like a tornado of pixels and code, but don't worry, I'm the mad scientist orchestrating this digital symphony. Chaos has never been so artfully designed—get ready for the show!
	</p>`,

    `<h1 class="title">
		Pixels, Coffee, and Unicorns
	</h1>
	<p class="quote">
		Imagine my website as a magical potion brewing in a pixelated cauldron. While others think it's a random concoction, it's actually crafted with pixel love, a dash of coffee, and a sprinkle of unicorn magic.
	</p>`,

    `<h1 class="title">
		Unraveling My Digital Daydream
	</h1>
	<p class="quote">
		Think of my website as a journey through my imagination—a place where code and creativity collide. It may seem random, but it's a labyrinth of ideas woven together with digital thread. Get ready to explore my mind!
	</p>`,

    `<h1 class="title">
		Curating Chaos, One Line at a Time
	</h1>
	<p class="quote">
		My website is like a gallery of controlled chaos, and I'm the curator wielding a keyboard instead of a brush. Each pixel has been meticulously placed—though it might look random, it's a masterpiece in pixel diplomacy.
	</p>`,

    `<h1 class="title">
		Unveiling the Curtain of Code
	</h1>
	<p class="quote">
		Imagine my website as a stage, and I'm the magician pulling back the digital curtain. Every trick, every pixel—it might seem random, but it's a carefully scripted show designed to leave you amazed!
	</p>`,

    `<h1 class="title">
		Cracking the Code Safe
	</h1>
	<p class="quote">
		My website is like a vault of digital secrets, and I'm the code cracker working tirelessly to unlock its potential. It might appear random, but trust me, each line of code is a step closer to online enlightenment.
	</p>`,

    `<h1 class="title">
		Under development!
	</h1>
	<p class="quote">
		Here's a funny quote for your trouble 
	</p>
	<p class="quote">
		"Debugging is like being the detective in a crime movie where you are also the murderer." 
	</p>
	<p class="quote">
		- Filipe Fortes
	</p>`,

    `<h1 class="title">
		Under development!
	</h1>
	<p class="quote">
		Here's a funny quote for your trouble 
	</p>`,
];

function Main() {
    showContent();

    const img = document.getElementById("me-img");
    let imgLoaded = false;
    console.log("Starting image load (async)");

    if (img.complete) {
        console.log("Image already loaded");
        imgLoaded = true;
    } else
        img.addEventListener("load", () => {
            imgLoaded = true;
            console.log("Image loaded");
        });

    const main = document.getElementById("main");
    const mNum = Math.floor(Math.random() * messages.length);
    main.innerHTML = `
        <div class="display-box centered">
            ${messages[mNum]}
            <p>
                But thanks for visiting anyway! 😁
            </p>
            <p class="lucky-message">
                Lucky message No. ${mNum + 1}
            </p>
        </div>
        `;

    const site = window.location.pathname;
    const footer = document.getElementById("crFooter");
    footer.innerHTML = `
	<p>
		<div class="t-light" style="font-size: var(--font-size-sm);">
			<p class="footer-sub-text left" style="padding: 0; margin-bottom: 10px;">
				Have any suggestions? Keep them to yourself.
			</p>
			<p class="footer-sub-text left" style="padding: 0; margin-bottom: 30px;">
				Not that I don't want them. There's just no way for you to tell me!
			</p>
		</div>
		<div class="footer-signature centered">
			<img src="/assets/images/signature_light.webp" alt="Image of my signature">
		</div>
		<div style="display: flex; width: 100%">
			<p style="font-size: var(--font-size-sm); margin: auto;" class="t-light">
				${
                    "© 2023 Evan Heyborne | " +
                    window.location.hostname +
                    (DEBUG ? " | DEBUG MODE ACTIVE" : "") +
                    " | v" +
                    VERSION
                }
			</p>
		</div>
	</p>
	`;

    console.log("Current site: '" + site + "'");

    // This should be the last thing to happen
    function waitForImg() {
        if (!imgLoaded && !DEBUG) {
            setTimeout(waitForImg, 100);
            return;
        }

        contentLoaded = true;
        console.log("Content loaded\r\nRemoving overlay");
    }
    waitForImg();
}

Main();
