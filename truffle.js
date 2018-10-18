// var HDWalletProvider = require("truffle-hdwallet-provider");
// var mnemonic = "advance buddy clutch produce photo like night spider awkward token oyster permit pair sample recall"
// module.exports = {
//   networks: {
//     ropsten: {
//       provider: function() {
//         return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/e00dbbda54754551aebe54f1d4c353da")
//       },
//       network_id: 3
//     }
//   }
// };

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    }
  }
};
