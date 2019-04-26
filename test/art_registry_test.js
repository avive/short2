/*
  _________.__    .__       .__                   _________.__
 /   _____/|  |__ |__|______|  |   ____ ___.__.  /   _____/|  |__   ___________
 \_____  \ |  |  \|  \_  __ \  | _/ __ <   |  |  \_____  \ |  |  \ /  _ \_  __ \
 /        \|   Y  \  ||  | \/  |_\  ___/\___  |  /        \|   Y  (  <_> )  | \/
/_______  /|___|  /__||__|  |____/\___  > ____| /_______  /|___|  /\____/|__|
        \/      \/                    \/\/              \/      \/
   _____          __    __________              .__          __
  /  _  \________/  |_  \______   \ ____   ____ |__| _______/  |________ ___.__.
 /  /_\  \_  __ \   __\  |       _// __ \ / ___\|  |/  ___/\   __\_  __ <   |  |
/    |    \  | \/|  |    |    |   \  ___// /_/  >  |\___ \  |  |  |  | \/\___  |
\____|__  /__|   |__|    |____|_  /\___  >___  /|__/____  > |__|  |__|   / ____|
        \/                      \/     \/_____/         \/               \/
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

        await instance.registerArtPiece(pieceName, project, totalEditions,
            {from: accounts[0]});

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
        let res = false;
        try {
            res = await instance.registerEdition(0, accounts[3], price1,
                {from: accounts[0]});
        } catch (err) {
            res = true;
        }
        assert.equal(res, true);
    });
});
