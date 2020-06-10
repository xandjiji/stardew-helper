const setTheme = (themes, index) => {
    const {
        background,
        surface,
        onSurface,
        separator,
        primary,
        onPrimary,
        primaryVariant
    } = themes[index];
    
    document.documentElement.style.setProperty("--background", background);
    document.documentElement.style.setProperty("--surface", surface);
    document.documentElement.style.setProperty("--onSurface", onSurface);
    document.documentElement.style.setProperty("--separator", separator);
    document.documentElement.style.setProperty("--primary", primary);
    document.documentElement.style.setProperty("--onPrimary", onPrimary);
    document.documentElement.style.setProperty("--primaryVariant", primaryVariant);

    let addressBar;
    addressBar = document.querySelector('meta[name=theme-color]')
    addressBar.setAttribute('content', primary);

    addressBar = document.querySelector('meta[name=msapplication-navbutton-color]')
    addressBar.setAttribute('content', primary);

    addressBar = document.querySelector('meta[name=apple-mobile-web-app-status-bar-style]')
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
        'yeah !'
    ];

    return messages[Math.floor(Math.random() * messages.length)];
};

export { setTheme, buildClassName, getFloatText }