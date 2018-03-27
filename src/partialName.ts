
const debug = require('debug')('partial-name');

import { Action, SUPPORTED_LANGUAGES } from "./action";
import { getActions } from "./actions";

export type PartialNameOptions = {
    lang?: string
    actions?: Action[]
}

export function partialName(name: string, options?: PartialNameOptions): string {
    let lang = options && options.lang;
    let actions = options && options.actions;

    if (lang && (typeof lang !== 'string' || lang.trim().length !== 2)) {
        throw new Error(`Invalid lang option: '${lang}'`);
    }

    if (actions && (!Array.isArray(actions) || actions.length < 1)) {
        throw new Error(`Invalid actions option`);
    }

    if (lang) {
        lang = lang.trim().toLowerCase();
        if (SUPPORTED_LANGUAGES.indexOf(lang) < 0) {
            debug(`unsupported language: ${lang}`);
        }
    }

    actions = actions || getActions(lang);

    return executeActions(name, actions);
}

function executeActions(name: string, actions: Action[]): string {
    let success = false;
    for (let action of actions) {
        let results = action(name);
        if (results.success) {
            success = true;

            debug(`success action: ${name}=>${results.name}`);

            if (results.stopOnSuccess !== false) {
                return results.name;
            }
            name = results.name;
        }
    }

    return success ? name : null;
}
