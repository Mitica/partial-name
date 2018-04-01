
import { createPrefixAction } from "./splitAction";
import { Action } from "./action";
const actionsData: ActionsData = require('../actions.json');

buildDataActions();

const DefaultActions = actionsData.actions.map(item => item.action);

const LanguageActions: Map<string, Action[]>
    = Object.keys(actionsData.languages)
        .reduce<Map<string, Action[]>>((data, lang) => {
            data.set(lang, actionsData.languages[lang].actions.map(item => item.action));
            return data;
        }, new Map());

const LanguageCountryActions: Map<string, Action[]>
    = Object.keys(actionsData.languages)
        .reduce<Map<string, Action[]>>((data, lang) => {

            Object.keys(actionsData.languages[lang].countries)
                .reduce<Map<string, Action[]>>((_, country) => {
                    data.set(`${lang}-${country}`, actionsData.languages[lang].countries[country].actions.map(item => item.action));
                    return data;
                }, data);

            return data;
        }, new Map());

export function getActions(lang?: string, country?: string): Action[] {
    if (typeof lang === 'string') {
        if (typeof country === 'string') {
            return LanguageCountryActions.get(`${lang}-${country}`);
        }
        return LanguageActions.get(lang);
    }
    return DefaultActions;
}

export function getActionsData() {
    return actionsData;
}

function buildDataActions() {

    actionsData.actions = actionsData.actions || [];
    actionsData.actions.forEach(info => info.action = buildAction(info));

    for (let lang of Object.keys(actionsData.languages)) {
        const langInfo: ActionsInfo = actionsData.languages[lang];
        const langInherit = langInfo.inherit;

        langInfo.actions = langInfo.actions || [];

        langInfo.actions.forEach(info => info.action = buildAction(info));

        if (langInherit === true) {
            langInfo.actions = actionsData.actions.concat(langInfo.actions);
        }

        for (let country of Object.keys(langInfo.countries)) {
            const countryInfo: ActionsInfo = langInfo.countries[country];
            const countryInherit = countryInfo.inherit;
            countryInfo.actions = countryInfo.actions || [];

            countryInfo.actions.forEach(info => info.action = buildAction(info));

            if (countryInherit === true) {
                countryInfo.actions = langInfo.actions.concat(countryInfo.actions);
            }
        }
    }
}

function buildAction(info: ActionInfo): Action {
    switch (info.type) {
        case 'prefix':
            return createPrefixAction(new RegExp(info.value, 'i'));
        default: throw new Error(`Invalid action type: ${info.type}`);
    }
}

export type ActionsData = {
    actions: ActionInfo[]
    languages: { [lang: string]: ActionsInfo }
}

export type ActionsInfo = {
    inherit?: boolean
    actions: ActionInfo[]
    countries: { [country: string]: ActionsInfo }
}

export type ActionInfo = {
    name: string
    type: string
    value: any
    examples: string[][]
    action?: Action
}
