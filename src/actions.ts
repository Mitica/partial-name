
import { createPrefixAction } from "./splitAction";
import { Action } from "./action";
import { createReplaceAction } from "./replaceAction";

export const CommaSplitAction = createPrefixAction(/\s*[,;]+\s*/);
export const EndParenthesesReplaceAction = createReplaceAction(/\s*\(.+\)$/);

const EnglishOfThePrefixAction = createPrefixAction(/\s+of\s+the\s+/i);

export const DefaultActions: Action[] = [
    EndParenthesesReplaceAction,
    CommaSplitAction,
    EnglishOfThePrefixAction,
];

export function getActions(lang?: string): Action[] {
    if (lang) {
        return LanguageActions[lang] || DefaultActions;
    }
    return DefaultActions;
}

export const LanguageActions: { [lang: string]: Action[] } = {
    en: DefaultActions,
    ro: DefaultActions.concat([
        createPrefixAction(/\s+(din|de la|al|a)\s+/i),
    ]),
};
