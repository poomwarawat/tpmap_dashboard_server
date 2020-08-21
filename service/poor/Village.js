const { ServiceBroker } = require("moleculer");
const mongoose = require("mongoose");
const Indicater = require("../../asset/Indicater");

const connection = mongoose.connection;

const VillageBroker = new ServiceBroker({
  nodeID: "village-poor-broker",
  logger: true,
  transporter: {
    type: "TCP",
    options: {
      maxPacketSize: 1 * 1024 * 1024,
    },
  },
});

VillageBroker.createService({
  name: "village_poor",
  actions: {
    async getProblemVillage(ctx) {
      const { id } = ctx.params;
      const COLLECTION = connection.db.collection("POOR_VILLAGE");
      const Find = await COLLECTION.find({ tambol_ID: `${id}` });
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
    async getOrderVillage(ctx) {
      const { id, state, ind } = ctx.params;
      const COLLECTION = connection.db.collection("POOR_ALL_VILLAGE");
      let key;
      if (parseInt(ind) === 0) {
        key = "poor.JPT.MOFval.CNT";
      } else {
        key = Indicater[ind - 1];
      }
      const Find = await COLLECTION.find({ tambol_ID: `${id}` })
        .sort({ [key]: parseInt(state) })
        .limit(10);
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
    async getVillage(ctx) {
      const { id } = ctx.params;
      const COLLECTION = connection.db.collection("POOR_ALL_VILLAGE");
      const Find = await COLLECTION.find({ tambol_ID: `${id}` });
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
    async getMaxVillage(ctx) {
      const { id, ind } = ctx.params;
      let key;
      if (parseInt(ind) === 0) {
        key = "poor.JPT.MOFval.CNT";
      } else {
        key = Indicater[ind - 1];
      }
      const COLLECTION = connection.db.collection("POOR_ALL_VILLAGE");
      const Find = await COLLECTION.find({ tambol_ID: `${id}` })
        .sort({ [key]: -1 })
        .limit(1);
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
  },
});

module.exports = VillageBroker;
