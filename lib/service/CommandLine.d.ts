import Command from "./Command";
export default class CommandLine {
    private name;
    private version;
    private description;
    private commands;
    constructor(name?: string, version?: string, description?: string);
    parse(args: string[]): void;
    setName(name: string): this;
    setDescription(description: string): this;
    setVersion(version: string): this;
    addCommand(name: string): Command;
    private help;
}
