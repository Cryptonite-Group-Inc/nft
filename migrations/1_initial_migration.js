const MishkaDino = artifacts.require("MishkaDino");

module.exports = function (deployer) {
  deployer.deploy(MishkaDino, "https://ipfs.io/ipfs/QmZ1Wm9mzeVkLUwJ6jL7UBzwGkJsnpMQpNNmP7G8REF1Ci/");
};