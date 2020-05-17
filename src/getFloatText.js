const getFloatText = () => {
    let messages = [
        'amazing!',
        'great!',
        'cool!',
        'perfect!',
        'nice!',
        'noice!',
        'wow!'
    ];

    return messages[Math.floor(Math.random() * messages.length)];
};

export default getFloatText;