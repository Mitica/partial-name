import { createPrefixAction } from './splitAction';

export {
    Action,
    ActionOptions,
    ActionResults,
    isSupportedLanguage,
} from './action';

export {
    createReplaceAction,
    ReplaceActionOptions,
} from './replaceAction';

export {
    createSplitAction,
    SplitActionJoiner,
    SplitActionOptions,
    createPrefixAction,
    createSuffixAction,
} from './splitAction';

export {
    partialName,
    PartialNameOptions,
} from './partialName';


const EndParenthesesAction = createPrefixAction(/\s*\(.+/);
export function removeEndParentheses(name: string): string {
    return EndParenthesesAction(name).name;
}
