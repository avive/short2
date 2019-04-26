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

pragma solidity >=0.5.0 <0.6.0;
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/payment/PullPayment.sol";

contract ShirleyShorToken is ERC20, ERC20Detailed, Ownable, PullPayment {
    uint public tokenPrice = 1 ether;
    constructor() ERC20Detailed("Shirley Shor Token", "ShorT", 0) public {
        _mint(msg.sender, 3500);
    }
    function purchase(uint tokens) public payable {
        require(msg.value == tokens.mul(tokenPrice));
        _transfer(owner(), msg.sender, tokens);
        _asyncTransfer(owner(), msg.value);
    }
    function updatePrice(uint price) onlyOwner public {
        require(price > tokenPrice);
        tokenPrice = price;
    }
}
