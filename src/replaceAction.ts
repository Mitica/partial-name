
const debug = require('debug')('partial-name');

import { Action, ActionOptions, ActionResults, isValidName } from "./action";

export interface ReplaceActionOptions extends ActionOptions {
    replaceValue?: string
}

export function createReplaceAction(searchValue: RegExp, options?: ReplaceActionOptions): Action {
    options = options || {};
    
    const stopOnSuccess = options.stopOnSuccess;
    const replaceValue = typeof options.replaceValue === 'string' ? options.replaceValue : '';

    return (name: string): ActionResults => {
        const partialName = name.replace(searchValue, replaceValue);
        if (partialName === name) {
            return { success: false, name: null };
        }

        if (!isValidName(partialName)) {
            debug(`replace partial name is invalid: ${partialName}`);
            return { success: false, name: null };
        }

        return { stopOnSuccess, success: true, name: partialName };
    }
}


