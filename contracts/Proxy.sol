// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/utils/StorageSlot.sol";

contract Proxy {
    uint256 x = 1;

    function changeImplementation(address _implementation) external {
        StorageSlot.getAddressSlot(keccak256("impl")).value = _implementation;
    }

    fallback() external {
        (bool success, ) = StorageSlot
            .getAddressSlot(keccak256("impl"))
            .value
            .delegatecall(msg.data);

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
