require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url:
        process.env.QUICKNODE_API_KEY_URL ||
        "https://practical-withered-fire.matic-testnet.discover.quiknode.pro/5b66fac556af7cb58bfd8b1e6827ace7e6b6ee41/",
      //gasPrice: 2500000000,
      accounts:
        ["533746b20bf76abd75a22441ccc27b9e86227f8667d88af45e613b4e3405b6a4"] ||
        " ",
    },
    goerli: {
      url:
        process.env.QUICKNODE_API_KEY_URL ||
        "https://quiet-red-dew.ethereum-goerli.discover.quiknode.pro/346f2b06ce6744f26b38d83dbf237c509367009e/ ",
      accounts:
        ["533746b20bf76abd75a22441ccc27b9e86227f8667d88af45e613b4e3405b6a4"] ||
        " ",
    },
  },
};
