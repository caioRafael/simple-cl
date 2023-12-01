"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajustOption_1 = __importDefault(require("../utils/ajustOption"));
const separateFlags_1 = __importDefault(require("../utils/separateFlags"));
class Command {
    name;
    description;
    action;
    options;
    value;
    constructor() {
        this.name = '';
        this.description = '';
        this.action = () => { };
        this.options = [];
        this.value = '';
    }
    parse(args) {
        const helpArgument = '--help';
        const aliasHelp = '-h';
        if (args[0] === helpArgument || args[0] === aliasHelp) {
            this.help();
        }
        else {
            this.process(args);
        }
    }
    process(args) {
        if (args.length !== 0 && (!args[0].startsWith('--') || !args[0].startsWith('-'))) {
            this.value = args[0];
        }
        const result = (0, separateFlags_1.default)(args, this.options);
        this.action(this.value, result);
    }
    setName(value) {
        this.name = value;
        return this;
    }
    setDsescription(description) {
        this.description = description;
        return this;
    }
    addOption(option) {
        this.options?.push((0, ajustOption_1.default)(option));
        return this;
    }
    setAction(action) {
        this.action = action;
    }
    help() {
        console.log(this.name);
        console.log(this.description);
        console.log('\n');
        const optionFlagLength = Math.max(...this.options.map(option => option.flag.length));
        const optionDescriptionLength = Math.max(...this.options.map(option => option.description.length));
        const optionAliasLength = Math.max(...this.options.map(option => option.alias?.length));
        console.log(`${'flags'.padEnd(optionFlagLength)} \t ${'alias'.padEnd(optionAliasLength)} \t ${'description'.padEnd(optionDescriptionLength)} \t Default value`);
        this.options?.map(option => {
            console.log(`${option.flag.padEnd(optionFlagLength)} \t ${option.alias?.padEnd(optionAliasLength) || ''} \t ${option.description.padEnd(optionDescriptionLength)} \t ${option.value || ''}`);
        });
    }
}
exports.default = Command;
//# sourceMappingURL=Command.js.map