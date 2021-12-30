const { expect } = require("chai");


describe("Token contract", () => {
    let Token, owner, address1, address2, addrs, hardhatToken;

    beforeEach(async () => {
        Token = await ethers.getContractFactory('Token');
        [owner, address1, address2, ...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();

    });

    const getBalance = async (_address) => {
        return await hardhatToken.balanceOf(_address.address)
    }

    describe('Deployment', () => {
        it("Should set Right Owner", async () => {
            expect(await hardhatToken.owner()).to.equal(owner.address)
        });

        it("Should assign the total supply of token to th owner", async () => {
            expect(await hardhatToken.totalSupply()).to.equal(await getBalance(owner))
        });
    });
    describe("Transactions", () => {
        it("Should trasfer tokens between accounts", async () => {
            await hardhatToken.transfer(address1.address, 5);
            expect(await getBalance(address1)).to.equal(5);
            await hardhatToken.connect(address1).transfer(address2.address, 5);
            expect(await getBalance(address2)).to.equal(5);
        });

        it("Should fail if sender does not have enough tokens", async () => {
            const initialOwnerBalance = await getBalance(owner);
            await expect(hardhatToken.connect(address1).transfer(owner.address, 1)).to.be.revertedWith("Not Enougt tokens")
            expect(await getBalance(owner)).to.equal(initialOwnerBalance);
        });

        it("should update balance after transfers", async () => {
            const initialOwnerBalance = await getBalance(owner);
            await hardhatToken.transfer(address1.address, 5);
            await hardhatToken.transfer(address2.address, 10);
            expect(await getBalance(owner)).to.equal(initialOwnerBalance - 15);
            expect(await getBalance(address1)).to.equal(5);
            expect(await getBalance(address2)).to.equal(10);
        });
    })
});
