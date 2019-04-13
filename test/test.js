const BigNumber = web3.BigNumber;
const log = console.log;
const tokenSupply = 1000;
const Token = artifacts.require("ShirleyShorToken");

contract("ShirleyShorToken", async accounts => {
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
    // assert (b2 > b1, "expected balance to grow");

  });

  it("Token holder should be able to transfer his tokens to any another account", async () => {
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

  it("Owner should have all tokens after deployment", async () => {
    const instance = await Token.new();
    const balance = await instance.balanceOf(accounts[0]);
    assert.equal(balance.toNumber(), tokenSupply);
    const supply = await instance.totalSupply();
    assert.equal(supply.toNumber(), tokenSupply);

  });

  it("Owner should be able to transfer eth balance out of contract", async () => {

  });

  it("Owner should be able to update token price", async () => {

  });
});
