function checkCashRegister(price, cash, cid) {
    const Units = [
        { name: "TWENTY", amount: 20 },
        { name: "TEN", amount: 10 },
        { name: "FIVE", amount: 5 },
        { name: "ONE", amount: 1 },
        { name: "QUARTER", amount: 0.25 },
        { name: "DIME", amount: 0.1 },
        { name: "NICKEL", amount: 0.05 },
        { name: "PENNY", amount: 0.01 },
    ];
    
    // 处理 JavaScript 中的浮点数计算问题 0.1 + 0.2 = 0.30000000000000004
    const format = (amout) => parseFloat(amout.toFixed(2));
    
    let diff = cash - price,
        change = [],
        cidMap = {},
        total = 0;

    cid.forEach(item => {
        const [name, amount] = item;
        cidMap[name] = amount;
        total += amount;
    });

    for (let i = 0; i < Units.length; i++) {
        const { name, amount } = Units[i];

        let sum = 0;

        while (diff > 0 && cidMap[name] > 0 && diff >= amount) {
            diff = format(diff - amount);
            cidMap[name] = format(cidMap[name] - amount);
            sum = format(sum + amount);
            total = format(total - amount);
        }

        if (sum !== 0) {
            change.push([name, sum]);
        }
    }

    return (diff > 0)
        ? { status: "INSUFFICIENT_FUNDS", change: [] }
        : (total > 0)
            ? { status: "OPEN", change }
            : { status: "CLOSED", change: [...cid] };
}