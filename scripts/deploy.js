const main = async () => {
  //const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("blackpanther");
  await domainContract.deployed();
  console.log("Contract deployed to: ", domainContract.address);
  //console.log("Contract deployed by: ", owner.address);

  let txn = await domainContract.register("immortal", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain immortal.blackpanther");

  txn = await domainContract.setRecord("immortal", "New record created");
  await txn.wait();
  console.log("Set a new record in immortal.blackpanther");

  const domainAddress = await domainContract.getAddress("immortal");
  console.log("Owner of domain immortal: ", domainAddress);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract Balance: ", hre.ethers.utils.formatEther(balance));
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
