const User = require("./User");

class Scooter {
  // scooter code here
  constructor(station) {
    this.station = station;
    this.user = null;
    this.charge = 100;
    this.isBroken = false;

    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
  }

  static nextSerial = 1;

  rent(user) {
    if (this.charge < 20 || this.isBroken) {
      throw new Error("scooter needs to charge or scooter needs repair");
    }
    this.user = user;
    this.station = null;
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }

  async recharge() {
    const chargingInterval = setInterval(() => {
      if (this.charge < 100) {
        this.charge += 20;
        console.log(this.charge);
      } else {
        clearInterval(chargingInterval);
      }
    }, 1000);
  }

  async requestRepair() {
    await new Promise((resovle) => setTimeout(resovle, 5000));
    this.isBroken = false;
    console.log("repair completed");
  }
}

module.exports = Scooter;
