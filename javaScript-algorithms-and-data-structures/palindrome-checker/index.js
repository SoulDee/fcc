function palindrome(str) {
    const pure = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const reverse = pure.split("").reverse().join("");
    return pure === reverse;
}