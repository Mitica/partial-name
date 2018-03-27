
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
            return { success: false, name };
        }
        const partialName = joiner(parts);
        if (!isValidName(partialName)) {
            debug(`split partial name is invalid: ${partialName}`);
            return { success: false, name };
        }

        return { stopOnSuccess, success: true, name: partialName };
    }
}

export const JOINERS = {
    FirstPart: (parts: string[]) => parts[0],
    LastPart: (parts: string[]) => parts[parts.length - 1],
}

export interface SplitActionJoiner {
    (parts: string[]): string
}
