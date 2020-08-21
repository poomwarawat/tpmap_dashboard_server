const { ServiceBroker } = require("moleculer");
const mongoose = require("mongoose");

const connection = mongoose.connection;

const AmphurBroker = new ServiceBroker({
  nodeID: "amphur-coordinate-broker",
  logger: true,
  transporter: {
    type: "TCP",
    options: {
      maxPacketSize: 1 * 1024 * 1024,
    },
  },
});

AmphurBroker.createService({
  name: "amphur_coordinate",
  actions: {
    start() {
      const name = "Welcome to APIs";
      return name;
    },
    async getProvince(ctx) {
      const { id } = ctx.params;
      const COLLECTION = connection.db.collection("COORDINATE_AMPHUR");
      const Find = await COLLECTION.find({ "properties.PV_CODE": `${id}` });
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
  },
});

module.exports = AmphurBroker;
