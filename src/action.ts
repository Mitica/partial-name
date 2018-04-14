
export interface ActionOptions {
    stopOnSuccess?: boolean
}

export type ActionResults = {
    success: boolean
    name: string
    stopOnSuccess?: boolean
}

export interface Action {
    (name: string): ActionResults
}

export const SUPPORTED_LANGUAGES = ['en', 'ro', 'ru'];

export function isSupportedLanguage(lang: string) {
    return lang && SUPPORTED_LANGUAGES.indexOf(lang) > -1;
}

export function isValidName(name: string) {
    return name && name.trim().length > 1;
}
