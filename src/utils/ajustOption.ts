import Option from "../types/Option";

export default function ajustOption(option: Option): Option{
    const flagIsValid = option.flag.startsWith('--')
    
    const newAlias = () => {
        if(option.alias){
            const aliasIsValid = option.alias.startsWith('-')

            return aliasIsValid ? option.alias : `-${option.alias}`
        }

        return ''
    }  

    return {
        ...option,
        flag: flagIsValid ? option.flag : `--${option.flag}`,
        alias: newAlias()
    }
}