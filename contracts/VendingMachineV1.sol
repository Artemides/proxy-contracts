// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV1 is Initializable {
    uint256 public numSodas;
    address public owner;

    function initialize(uint256 _numSodas) public initializer {
        numSodas = _numSodas;
        owner = msg.sender;
    }

    function purchase() public payable {
        require(
            msg.value >= 1000 wei,
            "you have to deposit at least 1000 wei to purchase a soda"
        );

        numSodas--;
    }
}
