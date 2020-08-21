const { ServiceBroker } = require("moleculer");
const mongoose = require("mongoose");

const connection = mongoose.connection;

const MarkerBroker = new ServiceBroker({
  nodeID: "tambol-marker-broker",
  logger: true,
  transporter: {
    type: "TCP",
    options: {
      maxPacketSize: 1 * 1024 * 1024,
    },
  },
});

MarkerBroker.createService({
  name: "tambol_marker",
  actions: {
    async getAllMarker(ctx) {
      const { id } = ctx.params;
      console.log(id);
      const COLLECTION = connection.db.collection("MARKER");
      const Find = await COLLECTION.find({
        "properties.amphur_ID": parseInt(id),
      });
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
  },
});

module.exports = MarkerBroker;
