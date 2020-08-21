const { ServiceBroker } = require("moleculer");
const mongoose = require("mongoose");

const connection = mongoose.connection;

const TambolBroker = new ServiceBroker({
  nodeID: "tambol-coordinate-broker",
  logger: true,
  transporter: {
    type: "TCP",
    options: {
      maxPacketSize: 1 * 1024 * 1024,
    },
  },
});

TambolBroker.createService({
  name: "tambol_coordinate",
  actions: {
    start() {
      const name = "Welcome to APIs";
      return name;
    },
    async getAmphur(ctx) {
      const { id } = ctx.params;
      const P_CODE = `${id[0]}${id[1]}`;
      const A_CODE = `${id[2]}${id[3]}`;
      const COLLECTION = connection.db.collection("COORDINATE_TAMBOL");
      const Find = await COLLECTION.find({
        "properties.P_CODE": `${P_CODE}`,
        "properties.A_CODE": `${A_CODE}`,
      });
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
    async getTambol(ctx) {
      const { id } = ctx.params;
      const P_CODE = `${id[0]}${id[1]}`;
      const A_CODE = `${id[2]}${id[3]}`;
      const T_CODE = `${id[4]}${id[5]}`;
      const COLLECTION = connection.db.collection("COORDINATE_TAMBOL");
      const Find = await COLLECTION.find({
        "properties.P_CODE": `${P_CODE}`,
        "properties.A_CODE": `${A_CODE}`,
        "properties.T_CODE": `${T_CODE}`,
      });
      const Data = await Find.toArray();
      if (Data.length === 0) {
        return [{ errmsg: "404 not found data" }];
      }
      return Data;
    },
  },
});

module.exports = TambolBroker;
