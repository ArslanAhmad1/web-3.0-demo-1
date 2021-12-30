const main = async () => {
    const Token = await ethers.getContractFactory("Token");
    console.log(Token)
    const token = await Token.deploy();
    console.log("Token address : ", token)
    await token.deployed();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })