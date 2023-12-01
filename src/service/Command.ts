import Option from "../types/Option"
import ajustOption from "../utils/ajustOption"
import separateFlags from "../utils/separateFlags"

export default class Command{
    name: string
    description: string
    action: (arg?: string, options?: any) => void    
    options: Option[]
    value: string

    constructor(){
        this.name = ''
        this.description = ''
        this.action = () => {}
        this.options = []
        this.value = ''
    }
    
    parse(args: string[]){
        const helpArgument = '--help'
        const aliasHelp = '-h'
        if(args[0] === helpArgument || args[0] === aliasHelp){
            this.help()
        }else{
            this.process(args)
        }
    }

    private process(args: string[]){
        if(args.length !== 0 && (!args[0].startsWith('--') || !args[0].startsWith('-'))){
            this.value = args[0]
        }

        const result = separateFlags(args, this.options)

        this.action(this.value, result)
    }

    setName(value: string){
        this.name = value

        return this
    }

    setDsescription(description: string){
        this.description = description

        return this
    }

    addOption(option: Option){
        this.options?.push(ajustOption(option))

        return this
    }

    setAction(action: (arg?: string, options?: any) => void ){
        this.action = action
    }

    private help(){
        console.log(this.name)
        console.log(this.description)

        console.log('\n')

        const optionFlagLength = Math.max(...this.options.map(option => option.flag.length))
        const optionDescriptionLength = Math.max(...this.options.map(option => option.description.length))
        const optionAliasLength = Math.max(...this.options.map(option => option.alias?.length as number))


        console.log(`${'flags'.padEnd(optionFlagLength)} \t ${'alias'.padEnd(optionAliasLength)} \t ${'description'.padEnd(optionDescriptionLength)} \t Default value`)
        this.options?.map(option => {
            console.log(`${option.flag.padEnd(optionFlagLength)} \t ${option.alias?.padEnd(optionAliasLength) || ''} \t ${option.description.padEnd(optionDescriptionLength)} \t ${option.value || ''}`)
        })
    }

}