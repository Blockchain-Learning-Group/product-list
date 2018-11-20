pragma solidity ^0.4.24;

contract ProductRegistry1 {
    mapping(string => uint256) products;

    event ProductAdded(string name);

    function addProduct(string name) external {
        products[name] = 0;
        emit ProductAdded(name);
    }

    function voteForProduct(string name) external {
        products[name]++;
    }
}