// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Box is Initializable {
    uint256 internal value;

    event NewValueStored(uint256 value);

    function store(uint256 _value) public {
        value = _value;

        emit NewValueStored(_value);
    }

    function retrieve() public view returns (uint256) {
        return value;
    }

    function version() public pure virtual returns (uint8) {
        return 1;
    }
}
