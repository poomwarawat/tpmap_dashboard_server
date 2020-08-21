const { ServiceBroker } = require("moleculer");
const mongoose = require("mongoose");

const connection = mongoose.connection;

const ProvinceBroker = new ServiceBroker({
  nodeID: "province-centroid-broker",
  logger: true,
  transporter: {
    type: "TCP",
    options: {
      maxPacketSize: 1 * 1024 * 1024,
    },
  },
});

ProvinceBroker.createService({
  name: "province_centroid",
  actions: {
    async getProvinceCentroid(ctx) {
      const { id } = ctx.params;
      const COLLECTION = connection.db.collection("CENTROID_PROVINCE");
      const Find = await COLLECTION.find({ "properties.PV_CODE": `${id}` });
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
  },
});

module.exports = ProvinceBroker;
