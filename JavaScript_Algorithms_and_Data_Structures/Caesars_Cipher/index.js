function rot13(str) {
    const Key = 13,
        Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        isCharReg = /[A-Za-z]/;

    let decodeCharsArr = [];

    for (let i in str) {
        const char = str[i];
        let decodeChar = char;

        if (isCharReg.test(char)) {
            const index = Letters.indexOf(char);
            decodeChar = (index >= 0 && index < Key)
                ? Letters[Letters.length - (Key - index)]
                : Letters[index - Key];
        }

        decodeCharsArr.push(decodeChar);
    }

    return decodeCharsArr.join("").toUpperCase();
}