## Usage

- In your root working folder create a file named "version.json", containing a version set by you under key "version".
- All contracts you want to have a version must extend an abstract contract called "Version" located in the root folder of this package. Meaning in your smart contract you need to import "sc-version-discoverability/Version.sol".

For **hardhat** users:
- put this line in your hardhat config: *require("sc-version-discoverability")* - injection of the version will be done on every hardhat compile automatically

If you don't use **hardhat**, you can run the injection **manually** by command *node node_modules/sc-version-discoverability/inject.js*

You can view your contract's version by calling its inherited method *version*. If you use **git**, the version (set by you) is extended by the name of the branch it was compiled from.

## How it works as a hardhat plugin
In file "index.js" it requires hardhat task named `TASK_COMPILE` and it overrides it:
```
task(TASK_COMPILE, async function (args, hre, runSuper) {
    require("./inject.js"); //version injection to Version.sol
    await runSuper(); //compilation
});
```