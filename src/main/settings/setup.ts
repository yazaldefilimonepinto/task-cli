import packageInfo from "@/../package.json";
import {
  CreateTaskCommandFactory,
  DoneTaskCommandFactory,
  DropTaskCommandFactory,
  GetAllTaskCommandFactory,
} from "@/factories";

import { program } from "commander";

//create
const createTaskCommandFactory = CreateTaskCommandFactory();
const createTaskBuild = createTaskCommandFactory.build();
//getAll
const getAllTaskCommandFactory = GetAllTaskCommandFactory();
const getAllTaskBuild = getAllTaskCommandFactory.build();
//drop
const dropTaskCommandFactory = DropTaskCommandFactory();
const dropTaskBuild = dropTaskCommandFactory.build();
//done
const doneTaskCommandFactory = DoneTaskCommandFactory();
const doneTaskCommandBuild = doneTaskCommandFactory.build();

program.name(packageInfo.name).description(packageInfo.description).version(packageInfo.version);
program
  .command(createTaskBuild.command)
  .description(createTaskBuild.description)
  .argument("<to-do>", "name or description of task")
  .option("--priority", "display just the first substring")
  .action((options, parameters) => createTaskCommandFactory.action(options, parameters));

program
  .command(getAllTaskBuild.command)
  .description(getAllTaskBuild.description)
  .option("--all", "show all tasks")
  .option("--padding", "show all padding status tasks")
  // .option("-a", "display just the first substring")
  .action(async (options, parameters) => await getAllTaskCommandFactory.action(options, parameters));

program
  .command(dropTaskBuild.command)
  .description(dropTaskBuild.description)
  .argument("<id>", "id of task")
  .action((options, parameters) => dropTaskCommandFactory.action(options, parameters));

program
  .command(doneTaskCommandBuild.command)
  .description(doneTaskCommandBuild.description)
  .argument("<id>", "id of task")
  .action((options, parameters) => doneTaskCommandFactory.action(options, parameters));

export default program;
