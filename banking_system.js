class BankAccount {
  constructor() {
    if (!localStorage.getItem("saldo")) {
      localStorage.setItem("saldo", 0);
    }

    this.saldo = parseInt(localStorage.getItem("saldo"))
    this.btnAdd = document.getElementById("btn-add");
    this.btnSub = document.getElementById("btn-subtract");
    this.showSaldo = document.getElementById("show-saldo");

    this.formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2
    });

    this.updateSaldo();
    this.btnAdd.addEventListener("click", () => this.requestTambahSaldo());
    this.btnSub.addEventListener("click", () => this.requestKurangiSaldo());
  }

  tambahSaldo(jumlah) {

    return new Promise((resolve, reject) => {
      if (isNaN(jumlah) || jumlah <= 0) {
        reject("Masukkan jumlah yang valid!");
        return;
      }

      // simulates a network request
      setTimeout(() => {
        this.saldo += jumlah;
        this.updateSaldo();
        resolve();
      }, 3000);
    });



  }

  kurangiSaldo(jumlah) {
    return new Promise((resolve, reject) => {
      if (isNaN(jumlah) || jumlah <= 0) {
        reject("Masukkan jumlah yang valid!");
        return;
      }

      if (jumlah > this.saldo) {
        reject("Saldo Anda tidak cukup!");
        return;
      }

      // simulates a network request
      setTimeout(() => {
        this.saldo -= jumlah;
        this.updateSaldo();
        resolve();
      }, 3000);
    });
  }

  async requestKurangiSaldo() {
    try {
      const jumlah = parseInt(window.prompt("Masukkan jumlah saldo yang ingin dikurangkan:"));
      await this.kurangiSaldo(jumlah);
      alert("Saldo berhasil dikurangkan!");
    } catch (message) {
      alert(message);
    }


  }

  async requestTambahSaldo() {
    try {
      const jumlah = parseInt(window.prompt("Masukkan jumlah saldo yang ingin ditambahkan:"));
      await this.tambahSaldo(jumlah);
      alert("Saldo berhasil ditambahkan!");
    } catch (message) {
      alert(message);
    }
  }

  updateSaldo() {

    this.showSaldo.innerHTML = this.formatter.format(this.saldo);
    localStorage.setItem("saldo", this.saldo);
  }
}


const bankAccount = new BankAccount();