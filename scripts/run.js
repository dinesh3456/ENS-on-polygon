const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("blackpanther");
  await domainContract.deployed();
  //console.log("Contract deployed to: ", domainContract.address);
  console.log("Contract deployed by: ", owner.address);

  let txn = await domainContract.register("luv", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();

  const domainAddress = await domainContract.getAddress("immortal");
  console.log("Owner of domain Dinesh: ", domainAddress);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract Balance: ", hre.ethers.utils.formatEther(balance));

  try {
    txn = await domainContract.connect(randomPerson).withdraw();
    await txn.wait();
  } catch (error) {
    console.log("could not complete the transaction");
  }

  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log(
    "Balance of the owner before withdrawal: ",
    hre.ethers.utils.formatEther(ownerBalance)
  );

  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();

  let contractBalance = await hre.ethers.provider.getBalance(
    domainContract.address
  );
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log(
    "Balance of the owner after withdrawal: ",
    hre.ethers.utils.formatEther(ownerBalance)
  );
  console.log(
    "Balance of the contract after withdrawal: ",
    hre.ethers.utils.formatEther(contractBalance)
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

runMain();
