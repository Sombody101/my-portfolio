const DEBUG = true;
const VERSION = "1.0.0.0"
contentLoaded = false

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

window.onscroll = function () { hideHeadOnScroll() };

var navbar = document.getElementById("head-menu");
var sticky = navbar.offsetTop;

function hideHeadOnScroll() {
	if (window.scrollY <= sticky)
		navbar.classList.add("nav-up")
	else
		navbar.classList.remove("nav-up");
}

function Main() {
	showContent();

	const site = window.location.pathname;
	const footer = document.getElementById("crFooter")
	footer.innerHTML = `
	<p>
		${"© 2023 Evan Heyborne | " + window.location.hostname + ".com" + " | DEBUG MODE ACTIVE"}
		<p id="version">
			${VERSION}
		</p>
	</p>
	`

	console.log("Current site: '" + site + "'");
	contentLoaded = true;
}

window.onload = Main();
