"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("./Command"));
class CommandLine {
    name;
    version;
    description;
    commands;
    constructor(name, version, description) {
        this.name = name || '';
        this.version = version || '';
        this.description = description || '';
        this.commands = [];
    }
    parse(args) {
        const helpArgument = '--help';
        const aliasHelp = '-h';
        const versionArgument = '--version';
        const aliasVersion = '-v';
        const commandName = args[0];
        if (args.length === 0 || commandName === helpArgument || commandName === aliasHelp) {
            this.help();
        }
        if (commandName === versionArgument || commandName === aliasVersion) {
            console.log(`V ${this.version}`);
        }
        else {
            const command = this.commands.find(command => command.name === commandName);
            command?.parse(args.slice(1));
        }
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setVersion(version) {
        this.version = version;
        return this;
    }
    addCommand(name) {
        const newCommand = new Command_1.default();
        newCommand.setName(name);
        this.commands.push(newCommand);
        return newCommand;
    }
    help() {
        console.log(this.name.toUpperCase());
        console.log(`V ${this.version}`);
        console.log(this.description);
        console.log('\n');
        const commandNameLength = Math.max(...this.commands.map(command => command.name.length));
        const commandDescriptionLength = Math.max(...this.commands.map(command => command.description.length));
        console.log(`${'command'.padEnd(commandNameLength).toUpperCase()} \t ${'description'.padEnd(commandDescriptionLength).toUpperCase()}`);
        this.commands.map(command => {
            console.log(`${command.name.padEnd(commandNameLength)} \t ${command.description.padEnd(commandDescriptionLength)}`);
        });
    }
}
exports.default = CommandLine;
//# sourceMappingURL=CommandLine.js.map