const { ServiceBroker } = require("moleculer");
const mongoose = require("mongoose");
const Indicater = require("../../asset/Indicater");

console.log(Indicater);

const connection = mongoose.connection;

const ProvinceBroker = new ServiceBroker({
  nodeID: "province-poor-broker",
  logger: true,
  transporter: {
    type: "TCP",
    options: {
      maxPacketSize: 1 * 1024 * 1024,
    },
  },
});

ProvinceBroker.createService({
  name: "province_poor",
  actions: {
    async getProblemProvince() {
      const COLLECTION = connection.db.collection("POOR_PROVINCE");
      const Find = await COLLECTION.find({});
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
    async getOrderProvince(ctx) {
      const { state, ind } = ctx.params;
      const COLLECTION = connection.db.collection("POOR_AMPHUR");
      let key;
      if (parseInt(ind) === 0) {
        key = "poor.JPT.MOFval.CNT";
      } else {
        key = Indicater[ind - 1];
      }
      const Find = await COLLECTION.find({})
        .sort({ [key]: parseInt(state) })
        .limit(10);
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
    async getAllProvince() {
      const COLLECTION = connection.db.collection("POOR_AMPHUR");
      const Find = await COLLECTION.find({});
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
    async getMaxProvince(ctx) {
      const { ind } = ctx.params;
      let key;
      if (parseInt(ind) === 0) {
        key = "poor.JPT.MOFval.CNT";
      } else {
        key = Indicater[ind - 1];
      }
      const COLLECTION = connection.db.collection("POOR_AMPHUR");
      const Find = await COLLECTION.find({})
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

module.exports = ProvinceBroker;
