// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./Box.sol";

contract BoxV2 is Box {
    event ValueUpdated(uint256 value);

    function increment() public {
        value += 1;
        emit ValueUpdated(value);
    }

    function version() public pure override returns (uint8) {
        return 1;
    }
}
