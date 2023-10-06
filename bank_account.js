class SaldoManager {
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
    this.btnAdd.addEventListener("click", () => this.tambahSaldo());
    this.btnSub.addEventListener("click", () => this.kurangiSaldo());
  }

  tambahSaldo() {
    const jumlah = parseInt(window.prompt("Masukkan jumlah saldo yang ingin ditambahkan:"));

    if (isNaN(jumlah) || jumlah <= 0) {
      alert("Masukkan jumlah yang valid!");
      return;
    }

    this.saldo += jumlah;
    this.updateSaldo();
  }

  kurangiSaldo() {
    const jumlah = parseInt(window.prompt("Masukkan jumlah saldo yang ingin dikurangkan:"));

    if (isNaN(jumlah) || jumlah <= 0) {
      alert("Masukkan jumlah yang valid!");
      return;
    }

    if (jumlah > this.saldo) {
      alert("Saldo Anda tidak cukup!");
      return;
    }

    this.saldo -= jumlah;
    this.updateSaldo();
  }

  updateSaldo() {

    this.showSaldo.innerHTML = this.formatter.format(this.saldo);
    localStorage.setItem("saldo", this.saldo);
  }
}

const saldoManager = new SaldoManager();
