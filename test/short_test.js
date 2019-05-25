/*
 ____  _     _      _              ____  _
/ ___|| |__ (_)_ __| | ___ _   _  / ___|| |__   ___  _ __
\___ \| '_ \| | '__| |/ _ \ | | | \___ \| '_ \ / _ \| '__|
 ___) | | | | | |  | |  __/ |_| |  ___) | | | | (_) | |
|____/|_| |_|_|_|  |_|\___|\__, | |____/|_| |_|\___/|_|
    _         _     _____  |___/
   / \   _ __| |_  |_   _|__ | | _____ _ __
  / _ \ | '__| __|   | |/ _ \| |/ / _ \ '_ \
 / ___ \| |  | |_    | | (_) |   <  __/ | | |
/_/   \_\_|   \__|   |_|\___/|_|\_\___|_| |_|

Shirley Shor * Art Token * Smart Contact * Team Human
*/

const Token = artifacts.require("ShirleyShorToken");
const log = console.log;
const tokenSupply = 3500;

contract("ShirleyShorToken", async accounts => {

 it("Sign test", async () => {

 });

 it("Anyone should be able to purchase tokens", async () => {
    const instance = await Token.new();
    const owner = accounts[0];
    const buyer = accounts[1];

    const tokenPrice = await instance.tokenPrice();
    log("Token price (wei) :" + tokenPrice.toString());
    const tokens = 3;
    const price = tokens * tokenPrice;
    log("Price (wei) :" + price.toString());

    // store owner token balance before the pruchase
    const ownerBalanceBefore = await instance.balanceOf(accounts[0]);

    // purcahse the token by providing the expected eth to the function
    await instance.purchase(tokens, { from: buyer, value: price});
    const tokenBalance = await instance.balanceOf(buyer);
    assert.equal(tokenBalance.toNumber(), tokens);

    // check owner balance
    const ownerBalanceAfter = await instance.balanceOf(accounts[0]);
    assert.equal(ownerBalanceBefore.toNumber() - ownerBalanceAfter.toNumber(), tokens);

    // artists should be able to pay the rent
    const b1 = await web3.eth.getBalance(owner);
    await instance.withdrawPayments(owner, {from: owner});
    const b2 = await web3.eth.getBalance(owner);
    // todo - consider gas paid by owner to withdraw...
    console.log("b1" + b1);
    console.log("b2" + b2);

    assert (b2 > b1, "expected balance to grow");

  });

  it("Token holder should be able to transfer tokens to any another account", async () => {
      const instance = await Token.new();
      const buyer = accounts[1];
      const tokenPrice = await instance.tokenPrice();
      const tokens = 3;
      const price = tokens * tokenPrice;
      await instance.purchase(tokens, { from: buyer, value: price});

      const newOwner = accounts[2];
      const tranferAmnt = 1;
      await instance.transfer(newOwner, tranferAmnt, { from: buyer});

      const newOwnerBalance = await instance.balanceOf(newOwner);
      const buyerBalance = await instance.balanceOf(buyer);

      assert.equal(newOwnerBalance.toNumber(), tranferAmnt);
      assert.equal(buyerBalance.toNumber(), tokens - tranferAmnt);

  });

  it("Artist should have all tokens after the initial deployment", async () => {
    const instance = await Token.new();
    const balance = await instance.balanceOf(accounts[0]);
    assert.equal(balance.toNumber(), tokenSupply);
    const supply = await instance.totalSupply();
    assert.equal(supply.toNumber(), tokenSupply);

  });

  it("Artist should be able to transfer eth balance out of contract", async () => {

  });

  it("Artist should be able to only raise the token price", async () => {

  });
});
