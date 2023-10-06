class BaseAccount {
  #saldo = 0; 
  constructor(server) {
    this.server = server;
  }

  async init() {
    this.#saldo = await this.server.getSaldo();
    this.updateSaldo(this.#saldo);
  }

  updateSaldo(newSaldo) {
    console.log(`Updated saldo: ${newSaldo}`);
  }

  // To be overridden by subclasses to showcase polymorphism
  accountType() {
    console.log('Base account type');
  }
}

class BankAccount extends BaseAccount {
  constructor(server) {
    super(server);

    this.btnAdd = document.getElementById("btn-add");
    this.btnSub = document.getElementById("btn-subtract");
    this.showSaldo = document.getElementById("show-saldo");
    this.amountInput = document.getElementById("amount-input");
    this.loading = document.getElementById("loading");

    this.formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2
    });

    this.btnAdd.addEventListener("click", () => this.reqDeposit());
    this.btnSub.addEventListener("click", () => this.reqWithdraw());
  }

  updateSaldo(newSaldo) {
    super.updateSaldo(newSaldo); // Calling the base class method
    this.showSaldo.innerHTML = this.formatter.format(newSaldo);
    // reset the amount input
    this.amountInput.value = "";
  }


  disable() {
    this.amountInput.disabled = true;
    this.btnAdd.disabled = true;
    this.btnSub.disabled = true;
    // show loading
    this.loading.classList.remove("hidden");
  }


  enable() {
    this.amountInput.disabled = false;
    this.btnAdd.disabled = false;
    this.btnSub.disabled = false;
    // hide loading
    this.loading.classList.add("hidden");
  }


  async reqWithdraw() {
    try {
      this.disable();
      const jumlah = parseInt(this.amountInput.value);
      let newSaldo = await this.server.withdraw(jumlah);
      this.updateSaldo(newSaldo);
      this.enable();
    } catch (message) {
      alert(message);
    }


  }

  async reqDeposit() {
    try {
      this.disable();
      const jumlah = parseInt(this.amountInput.value);
      let newSaldo = await this.server.deposit(jumlah);
      this.updateSaldo(newSaldo);
      this.enable();
    } catch (message) {
      alert(message);
    }
  }
}

class Server {
  constructor() {
    if (!localStorage.getItem("saldo")) {
      localStorage.setItem("saldo", 0);
    }

    this.saldo = parseInt(localStorage.getItem("saldo"))
  }

  deposit(jumlah) {
    return new Promise((resolve, reject) => {
      if (isNaN(jumlah) || jumlah <= 0) {
        reject("Masukkan jumlah yang valid!");
        return;
      }
      setTimeout(() => {
        this.saldo += jumlah;
        this.saveSaldo();
        resolve(this.saldo);
      }, 3000);
    });
  }

  withdraw(jumlah) {
    return new Promise((resolve, reject) => {
      if (isNaN(jumlah) || jumlah <= 0) {
        reject("Masukkan jumlah yang valid!");
        return;
      }

      if (jumlah > this.saldo) {
        reject("Saldo Anda tidak cukup!");
        return;
      }

      setTimeout(() => {
        this.saldo -= jumlah;
        this.saveSaldo();
        resolve(this.saldo);
      }, 3000);
    });
  }

  getSaldo() {
    console.log("getSaldo");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.saldo);
      }, 1200);
    });
  }


  saveSaldo() {
    localStorage.setItem("saldo", this.saldo);
  }
}

const server = new Server();
const bankAccount = new BankAccount(server);
bankAccount.init();
