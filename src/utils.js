const buildClassName = (name) => {
    name = name.replace(/'/g, "");
    name = name.replace(/,/g, "");
    name = name.replace(/:/g, "");
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

export { buildClassName, getFloatText }