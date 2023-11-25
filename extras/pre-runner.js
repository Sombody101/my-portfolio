/*
'pre-runner.js' is meant for functionality that needs to occur before elements have loaded.
Keeping theme presets here makes it so people aren't being flashed by a white light and then everything going dark.
*/

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays = 2 ^ (32 - 1)) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkCookie(cname) {
    let cookie = getCookie(cname);
    if (cookie != "") return true;
    return false;
}

function getDefaultCookie(cname, cdefault) {
    let cookie = getCookie(cname);
    if (cookie == "") {
        setCookie(cname, cdefault);
        return cdefault;
    }

    return cookie;
}

const lightTheme = [
    "rgb(0, 105, 217)",
    "rgb(52, 152, 219)",
    "rgb(204, 204, 204)",
    "rgb(232, 232, 232)",
    "rgb(255, 165, 0)",
    "rgb(0, 0, 0)",
    "rgb(0,53,156)",
    "linear-gradient(90deg, rgba(0,53,156,1) 0%, rgba(0,123,255,1) 100%)",
    "rgb(255, 255, 255)",
    "rgb(237, 200, 34)",
];

const darkTheme = [
    "rgb(0, 70, 145)",
    "rgb(0, 47, 94)",
    "rgb(170, 170, 170)",
    "rgb(20, 20, 20)",
    "rgb(255, 215, 0)",
    "rgb(255, 255, 255)",
    "rgb(0, 17, 34)",
    "linear-gradient(90deg, rgba(0, 17, 34, 1) 0%, rgb(0, 60, 123) 100%)",
    "var(--neutral)",
    "rgb(225, 215, 170)",
];

const rootVars = [
    "primary",
    "secondary",
    "neutral",
    "background",
    "accent",
    "text-color",
    "background-alt",
    "background-grad",
    "text-color-inv",
    "theme-toggle-color",
];

const textBasedVars = [
    "T-primary",
    "T-secondary",
    "T-neutral",
    "T-background",
    "T-accent",
    "T-text-color",
];

function switchTheme(fromManual = false, forceDark = false) {
    const toggle = document.getElementById("themeToggle");
    let goingDark = toggle.checked;

    if (!fromManual) toggle.checked = goingDark = !toggle.checked || forceDark;

    for (let i = 0; i < rootVars.length; i++) {
        document
            .querySelector(":root")
            .style.setProperty(
                "--" + rootVars[i],
                goingDark ? darkTheme[i] : lightTheme[i]
            );
    }
    for (let i = 0; i < textBasedVars.length; i++) {
        document
            .querySelector(":root")
            .style.setProperty(
                "--" + textBasedVars[i],
                (goingDark ? darkTheme[i] : lightTheme[i])
                    .replace("rgb(", "")
                    .replace(")", "")
            );
    }
}

function manualThemeToggle() {
    switchTheme(true);
    setCookie(USER_THEME_DARK, document.getElementById("themeToggle").checked);
}

// Check for OS preferred theme
if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
)
    switchTheme(false, true);

// Override style based on cookie (if available)
if (checkCookie(USER_THEME_DARK))
    switchTheme(false, getCookie(USER_THEME_DARK) == "true");
