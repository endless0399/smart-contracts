// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Token {
    string public name = "HelloWorld";
    string public symbol = "HWT";

    uint256 public totalSupply = 1000000000000000;
    address private ownerAddress; 
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        ownerAddress = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function burn(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        totalSupply -= amount;
    }
}
