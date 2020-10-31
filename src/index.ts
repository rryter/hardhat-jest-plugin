import type { AggregatedResult } from "@jest/test-result";
import type { Config } from "@jest/types";
import chalk from "chalk";
import { TASK_COMPILE } from "hardhat/builtin-tasks/task-names";
import { subtask, task } from "hardhat/config";
import { HARDHAT_NETWORK_NAME } from "hardhat/plugins";

const TASK_JEST = "test:jest";
const TASK_JEST_RUN_TESTS = "jest:run";

subtask(TASK_JEST_RUN_TESTS)
  .addFlag("watch", "Enables 'watch-mode'")
  .setAction(async ({ watch }: { watch: boolean }, { config }) => {
    const { runCLI } = await import("jest");
    const testFailures = await new Promise<{
      results: AggregatedResult;
      globalConfig: Config.GlobalConfig;
    }>((resolve, reject) => {
      const jestConfig: any = { watch };
      return runCLI(jestConfig, [config.paths.root + "/jest.config.js"])
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });

    return testFailures.results;
  });

task(TASK_JEST, "Runs jest tests")
  .addFlag("watch", "Watch-Mode")
  .addFlag("noCompile", "Don't compile before running this task")
  .setAction(
    async (
      {
        watch,
        testFiles,
        noCompile,
      }: {
        watch: boolean;
        testFiles: string[];
        noCompile: boolean;
      },
      { run, network }
    ) => {
      if (!noCompile) {
        await run(TASK_COMPILE, { quiet: true });
      }

      const testFailures = await run(TASK_JEST_RUN_TESTS, { watch });

      if (network.name === HARDHAT_NETWORK_NAME) {
        const stackTracesFailures = await network.provider.send("hardhat_getStackTraceFailuresCount");

        if (stackTracesFailures !== 0) {
          console.warn(
            chalk.yellow(
              `Failed to generate ${stackTracesFailures} stack trace(s). Run Hardhat with --verbose to learn more.`
            )
          );
        }
      }

      process.exitCode = testFailures;
      return testFailures;
    }
  );
