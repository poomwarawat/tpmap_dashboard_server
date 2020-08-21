const { ServiceBroker } = require("moleculer");
const mongoose = require("mongoose");

const connection = mongoose.connection;

const ProvinceBroker = new ServiceBroker({
  nodeID: "province-coordinate-broker",
  logger: true,
  transporter: {
    type: "TCP",
    options: {
      maxPacketSize: 1 * 1024 * 1024,
    },
  },
});

ProvinceBroker.createService({
  name: "province_coordinate",
  actions: {
    start() {
      const name = "Welcome to APIs";
      return name;
    },
    async getAllProvince() {
      const COLLECTION = connection.db.collection("COORDINATE_PROVINCE");
      const Find = await COLLECTION.find({});
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
  },
});

module.exports = ProvinceBroker;
