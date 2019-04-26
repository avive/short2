/*
  ____  _     _      _              ____  _                _____     _
 / ___|| |__ (_)_ __| | ___ _   _  / ___|| |__   ___  _ __|_   _|__ | | _____ _ __
 \___ \| '_ \| | '__| |/ _ \ | | | \___ \| '_ \ / _ \| '__| | |/ _ \| |/ / _ \ '_ \
  ___) | | | | | |  | |  __/ |_| |  ___) | | | | (_) | |    | | (_) |   <  __/ || |
 |____/|_| |_|_|_|  |_|\___|\__, | |____/|_| |_|\___/|_|    |_|\___/|_|\_\___|_||_|
                            |___/
  Shirley Shor * Art Token * Smart Contact * Team Human
*/

const Registry = artifacts.require("ShirleyShorArtRegistry");
const log = console.log;

contract("ShirleyShorArtRegistry", async accounts => {
    it("Artist should be able to add artwork", async () => {
        const instance = await Registry.new();

        const c = await instance.artPieceIds();
        assert.equal(c, 0);

        const pieceName = "TeamHumanPrintA";
        const project = "Team Human";
        const totalEditions = 2;

        await instance.registerArtPiece(pieceName, project, totalEditions, {from: accounts[0]});

        const c1 = await instance.artPieceIds();
        assert.equal(c1, 1);

        const item = await instance.artPiecesRegistry(0);
        assert.equal(item.name, pieceName);
        assert.equal(item.projectName, project);
        assert.equal(item.totalEditions, totalEditions);
        assert.equal(item.editionsSold, 0);
      });

    it("Artist should be able to register edition", async () => {
        const instance = await Registry.new();

        const pieceName = "TeamHumanPrintA";
        const project = "Team Human";
        const totalEditions = 2;
        await instance.registerArtPiece(pieceName, project, totalEditions,
            {from: accounts[0]});

        // first edition
        const price = 200000; // wei
        await instance.registerEdition(0, accounts[1], price,
            {from: accounts[0]});
        const item = await instance.purchasedEditionsRegistry(0);
        assert.equal(item.artPiece, 0);
        assert.equal(item.edition, 1);
        assert.equal(item.owner, accounts[1]);
        assert.equal(item.price, price);

        let artPiece = await instance.artPiecesRegistry(0);
        assert.equal(artPiece.editionsSold, 1);

        // second edition
        const price1 = 300000; // wei
        await instance.registerEdition(0, accounts[2], price1,
            {from: accounts[0]});

        const item1 = await instance.purchasedEditionsRegistry(1);
        assert.equal(item1.artPiece, 0);
        assert.equal(item1.edition, 2);
        assert.equal(item1.owner, accounts[2]);
        assert.equal(item1.price, price1);

        artPiece = await instance.artPiecesRegistry(0);
        assert.equal(artPiece.editionsSold, 2);

        // attempting to sell 3rd edition should fail
        try {
            const res = await instance.registerEdition(0, accounts[3], price1,
                {from: accounts[0]});
            assert(false);
        } catch (err) {
        }
    });

});
