const { ServiceBroker } = require("moleculer");
const mongoose = require("mongoose");

const connection = mongoose.connection;

const VillageBroker = new ServiceBroker({
  nodeID: "village-centroid-broker",
  logger: true,
  transporter: {
    type: "TCP",
    options: {
      maxPacketSize: 1 * 1024 * 1024,
    },
  },
});

VillageBroker.createService({
  name: "village_centroid",
  actions: {
    async getTambolCentroid(ctx) {
      const { id } = ctx.params;
      console.log(id, "here");
      const COLLECTION = connection.db.collection("CENTROID_TAMBOL");
      const Find = await COLLECTION.find({ "properties.TB_CODE": `${id}` });
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
  },
});

module.exports = VillageBroker;
