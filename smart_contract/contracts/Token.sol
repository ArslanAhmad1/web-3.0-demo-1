// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol";

contract Token {
    string public name = "AY";
    string public symble = "AY";
    uint256 public totalSupply = 10000;
    address public owner;
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address _to, uint256 _amount) external {
        console.log("**Sender balance is %s tokens**", balances[msg.sender]);
        console.log(
            "**Sender is sending %s tokens to %s address**",
            _amount,
            _to
        );
        require(balances[msg.sender] >= _amount, "Not Enougt tokens");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function balanceOf(address _account) external view returns (uint256) {
        return balances[_account];
    }
}
