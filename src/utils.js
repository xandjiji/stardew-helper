const setTheme = (themes, index) => {
    let currentTheme = themes[index];
    const { primary } = currentTheme;

    for (const colorItem of Object.keys(currentTheme)) {
        document.documentElement.style.setProperty(`--${colorItem}`, currentTheme[colorItem]);
    }

    let addressBar;
    addressBar = document.querySelector('meta[name=theme-color]')
    addressBar.setAttribute('content', primary);

    addressBar = document.querySelector('meta[name=msapplication-navbutton-color]')
    addressBar.setAttribute('content', primary);
}

const buildClassName = (name) => {
    name = name.replace(/'/g, "");
    name = name.replace(/,/g, "");
    name = name.replace(/:/g, "");
    name = name.replace(/\?/g, "");
    name = name.replace(/ /g, "_");
    name = name.replace(/-/g, "_");
    name = name.replace(/\./g, "_");
    name = name.replace(/\(/g, "_");
    name = name.replace(/\)/g, "_");

    return `bg-${name}`;
}

const getFloatText = () => {
    let messages = [
        'amazing !',
        'great !',
        'cool !',
        'perfect !',
        'nice !',
        'noice !',
        'wow !',
        'yeah !',
        'super !'
    ];

    return messages[Math.floor(Math.random() * messages.length)];
};

export { setTheme, buildClassName, getFloatText }