// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transaction {
    struct txn {
        address fromAddress;
        address toAddress;
        string action;
        uint256 value;
    }

    mapping(address => txn[]) transactions;

    constructor() {
    }

    function addTransaction(address from, address to, string calldata act, uint256 amount) external {
        transactions[from].push(txn({fromAddress: from, toAddress: to, action: act, value: amount}));
        transactions[to].push(txn({fromAddress: from, toAddress: to, action: act, value: amount}));
    }

    function getTransactionsForAddress(address forAddress) external view returns(txn[] memory) {
        return transactions[forAddress];
    }
}