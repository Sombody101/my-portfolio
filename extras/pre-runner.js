/*
'pre-runner.js' is meant for functionality that needs to occur before elements have loaded.
Keeping theme presets here makes it so people aren't being flashed by a white light and then everything going dark.
*/

const lightTheme = [
    "rgb(0, 123, 255)",
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
    "rgb(0, 86, 179)",
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

function switchTheme(goingDark = true) {
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
    const toggle = document.getElementById("themeToggle");
    switchTheme(toggle.checked);
}

if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
)
    switchTheme();
