function headingText() {
  let heading = document.createElement("h1");
  heading.classList.add("heading");
  heading.textContent = `Kryptos`
  heading.style.fontFamily = "Space Mono , monospace";
  heading.style.fontWeight = "700";
  heading.style.fontStyle = "normal";
  heading.style.padding = "3vh 3vw";
  heading.style.fontSize = "3vw"

  document.body.prepend(heading);

}
function subHeading() {
  const subHeading = document.createElement("h3");
  subHeading.classList.add("sub-heading");
  subHeading.textContent = "Safe, Fast, Reliable";
  subHeading.style.fontFamily = "Space Mono , monospace";
  subHeading.style.fontWeight = "300";
  subHeading.style.fontStyle = "normal";
  subHeading.style.padding = "0vh 3vw";
  subHeading.style.fontSize = "1.8vw";
  subHeading.style.marginTop = "-2vh";

  document.body.prepend(subHeading);
}
subHeading();
headingText();

function balanceUi() {
  let balanceUi = document.createElement("div");
  balanceUi.classList.add("balanceUi");

  let bHeading = document.createElement("h1");
  bHeading.classList.add("balance-heading")
  bHeading.textContent = "Total Amount in Wallet";

  balanceUi.appendChild(bHeading);

  let balanceText = document.createElement("h1");
  balanceText.classList.add("balance-Text");
  balanceText.textContent = "0";

  balanceUi.appendChild(balanceText);

  document.querySelector(".wallet-container").prepend(balanceUi);

  return balanceText;
}
const balanceAmount = balanceUi();

let userAmount = document.querySelector("#amount");
let userTitle = document.querySelector("#title");
let transactionType = document.querySelector("#transactionType");
let form = document.querySelector("form");
let btn = document.querySelector("#submit");

transactionType.addEventListener("change", function () {
  if (transactionType.value === "expense") {
    btn.value = "Withdraw Amount";
  }
  else {
    btn.value = "Add Deposit";
  }
})


function day() {
  const now = new Date();

  let fullFormat = now.toLocaleDateString("en-GB", {
    // weekday: "long",
    // day: "numeric",
    // month: "numeric",
    // year: "numeric"
  });

  return fullFormat;
}


const wallet = {
  saveTransactions: function () {
    localStorage.setItem("myTransactions", JSON.stringify(this.transactionData));
  },
  transactionData: JSON.parse(localStorage.getItem(`myTransactions`)) || [],

  transactionId: 0,

  addAmount: function () {
    if (Number(userAmount.value) === 0 || userAmount.value < 0 || userAmount.value === "" || userAmount.value === NaN) {
      alert("Invalid Amount.");
      return;
    }

    if (transactionType.value === "expense") {
      if (Number(userAmount.value) > this.totalAmount() || Number(userAmount.value) < 0) {
        alert("Insufficient Balance");
        return;
      }
    }
    if (this.transactionData.length > 0) {
      this.transactionId = this.transactionData[this.transactionData.length - 1].id;
    }

    this.transactionData.push({
      id: ++this.transactionId,
      amount: Number(userAmount.value),
      title: userTitle.value,
      transactionType: transactionType.value,
      date: day(),

    });

  },

  submitForm: function () {
    form.addEventListener("submit", (data) => {
      data.preventDefault();
      console.log("form submitted", this.transactionData);

      this.addAmount();
      console.log("Amount added successfully");

      form.reset();

      btn.value="Add Deposit";

      this.saveTransactions();
      console.log("data stored to local storage successfully.");

      this.renderUi(balanceAmount);
      console.log("Ui rendered");

      renderTransactions();
    });
  },
  totalAmount: function () {
    return this.transactionData.reduce((total, current) => {

      if (current.transactionType === "deposit") {
        return total + current.amount;
      }
      if (current.transactionType === "expense") {
        return total - current.amount;
      }
      return total;
    }, 0)
  },

  renderUi: function (balanceText) {
    balanceText.textContent = `${this.totalAmount()}`;

    if (this.totalAmount() <= 500) {
      balanceText.style.color = "rgb(201, 14, 14)";
    }
    else if (this.totalAmount() > 500 && this.totalAmount() <= 1000) {
      balanceText.style.color = "rgb(255, 145, 0)";
    }
    else if (this.totalAmount() > 1000) {
      balanceText.style.color = "rgb(154, 247, 33)";
    }
  },
};
wallet.submitForm();
wallet.renderUi(balanceAmount);

function createTransactionCard(transaction) {
  const card = document.createElement("div");
  card.classList.add("transaction-card");

  const title = document.createElement("h3");
  title.classList.add("transaction-title");
  title.textContent = `${transaction.title}`;

  const amount = document.createElement("h1");
  amount.classList.add("transaction-amount");
  amount.textContent = `₹ ${transaction.amount}`;

  const type = document.createElement("span");
  type.classList.add("transaction-type");
  type.textContent = `${transaction.transactionType}`;

  if (transaction.transactionType === "deposit") {
    amount.style.color = "rgb(154, 247, 33)";
    type.style.color = "rgb(154, 247, 33)"
  }
  if (transaction.transactionType === "expense") {
    amount.style.color = "rgb(201, 14, 14)";
    type.style.color = "rgb(201, 14, 14)";
  }

  const date = document.createElement("span");
  date.classList.add("transaction-date");
  date.textContent = `${transaction.date}`;

  card.appendChild(title);
  card.appendChild(amount);
  card.appendChild(type);
  card.appendChild(date);

  return card;
}

function transactionHistoryUi() {
  const history = document.createElement("div");
  history.classList.add("transaction-history");

  const heading = document.createElement("h2");
  heading.textContent = "Transaction History";

  const transactionList = document.createElement("div");
  transactionList.classList.add("transaction-list");

  history.appendChild(heading);
  history.appendChild(transactionList);

  document.body.appendChild(history);

  return transactionList;
}

const transactionList = transactionHistoryUi();

function renderTransactions() {
  transactionList.innerHTML = "";

  wallet.transactionData.forEach((transaction) => {

    const card = createTransactionCard(transaction);

    transactionList.appendChild(card);

  });
}
renderTransactions()

function footer() {
  let footer = document.createElement("h4");
  footer.classList.add("footer");
  footer.textContent = `Kryptos\u00A9 ; 2026 • From Idea to Website By Suman Das`

  document.body.appendChild(footer);
}
footer()
