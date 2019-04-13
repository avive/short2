pragma solidity >=0.5.0 <0.6.0;

/*
  ____  _     _      _              ____  _                  _____     _
 / ___|| |__ (_)_ __| | ___ _   _  / ___|| |__   ___  _ __  |_   _|__ | | _____ _ __
 \___ \| '_ \| | '__| |/ _ \ | | | \___ \| '_ \ / _ \| '__|   | |/ _ \| |/ / _ \ '_ \
  ___) | | | | | |  | |  __/ |_| |  ___) | | | | (_) | |      | | (_) |   <  __/ || |
 |____/|_| |_|_|_|  |_|\___|\__, | |____/|_| |_|\___/|_|      |_|\___/|_|\_\___|_||_|
                            |___/

  Shirley Shor Art Token Smart Contact
*/
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/payment/PullPayment.sol";

contract ShirleyShorToken is ERC20, ERC20Detailed, Ownable, PullPayment {
    uint public tokenPrice = 3 ether;

    constructor() ERC20Detailed("Shirley Shor Token", "ShorT", 0) public {
        // Only 1000 indivisible tokens are available in the universe
        _mint(msg.sender, 1000);
    }

    // purhcase tokens from the contract for eth
    function purchase(uint tokens) public payable {
        require(msg.value == tokens.mul(tokenPrice));
        _transfer(owner(), msg.sender, tokens);
        _asyncTransfer(owner(), msg.value);
    }

    function updatePrice(uint price) onlyOwner public {
        tokenPrice = price;
    }
}
