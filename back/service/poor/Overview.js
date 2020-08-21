const { ServiceBroker } = require("moleculer");
const mongoose = require("mongoose");
const Indicater = require("../../asset/Indicater");

const connection = mongoose.connection;

const OverviweBroker = new ServiceBroker({
  nodeID: "overview-poor-broker",
  logger: true,
  transporter: {
    type: "TCP",
    options: {
      maxPacketSize: 1 * 1024 * 1024,
    },
  },
});

OverviweBroker.createService({
  name: "overview_poor",
  actions: {
    async getOverview(ctx) {
      const { id } = ctx.params;
      const COLLECTION = connection.db.collection(`COUNTRY${id}`);
      const Find = await COLLECTION.find({});
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
  },
});

module.exports = OverviweBroker;
