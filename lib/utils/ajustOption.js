"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ajustOption(option) {
    const flagIsValid = option.flag.startsWith('--');
    const newAlias = () => {
        if (option.alias) {
            const aliasIsValid = option.alias.startsWith('-');
            return aliasIsValid ? option.alias : `-${option.alias}`;
        }
        return '';
    };
    return {
        ...option,
        flag: flagIsValid ? option.flag : `--${option.flag}`,
        alias: newAlias()
    };
}
exports.default = ajustOption;
//# sourceMappingURL=ajustOption.js.map