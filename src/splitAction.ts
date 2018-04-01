
const debug = require('debug')('partial-name');

import { Action, ActionOptions, ActionResults, isValidName } from "./action";

export interface SplitActionOptions extends ActionOptions {
    joiner: SplitActionJoiner
}

export function createSplitAction(splitter: RegExp, options: SplitActionOptions): Action {
    const joiner = options.joiner;
    const stopOnSuccess = options.stopOnSuccess;

    return (name: string): ActionResults => {
        const parts = name.split(splitter);
        if (parts.length < 2) {
            return { success: false, name: null };
        }
        const partialName = joiner(parts);
        if (!isValidName(partialName)) {
            debug(`split partial name is invalid: ${partialName}`);
            return { success: false, name: null };
        }

        return { stopOnSuccess, success: true, name: partialName };
    }
}

export function createPrefixAction(splitter: RegExp) {
    return createSplitAction(splitter, { joiner: (parts: string[]) => parts[0] });
}

export function createSuffixAction(splitter: RegExp) {
    return createSplitAction(splitter, { joiner: (parts: string[]) => parts[parts.length - 1] });
}

export interface SplitActionJoiner {
    (parts: string[]): string
}
