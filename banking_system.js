class BaseAccount {
  #saldo = 0; // encapsulation
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


}

// inheritance
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


  // overriding
  updateSaldo(newSaldo) {
    super.updateSaldo(newSaldo);
    this.showSaldo.innerHTML = this.formatter.format(newSaldo);
  }


  disable() {
    this.amountInput.disabled = true;
    this.btnAdd.disabled = true;
    this.btnSub.disabled = true;
    this.loading.classList.remove("hidden");
  }


  reset() {
    this.amountInput.disabled = false;
    this.btnAdd.disabled = false;
    this.btnSub.disabled = false;
    this.loading.classList.add("hidden");
    this.amountInput.value = "";
  }


  async reqWithdraw() {
    try {
      this.disable();
      const jumlah = parseInt(this.amountInput.value);
      let newSaldo = await this.server.withdraw(jumlah);
      this.updateSaldo(newSaldo);
    } catch (message) {
      alert(message);
    } finally {
      this.reset();
    }


  }

  async reqDeposit() {
    try {
      this.disable();
      const jumlah = parseInt(this.amountInput.value);
      let newSaldo = await this.server.deposit(jumlah);
      this.updateSaldo(newSaldo);
    } catch (message) {
      alert(message);
    } finally {
      this.reset();
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

      setTimeout(() => {
        if (isNaN(jumlah) || jumlah <= 0) {
          reject("Masukkan jumlah yang valid!");
          return;
        }
        this.saldo += jumlah;
        this.saveSaldo();
        resolve(this.saldo);
      }, 3000);
    });
  }

  withdraw(jumlah) {
    return new Promise((resolve, reject) => {


      setTimeout(() => {
        if (isNaN(jumlah) || jumlah <= 0) {
          reject("Masukkan jumlah yang valid!");
          return;
        }

        if (jumlah > this.saldo) {
          reject("Saldo Anda tidak cukup!");
          return;
        }
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
