const balance = (balance) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(balance);
}

module.exports = balance