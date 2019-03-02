/** current money */
let money = 0;
/** stuff we bought */
const moneyMakers: MoneyMaker[] = [];

const availableMoneyMakers: { amount: number, delay: number, name: string, cost: number }[] = [
    { amount: 1, delay: 1000, name: "Dollar Printer", cost: 1 },
    { amount: 5, delay: 1000, name: "Fiver Printer", cost: 50 },
    { amount: 4, delay: 750, name: "Is this broken", cost: 50 },
    { amount: 50, delay: 1000, name: "El Fifty", cost: 500 },
    { amount: 100, delay: 1000, name: "💯💯💯", cost: 2000 },
    { amount: 50, delay: 500, name: "Super Moit Moit", cost: 2000 },
    { amount: 9999, delay: 500, name: "OVER 9000", cost: 100000 },
]
setTimeout(() => {
    const purchaseEl = document.getElementById("purchase");

    if (purchaseEl) {
        let html = "";
        availableMoneyMakers.forEach((amoneymaker, i) => {
            html += `<button class="buyer" xid='${i}' disabled><strong>${amoneymaker.name}</strong> (${amoneymaker.amount} every ${amoneymaker.delay / 1000}s) [${amoneymaker.cost}€]</button>`
        });
        purchaseEl.innerHTML = html;

        moneyMakers.push(new MoneyMaker(1, 1000, "", 0));
    }

    const clickEl = document.getElementById("click");

    if (clickEl) {
        let html = "";
        availableMoneyMakers.forEach((amoneymaker, i) => {
            html += `<button class="clicker" xid='${i}' disabled><strong>${amoneymaker.name}</strong> ${amoneymaker.amount}</button>`
        });
        clickEl.innerHTML = html;
    }

    const buyersButton = document.getElementsByClassName('buyer');
    for (let i = 0; i < buyersButton.length; i++) {
        const button = buyersButton.item(i);
        if (button) {
            button.addEventListener("click", () => {
                const moneyM = availableMoneyMakers[Number(button.getAttribute('xid'))];
                if (money >= moneyM.cost) {
                    money -= moneyM.cost;
                    moneyMakers.push(new MoneyMaker(moneyM.amount, moneyM.delay, moneyM.name, moneyM.cost))
                }
            })
        }
    }

    const clickerButton = document.getElementsByClassName('clicker');
    for (let i = 0; i < clickerButton.length; i++) {
        const button = clickerButton.item(i);

        if (button) {
            button.addEventListener("click", () => {
                const moneyM = availableMoneyMakers[Number(button.getAttribute('xid'))];
                money += moneyM.amount;
            })
        }
    }
})

/**
 * Main "game" loop
 */
setInterval(() => {

    const moneyEl = document.getElementById("money");
    // Update our current money count
    if (moneyEl) {
        moneyEl.innerText = `${money} EUR`
    }

    const moneyMakersEl = document.getElementById("moneyMakersEl");
    // Update our current money makers
    if (moneyMakersEl) {
        let html = "";
        moneyMakers.forEach((moneyMaker) => {
            html += `<li><strong>${moneyMaker.name}</strong> ( ${moneyMaker.amount} every ${moneyMaker.delay / 1000}s ) </li>`
        });

        moneyMakersEl.innerHTML = html;
    }

    const buttons = document.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons.item(i);
        if (button) {
            const moneyM = availableMoneyMakers[Number(button.getAttribute('xid'))];
            if (button.className.indexOf("clicker") > -1) {
                if (moneyMakers.find((mm) => mm.name === moneyM.name || moneyM.name === "")) {
                    button.disabled = false;
                } else { button.disabled = true; }
            } else {
                if (money >= moneyM.cost) { button.disabled = false }
                else { button.disabled = true }
            }
        }
    }

}, 32);

/**
 * something that makes money
 */
class MoneyMaker {
    /**
     * @param amount amount of money this makes
     * @param delay delay in ms to get the money
     */
    constructor(public readonly amount: number = 1, public readonly delay: number = 1000, public readonly name: string = "MoneyMaker", public readonly cost = 1) {
        setInterval(() => {
            money += this.amount;
        }, this.delay)
    }
}

function MoneyMakerClassFactory(numberOfClasses: number = 6) {
    const classes = [];

    for (let i = 0; i < numberOfClasses; i++) {
        classes.push(class extends MoneyMaker { })
    }
}