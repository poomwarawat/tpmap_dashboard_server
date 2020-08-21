const { ServiceBroker } = require("moleculer");
const HTTPServer = require("moleculer-web");
const db = require("./connection");
const dotenv = require("dotenv");

dotenv.config();

const StartBroker = new ServiceBroker({
  nodeID: "start",
  transporter: {
    type: "TCP",
    options: {
      maxPacketSize: 50 * 1024 * 1024,
    },
  },
});

StartBroker.createService({
  name: "gateway",
  mixins: [HTTPServer],
  settings: {
    port: process.env.PORT || 8080,
    cors: {
      origin: "*",
      methods: ["GET"],
      allowedHeaders: [],
      exposedHeaders: [],
      credentials: false,
      maxAge: 3600,
    },
    routes: [
      {
        aliases: {
          "GET /": "province_coordinate.start",
          "GET /centroid/amphur/:id": "province_centroid.getProvinceCentroid",
          "GET /centroid/tambol/:id": "tambol_centroid.getAmphurCentroid",
          "GET /centroid/village/:id": "village_centroid.getTambolCentroid",
          "GET /coordinate/province": "province_coordinate.getAllProvince",
          "GET /coordinate/amphur/:id": "amphur_coordinate.getProvince",
          "GET /coordinate/tambol/:id": "tambol_coordinate.getAmphur",
          "GET /coordinate/village/:id": "tambol_coordinate.getTambol",
          "GET /poor/problem/province": "province_poor.getProblemProvince",
          "GET /poor/order/province": "province_poor.getOrderProvince",
          "GET /poor/province": "province_poor.getAllProvince",
          "GET /poor/max/province": "province_poor.getMaxProvince",
          "GET /poor/problem/amphur/:id": "amphur_poor.getProblemAmphur",
          "GET /poor/order/amphur/:id": "amphur_poor.getOrderAmphur",
          "GET /poor/amphur/:id": "amphur_poor.getAmphur",
          "GET /poor/max/amphur/:id": "amphur_poor.getMaxAmphur",
          "GET /poor/problem/tambol/:id": "tambol_poor.getProblemTambol",
          "GET /poor/order/tambol/:id": "tambol_poor.getOrderTambol",
          "GET /poor/tambol/:id": "tambol_poor.getTambol",
          "GET /poor/max/tambol/:id": "tambol_poor.getMaxTambol",
          "GET /poor/problem/village/:id": "village_poor.getProblemVillage",
          "GET /poor/order/village/:id": "village_poor.getOrderVillage",
          "GET /poor/village/:id": "village_poor.getVillage",
          "GET /poor/max/village/:id": "village_poor.getMaxVillage",
          "GET /poor/country/:id": "overview_poor.getOverview",
          "GET /marker/province": "province_marker.getAllMarker",
          "GET /marker/amphur/:id": "amphur_marker.getAllMarker",
        },
      },
    ],
  },
});

const Province_Centroid = require("./service/Centroid/Amphur");
const Amphur_Centroid = require("./service/Centroid/Tambol");
const Tambol_Centroid = require("./service/Centroid/Village");
const Province_Coordinate = require("./service/coordinate/Province");
const Amphur_Coordinate = require("./service/coordinate/Amphur");
const Tambol_Coordinate = require("./service/coordinate/Tambol");
const Province_Poor = require("./service/poor/Province");
const Amphur_Poor = require("./service/poor/Amphur");
const Tambol_Poor = require("./service/poor/Tambol");
const Village_Poor = require("./service/poor/Village");
const Overview_Poor = require("./service/poor/Overview");
const Country_Marker = require("./service/Marker/Country");
const Amphur_Marker = require("./service/Marker/Province");

Promise.all([
  Province_Centroid.start(),
  Amphur_Centroid.start(),
  Tambol_Centroid.start(),
  StartBroker.start(),
  Province_Coordinate.start(),
  Amphur_Coordinate.start(),
  Tambol_Coordinate.start(),
  Province_Poor.start(),
  Amphur_Poor.start(),
  Tambol_Poor.start(),
  Village_Poor.start(),
  Overview_Poor.start(),
  Country_Marker.start(),
  Amphur_Marker.start(),
]);
