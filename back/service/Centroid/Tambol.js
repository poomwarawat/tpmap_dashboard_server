const { ServiceBroker } = require("moleculer");
const mongoose = require("mongoose");

const connection = mongoose.connection;

const TambolBroker = new ServiceBroker({
  nodeID: "tambol-centroid-broker",
  logger: true,
  transporter: {
    type: "TCP",
    options: {
      maxPacketSize: 1 * 1024 * 1024,
    },
  },
});

TambolBroker.createService({
  name: "tambol_centroid",
  actions: {
    async getAmphurCentroid(ctx) {
      const { id } = ctx.params;
      console.log(id);
      const COLLECTION = connection.db.collection("CENTROID_AMPHUR");
      const Find = await COLLECTION.find({ "properties.AP_CODE": `${id}` });
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
  },
});

module.exports = TambolBroker;
