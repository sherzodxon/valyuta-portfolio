let useMoney = [];

const body = document.querySelector('body');
const switchWrapper = document.querySelector('.switch-wrapper');
const switchBody = document.querySelector('.switch');
const circle = document.querySelector('.circle');
const button = document.querySelector('.search-button--light')
switchWrapper.addEventListener('click', switchLight);

function switchLight() {
    circle.classList.toggle("turn-on2");
    switchBody.classList.toggle("turn-on1");
    body.classList.toggle("dark");

}

const moneyTemplate = document.querySelector("#money-template");
const moneytableBody = document.querySelector("#moneys-table-body");
const searchForm = document.querySelector(".search-form");

const renderMoney = (moneys) => {
    const {
        Ccy,
        CcyNm_EN,
        CcyNm_RU,
        CcyNm_UZ,
        CcyNm_UZC,
        Code,
        Date,
        Diff,
        Nominal,
        Rate,
        id,
    } = moneys
    const moneyRow = moneyTemplate.content.cloneNode(true);

    moneyRow.querySelector(".money-names").textContent = CcyNm_UZ;
    moneyRow.querySelector(".money-courses").textContent = `${Rate}`;

    const moneyDiff = moneyRow.querySelector(".money-score");
    const moneyScoreSpan = moneyDiff.querySelector("#money-score-span");
    moneyScoreSpan.textContent = Diff;

    if (Diff >= 0) {
        moneyScoreSpan.className = "money-dinf"
    } else {
        moneyScoreSpan.className = "money-inf"
    }
    moneyRow.querySelector(".money-date").textContent = Date;

    return moneyRow;

}

fetch(`https://cors-anywhere.herokuapp.com/cbu.uz/oz/arkhiv-kursov-valyut/json/`, {})
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        useMoney = data;

        const renderMoneys = (money=useMoney) => {
            moneytableBody.innerHTML = "";
            money.forEach(moneys => {
                const moneyRow = renderMoney(moneys);
                moneytableBody.append(moneyRow);
            });
        }
        renderMoneys();
        let showMoney = useMoney.slice();
       
        searchForm.addEventListener("submit", function (evt) {
            evt.preventDefault();
            const elements = evt.target.elements;
            const searchValue = elements.search.value;

            showMoney = useMoney.filter(moneys => {
                const searchRegExp = new RegExp(searchValue, "gi");
                const moneyName = `${moneys.CcyNm_UZ}`;
                return moneyName.match(searchRegExp)
            })

            renderMoneys(showMoney);

        })

    })

// const renderMoneys = (money = moneys) => {
//     moneytableBody.innerHTML = "";
//     money.forEach(moneys => {
//         const moneyRow = renderMoney(moneys);
//         moneytableBody.append(moneyRow);
//     });
// }
// renderMoneys();