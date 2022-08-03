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

const hamburger = document.querySelector('.hamburger-button')
const modal = document.querySelector('.modal');
const bodyTwo = document.querySelector('body') ? document.querySelector('body') : document.querySelector(".dark")

hamburger.addEventListener('click', function () {
    modal.classList.toggle('modal--opened');
    bodyTwo.classList.toggle('body-hidden')
})
modal.addEventListener('click', function (evt) {
    if (evt.target.matches('.modal--opened')) {
        modal.classList.remove("modal--opened")
        bodyTwo.classList.remove("body-hidden")
    }
})

const moneyTemplate = document.querySelector("#normal-scroll-items");
const moneytableBody = document.querySelector("#moneys-table-body");
const searchForm = document.querySelector(".search-form");
const historyForm = document.querySelector('#history-form');

const radioExpensive = document.querySelector('.expensive');
const radioUnExpensive = document.querySelector('.unexpensive');
const radioAz = document.querySelector('.label-a-z');
const radioZa = document.querySelector('.label-z-a')

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
    moneyRow.querySelector(".money-date").textContent = Ccy;

    return moneyRow;

}

fetch(`https://cors-anywhere.herokuapp.com/cbu.uz/oz/arkhiv-kursov-valyut/json`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {

        useMoney = data;

        const renderMoneys = (money = useMoney) => {
            moneytableBody.innerHTML = "";
            money.forEach(moneys => {
                const moneyRow = renderMoney(moneys);
                moneytableBody.append(moneyRow);
            });
        }
        renderMoneys();
        let showMoney = useMoney.slice();
        
        const dateText =document.querySelector(".date-text");
        dateText.textContent=useMoney[0].Date

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

        historyForm.addEventListener('submit', function (evt) {
            evt.preventDefault();
            const elements = evt.target.elements;
            const dateValue = elements.date.value;
            const codeValue = elements.code.value;

            fetch(`https://cors-anywhere.herokuapp.com/cbu.uz/oz/arkhiv-kursov-valyut/json/${codeValue}/${dateValue}/`)
                .then(response => response.json())
                .then(data => {
                    showMoney = data

                    modal.classList.toggle('modal--opened')
                    renderMoneys(showMoney);

                })

        })

        let value = 0;

        radioExpensive.addEventListener('click', function (evt) {
            if (evt.target.matches('.expensive')) {
                value = 1;
                showMoney = useMoney
                    .sort(function (a, b) {
                        switch (value) {
                            case 1:
                                return b.Rate - a.Rate

                            default:
                                break;
                        }

                    })
                renderMoneys(showMoney)
            }
        })
        radioUnExpensive.addEventListener('click', function (evt) {
            if (evt.target.matches('.unexpensive')) {
                value = 2

                showMoney = useMoney
                    .sort(function (a, b) {
                        switch (value) {
                            case 2:
                                return a.Rate - b.Rate

                            default:
                                break;
                        }

                    })
                renderMoneys(showMoney)
            }
        })
        radioAz.addEventListener('click', function (evt) {
            if (evt.target.matches('.label-a-z')) {
                value = 3

                showMoney = useMoney
                    .sort(function (a, b) {
                        switch (value) {
                            case 3:
                                if (a.CcyNm_UZ > b.CcyNm_UZ) {
                                    return 1
                                } else if (a.CcyNm_UZ < b.CcyNm_UZ) {
                                    return -1
                                } else {
                                    return 0
                                }
                                default:
                                    break;
                        }

                    })
                renderMoneys(showMoney)
            }
        })
        radioZa.addEventListener('click', function (evt) {
            if (evt.target.matches('.label-z-a')) {
                value = 4

                showMoney = useMoney
                    .sort(function (a, b) {
                        switch (value) {
                            case 4:
                                if (b.CcyNm_UZ > a.CcyNm_UZ) {
                                    return 1
                                } else if (b.CcyNm_UZ < a.CcyNm_UZ) {
                                    return -1
                                } else {
                                    return 0
                                }
                                default:
                                    break;
                        }

                    })
                renderMoneys(showMoney)
            }
        })

    })

// const renderMoneys = (money = moneys) => {
//     moneytableBody.innerHTML = "";
//     money.forEach(moneys => {
//         const moneyRow = renderMoney(moneys);
//         moneytableBody.append(moneyRow);
//     });
// }
// const date =document.querySelector(".date-text");
// date.textContent=moneys[0].Date

// renderMoneys();