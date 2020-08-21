const { ServiceBroker } = require("moleculer");
const mongoose = require("mongoose");
const Indicater = require("../../asset/Indicater");

const connection = mongoose.connection;

const AmphurBroker = new ServiceBroker({
  nodeID: "amphur-poor-broker",
  logger: true,
  transporter: {
    type: "TCP",
    options: {
      maxPacketSize: 1 * 1024 * 1024,
    },
  },
});

AmphurBroker.createService({
  name: "amphur_poor",
  actions: {
    async getProblemAmphur(ctx) {
      const { id } = ctx.params;
      const COLLECTION = connection.db.collection("POOR_AMPHUR");
      const Find = await COLLECTION.find({ province_ID: `${id}` });
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
    async getOrderAmphur(ctx) {
      const { id, state, ind } = ctx.params;
      let key;
      if (parseInt(ind) === 0) {
        key = "poor.JPT.MOFval.CNT";
      } else {
        key = Indicater[ind - 1];
      }
      const COLLECTION = connection.db.collection("POOR_TAMBOL");
      const Find = await COLLECTION.find({ province_ID: `${id}` })
        .sort({ [key]: parseInt(state) })
        .limit(10);
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
    async getAmphur(ctx) {
      const { id } = ctx.params;
      const COLLECTION = connection.db.collection("POOR_TAMBOL");
      const Find = await COLLECTION.find({ province_ID: `${id}` });
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
    async getMaxAmphur(ctx) {
      const { id, ind } = ctx.params;
      if (parseInt(ind) === 0) {
        key = "poor.JPT.MOFval.CNT";
      } else {
        key = Indicater[ind - 1];
      }
      const COLLECTION = connection.db.collection("POOR_TAMBOL");
      const Find = await COLLECTION.find({ province_ID: `${id}` })
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

module.exports = AmphurBroker;
