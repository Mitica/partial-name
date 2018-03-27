
import { createSplitAction, JOINERS } from "./splitAction";
import { Action } from "./action";
import { createReplaceAction } from "./replaceAction";

export const CommaSplitAction = createSplitAction(/\s*[,;]+\s*/, { joiner: JOINERS.FirstPart });
export const EndParenthesesReplaceAction = createReplaceAction(/\s*\(.+\)$/);

export const DefaultActions: Action[] = [
    EndParenthesesReplaceAction,
    CommaSplitAction,
];

export const LanguageActions: { [lang: string]: Action[] } = {
    en: DefaultActions,
    ro: DefaultActions,
};

export function getActions(lang?: string): Action[] {
    if (lang) {
        return LanguageActions[lang] || DefaultActions;
    }
    return DefaultActions;
}
