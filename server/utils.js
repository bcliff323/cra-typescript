const generateRandomPassword = (lowerCaseAndNumbers, specials, upperCase) => {
    var chars = [
        '0123456789abcdefghijklmnopqrstuvwxyz', // letters
        '$%#@!^&*()[]{}?<>', // numbers
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // either
    ];

    return [lowerCaseAndNumbers, specials, upperCase]
        .map(function(len, i) {
            return Array(len)
                .fill(chars[i])
                .map(function(x) {
                    return x[Math.floor(Math.random() * x.length)];
                })
                .join('');
        })
        .concat()
        .join('')
        .split('')
        .sort(function() {
            return 0.5 - Math.random();
        })
        .join('');
};

const info = text => console.log(chalk.green(text));
const warn = text => console.log(chalk.red(text));

module.exports = {
    generateRandomPassword: generateRandomPassword,
    info: info,
    warn: warn
};
