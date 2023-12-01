import Command from "./Command"

export default class CommandLine{
    private name: string
    private version: string
    private description: string
    private commands: Command[]

    constructor(
        name?: string,
        version?: string,
        description?: string,
    ){ 
        this.name = name || ''
        this.version = version || ''
        this.description = description || ''
        this.commands = []
    }

    parse(args: string[]){
        const helpArgument = '--help'
        const aliasHelp = '-h'
        const versionArgument = '--version'
        const aliasVersion = '-v'

        const commandName = args[0]

        if(args.length === 0 || commandName === helpArgument || commandName === aliasHelp){
            this.help()
        }

        if(commandName === versionArgument || commandName === aliasVersion){
            console.log(`V ${this.version}`)
        } else {
            const command = this.commands.find(command => command.name === commandName)
    
            command?.parse(args.slice(1))
        }

    }

    setName(name: string): this{
        this.name = name

        return this
    }

    setDescription(description: string): this{
        this.description = description

        return this
    }

    setVersion(version: string): this{
        this.version = version

        return this
    }

    addCommand(name: string){
        const newCommand = new Command()
        newCommand.setName(name)
        this.commands.push(newCommand)

        return newCommand
    }

    private help(){
        console.log(this.name.toUpperCase())
        console.log(`V ${this.version}`)
        console.log(this.description)

        console.log('\n')

        const commandNameLength = Math.max(...this.commands.map(command => command.name.length))
        const commandDescriptionLength = Math.max(...this.commands.map(command => command.description.length))

        console.log(`${'command'.padEnd(commandNameLength).toUpperCase()} \t ${'description'.padEnd(commandDescriptionLength).toUpperCase()}`)
        this.commands.map(command => {
            console.log(`${command.name.padEnd(commandNameLength)} \t ${command.description.padEnd(commandDescriptionLength)}`)
        })
    }
}