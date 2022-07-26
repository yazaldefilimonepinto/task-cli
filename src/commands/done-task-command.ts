import { ICommand, ICommandResponse } from "@/commands/protocols";
import { IDoneTaskUseCase } from "@/core/usecases";

export class DoneTaskCommand implements ICommand {
  private readonly doneTaskUseCase: IDoneTaskUseCase;
  constructor(doneTaskUseCase: IDoneTaskUseCase) {
    this.doneTaskUseCase = doneTaskUseCase;
  }

  public action(options: DoneTaskCommand.optionsProps, parameters: { args: string[] }): void | Promise<void> {
    this.doneTaskUseCase.execute({ id: Number(options) }).then((response) => console.log({ response }));
  }

  public build(): ICommandResponse<typeof this.action> {
    return {
      command: "done",
      description: "done  a task",
      action: this.action,
    };
  }
}

export namespace DoneTaskCommand {
  export type optionsProps = {
    priority?: any;
  };
}
