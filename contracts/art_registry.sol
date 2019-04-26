pragma solidity >=0.5.0 <0.6.0;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ShirleyShorArtRegistry is Ownable {
    struct ArtPiece {
        string name;            // art piece name
        string projectName;     // art piece project name
        uint8 totalEditions;    // total number of editions that can be soold
        uint256 created;        // record timestamp
    }
    struct PurchaseRecord {
        uint artPiece;      // an ArtPiece id
        uint8 edition;      // purchased edition number
        address owner;      // edition owner pub key
        uint purchased;     // time edition purchased
    }

    uint public artPieceIds;
    mapping (uint => ArtPiece) public artPiecesRegistry;

    uint public registrySize;
    mapping (uint => PurchaseRecord) public purchasedEditionsRegistry;

    function registerEdition(uint artPieceId, uint8 edition, address owner) onlyOwner public {
        uint id = registrySize++;
        purchasedEditionsRegistry[id] = PurchaseRecord(artPieceId, edition, owner, now);
    }

    function addArtPiece(string memory name, string memory projectName, uint8 totalEditions) onlyOwner public {
        uint id = artPieceIds++;
        artPiecesRegistry[id] = ArtPiece(name, projectName, totalEditions, now);
    }

}
