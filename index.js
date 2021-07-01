const {
    TASK_COMPILE,
  } = require('hardhat/builtin-tasks/task-names');

task(TASK_COMPILE, async function (args, hre, runSuper) {
    require("./inject.js");
    await runSuper();
});