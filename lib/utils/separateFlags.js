"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function separateFlags(args, options) {
    const result = {};
    for (let index = 0; index < args.length; index++) {
        const currentArg = args[index];
        if (currentArg.startsWith('--') || (currentArg.startsWith('-') && currentArg.length === 2)) {
            const option = options.find(opt => opt.flag === currentArg || opt.alias === currentArg);
            if (option) {
                const value = args[index + 1];
                if (value && !value.startsWith('--') && !value.startsWith('-')) {
                    option.value = value;
                    result[currentArg] = option.value;
                    index++;
                }
                else {
                    option.value = option.value || undefined;
                    result[currentArg] = option.value;
                }
            }
        }
    }
    return result;
}
exports.default = separateFlags;
//# sourceMappingURL=separateFlags.js.map