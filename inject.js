const fs = require('fs');
const branch = require('git-branch');
const path = require('path');

const contractPath = path.resolve(__dirname) + "/Version.sol";

const versionFile = require(process.cwd() + "/version.json");
if (!versionFile.version) {
    console.error("Missing key 'version' in version.json file.");
    return;
}

if (versionFile.version.includes('"')) {
    console.error("Char \" not allowed in version.");
    return;
}

let data;
try {
    data = fs.readFileSync(contractPath, "utf8");
} catch (err) {
    console.error(err);
}

let branchName;
try {
    branchName = branch.sync();
} catch (err) {

}

const regex = /".*"/;
data = data.replace(regex, '"' + versionFile.version + (branchName ? "_" + branchName : "") + '"');
try {
    fs.writeFileSync(contractPath, data);
} catch (err) {
    console.error(err);
}