// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

contract Proxy {
    address implementation;

    function changeImplementation(address _implementation) external {
        implementation = _implementation;
    }

    fallback() external {
        implementation.call(msg.data);
    }
}

contract Logic1 {
    uint public x;

    function update2x() external {
        x *= 2;
    }

    function update3x() external {
        x *= 3;
    }
}

contract Logic2 {
    uint public x;

    function update2x() external {
        x *= 2;
    }

    function update5x() external {
        x *= 5;
    }
}
