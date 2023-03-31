const codeList = [
    { id: "palindrome-checker", func: palindrome },
    { id: "roman-numeral-converter", func: convertToRoman },
    { id: "caesars-cipher", func: rot13 },
    { id: "telephone-number-validator", func: telephoneCheck },
    { id: "cash-register", func: checkCashRegister },
]

for (let i = 0; i < codeList.length; i++) {
    const element = document.getElementById(codeList[i].id);
    element.innerText = codeList[i].func.toString();
}