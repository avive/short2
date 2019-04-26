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

pragma solidity >=0.5.0 <0.6.0;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ShirleyShorArtRegistry is Ownable {
    struct ArtPiece {
        string name;            // art piece name
        string projectName;     // art piece project name
        uint8 totalEditions;    // total number of editions that can be sold
        uint8 editionsSold;     // total number of editions sold
        uint256 created;        // record timestamp
    }

    struct PurchaseRecord {
        uint artPiece;      // Art piece identifier
        uint8 edition;      // purchased edition number
        address owner;      // edition owner pub key
        uint price;         // purchase price
        uint purchased;     // time edition purchased
    }

    uint public artPieceIds;
    mapping (uint => ArtPiece) public artPiecesRegistry;

    uint public registrySize;
    mapping (uint => PurchaseRecord) public purchasedEditionsRegistry;

    // Register a new purchser of an art piece
    // Owner will be assigned a new edition number if an edition can be purchased
    function registerEdition(uint artPieceId, address owner, uint price) onlyOwner public {

        // ensure a new edition may be sold for the art piece
        ArtPiece memory artPiece = artPiecesRegistry[artPieceId];
        require(artPiece.editionsSold < artPiece.totalEditions);
        uint8 edition = artPiece.editionsSold + 1;
        require(edition <= artPiece.totalEditions);

        // add the edition to the registry
        uint id = registrySize++;
        purchasedEditionsRegistry[id] = PurchaseRecord(artPieceId, edition, owner, price, now);

        // update number of editions sold for this piece
        artPiece.editionsSold++;
        artPiecesRegistry[artPieceId] = artPiece;
    }

    function registerArtPiece(string memory name, string memory projectName, uint8 totalEditions) onlyOwner public {
        uint id = artPieceIds++;
        artPiecesRegistry[id] = ArtPiece(name, projectName, totalEditions, 0, now);
    }
}
