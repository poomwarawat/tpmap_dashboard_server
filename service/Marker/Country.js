const { ServiceBroker } = require("moleculer");
const mongoose = require("mongoose");

const connection = mongoose.connection;

const MarkerBroker = new ServiceBroker({
  nodeID: "country-marker-broker",
  logger: true,
  transporter: {
    type: "TCP",
    options: {
      maxPacketSize: 1 * 1024 * 1024,
    },
  },
});

MarkerBroker.createService({
  name: "province_marker",
  actions: {
    async getAllMarker(ctx) {
      console.log("start");
      const COLLECTION = connection.db.collection("MARKER");
      const Find = await COLLECTION.aggregate([
        { $group: { _id: "$properties.province_ID", count: { $sum: 1 } } },
      ]);
      const Data = await Find.toArray();
      console.log(Data);
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
  },
});

module.exports = MarkerBroker;
