import shelljs from "shelljs";
import { CreateTaskCommand, GetAllTaskCommand } from "@/commands";
import { IncrementIdService, StorageService, UnixShellService } from "@/services";
import { CreateTaskUseCase, GetAllTaskUseCase } from "@/usecases";

const user = shelljs.exec("whoami").stdout;
const rootPath = `/home/${user.trim()}/.task-cli`;
const rootFile = "task-cli-memory-storage.json";

const unixShellService = new UnixShellService(shelljs);
const taskStorage = new StorageService(unixShellService, rootFile, rootPath);
const incrementIdService = new IncrementIdService(taskStorage);

export const CreateTaskCommandFactory = function (): CreateTaskCommand {
  const createTaskUseCase = new CreateTaskUseCase(taskStorage, incrementIdService);
  const createTaskCommand = new CreateTaskCommand(createTaskUseCase);
  return createTaskCommand;
};

export const GetAllTaskCommandFactory = function (): GetAllTaskCommand {
  const getAllTaskUseCase = new GetAllTaskUseCase(taskStorage);
  const getAllTaskCommand = new GetAllTaskCommand(getAllTaskUseCase);
  return getAllTaskCommand;
};
