function convertToRoman(num) {
    // 罗马数字字符对应表
    const RomanNumCharMap = {
        1000: "M",
        900: "CM",
        500: "D",
        400: "CD",
        100: "C",
        90: "XC",
        50: "L",
        40: "XL",
        10: "X",
        9: "IX",
        5: "V",
        4: "IV",
        1: "I",
    }

    // 罗马数字
    const RomanNums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

    let arr = [];

    for (let i = 0; i < RomanNums.length; i++) {
        const romanNum = RomanNums[i];
        while (num >= romanNum) {
            const char = RomanNumCharMap[romanNum];
            arr.push(char);
            num -= romanNum;
        }
    }

    return arr.join("");
}