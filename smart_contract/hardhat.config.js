require("@nomiclabs/hardhat-ethers");

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: '0.8.0',
   defaultNetwork: 'goerli',
   networks: {
      goerli: {
         url: 'https://eth-goerli.g.alchemy.com/v2/OkwLA85nlrAE5283VPEZ9IdOgIkRoVsS',
         accounts: ['0xcd47d28a2a4cfb4a1e30307ed85eb82b77e301948022627cdcd1c2e496cb2602'],
      }
   }
};