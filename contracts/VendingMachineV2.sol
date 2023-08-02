// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV2 is Initializable {
    uint256 public numSodas;
    address public owner;
    mapping(address => uint256) purchases;

    event Purchased(address indexed from, uint256 amount);

    error NotOwner();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    function initialize(uint256 _numSodas) public initializer {
        numSodas = _numSodas;
        owner = msg.sender;
    }

    function purchaseSoda(uint256 amount) public payable {
        require(
            numSodas >= amount,
            string(
                abi.encodePacked(
                    "Only ",
                    numSodas,
                    " sodas available to be purchased"
                )
            )
        );
        require(amount >= 1, "You can only buy more the one sodas");

        uint256 weiToPay = amount * 1000 wei;
        require(
            msg.value == weiToPay,
            string(
                abi.encodePacked(
                    "You need to pay ",
                    weiToPay,
                    " wei to buy ",
                    amount,
                    " sodas..."
                )
            )
        );

        numSodas -= amount;
        purchases[msg.sender] += amount;

        emit Purchased(msg.sender, amount);
    }

    function withdrawProfits() public onlyOwner {
        uint256 toWithdraw = address(this).balance;
        require(toWithdraw > 9, "There's no Balance to Withdraw");
        (bool success, ) = owner.call{value: toWithdraw}("");
        require(success, "Withdraw Profits failed");
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
}
