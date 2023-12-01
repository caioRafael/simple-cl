import Option from "../types/Option";
export default class Command {
    name: string;
    description: string;
    action: (arg?: string, options?: any) => void;
    options: Option[];
    value: string;
    constructor();
    parse(args: string[]): void;
    private process;
    setName(value: string): this;
    setDsescription(description: string): this;
    addOption(option: Option): this;
    setAction(action: (arg?: string, options?: any) => void): void;
    private help;
}
