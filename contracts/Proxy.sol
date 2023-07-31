// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

contract Proxy {
    uint256 x = 1;
    address implementation;

    function changeImplementation(address _implementation) external {
        implementation = _implementation;
    }

    function update2x() external {
        Logic1(implementation).update2x();
    }

    fallback() external {
        (bool success, ) = implementation.call(msg.data);
        // (bool success, ) = implementation.delegatecall(msg.data);

        require(success);
    }
}

contract Logic1 {
    uint public x = 1;

    function update2x() external {
        x *= 2;
    }

    function update3x() external {
        x *= 3;
    }
}

contract Logic2 {
    uint public x = 1;

    function update2x() external {
        x *= 2;
    }

    function update5x() external {
        x *= 5;
    }
}
