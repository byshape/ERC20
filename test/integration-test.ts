import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { ERC20, ERC20__factory } from "../typechain";

describe("Integration", () => {
    const initialSupply: bigint = BigInt(1000 * 10 ** 18);

    let admin: SignerWithAddress;
    let tokensOwner: SignerWithAddress;
    let user: SignerWithAddress;
    let user2: SignerWithAddress;
    let erc20Factory: ERC20__factory;
    let erc20: ERC20;

    it("Gets signers", async () => {
        [admin, tokensOwner, user, user2] = await ethers.getSigners();
    });

    it("Deploys token contract", async () => {
        erc20Factory = await ethers.getContractFactory("ERC20", admin);
        erc20 = await erc20Factory.deploy("Test token", "TST", 18, initialSupply, tokensOwner.address);
        await erc20.deployed();
        expect(erc20.address).to.be.not.equal("0x0000000000000000000000000000000000000000");
        expect(await erc20.balanceOf(tokensOwner.address)).to.be.equal(initialSupply);
    });

    it("Approves tokens", async () => {
        let amountToApprove: bigint = BigInt(10);
        await erc20.connect(tokensOwner).approve(user.address, amountToApprove);
        expect(await erc20.allowance(tokensOwner.address, user.address)).to.be.equal(amountToApprove);
    });

    it("Transfers approved tokens", async () => {
        let amountToTransfer: bigint = BigInt(5);
        expect(await erc20.balanceOf(tokensOwner.address)).to.be.equal(initialSupply);
        expect(await erc20.balanceOf(user2.address)).to.be.equal(0);
        await erc20.connect(user).transferFrom(tokensOwner.address, user2.address, amountToTransfer);
        expect(await erc20.balanceOf(tokensOwner.address)).to.be.equal(initialSupply - amountToTransfer);
        expect(await erc20.balanceOf(user2.address)).to.be.equal(amountToTransfer);
    });
});