import Web3 from "web3";
import shortArtifact from "../../build/contracts/ShirleyShorToken.json";

const App = {
  web3: null,
  account: null,
  shorToken: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = shortArtifact.networks[networkId];
      this.shorToken = new web3.eth.Contract(
        shortArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      const userAddressElement = document.getElementById("userAddress");
      userAddressElement.innerHTML = "Your account address: " + this.account;

      const contractAddressElement = document.getElementById("contractAddress");
      contractAddressElement.innerHTML = "Token address: " + deployedNetwork.address;

      this.refreshBalance();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  refreshBalance: async function() {
    const { balanceOf, tokenPrice } = this.shorToken.methods;

    const balance = await balanceOf(this.account).call();
    const price = await tokenPrice().call();
    console.log("price: (wei) " + price);
    const priceEth = price / 3000000000000000000;

    const balanceElement = document.getElementById("balance");
    balanceElement.innerHTML = "Your token balance: " + balance;

    const priceElement = document.getElementById("price");
    priceElement.innerHTML = "Token price is " + priceEth + " ether";
  },

  sendCoin: async function() {
    const amount = parseInt(document.getElementById("amount").value);

    this.setStatus("Purchasing...");

    const { tokenPrice, purchase } = this.shorToken.methods;

    const price = await tokenPrice.call();
    console.log("1 token price price: " + price);
    const payment = price * amount;

    await purchase(amount).send({ from: this.account, value: payment });

    this.setStatus("Transaction complete. Thank you and welcome to tema human");
    this.refreshBalance();
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;
window.addEventListener("load", function() {
  if (window.ethereum) {
     console.log("Using metamask...");
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );
  }

  App.start();
});
