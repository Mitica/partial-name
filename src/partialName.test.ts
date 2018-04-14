
import test from 'ava';
import { partialName } from './partialName';
import { createReplaceAction } from './replaceAction';
import { createPrefixAction } from './splitAction';

test('default actions', t => {
    const data: { [name: string]: string } = {
        "Name": null,
        "New York, N.Y.": "New York",
        "New York, N.Y. (album)": "New York, N.Y.",
        "President of the Parliament": "President",
    }

    for (let name of Object.keys(data)) {
        t.is(partialName(name), data[name]);
    }
})

test('custom actions', t => {
    const data: { [name: string]: string } = {
        "Name": null,
        "New York, N.Y.": "New York; NY",
        "New York, N.Y. (album)": "New York; NY",
    }

    const actions = [
        createReplaceAction(/,+/g, { replaceValue: ';', stopOnSuccess: false }),
        createReplaceAction(/\.+/g, { stopOnSuccess: false }),
        createPrefixAction(/\s*\(.+/),
    ];

    for (let name of Object.keys(data)) {
        t.is(partialName(name, { actions }), data[name]);
    }
})

test('Romanian Default Actions', t => {
    const data: { [name: string]: string } = {
        "Name": null,
        "New York, N.Y.": "New York",
        "President of the Parliament": "President",
        "Comisia Electorală Centrală a Republicii Moldova": "Comisia Electorală Centrală",
        "Partidul Comuniștilor din Republica Moldova": "Partidul Comuniștilor",
        "Ministerul Educației și al Infrastructurii": "Ministerul Educației",
    }

    for (let name of Object.keys(data)) {
        t.is(partialName(name, { lang: 'ro' }), data[name]);
    }
})

test('Romanian->R. Moldova Actions', t => {
    const data: { [name: string]: string } = {
        "Name": null,
        "New York, N.Y.": null,
        "President of the Parliament": null,
        "Comisia Electorală Centrală a Republicii Moldova": "Comisia Electorală Centrală",
        "Partidul Comuniștilor din Republica Moldova": "Partidul Comuniștilor",
        "Ministerul Educației și al Infrastructurii": null,
        "Ministerul Educației (Moldova)": "Ministerul Educației",
    }

    for (let name of Object.keys(data)) {
        t.is(partialName(name, { lang: 'ro', country: 'md' }), data[name]);
    }
})

test('Russian Actions', t => {
    const data: { [name: string]: string } = {
        "Name": null,
        "New York, N.Y.": "New York",
        "President of the Parliament": "President",
        "Министерство здравоохранения Республики X": "Министерство здравоохранения",
        "Министерство здравоохранения (Республики X)": "Министерство здравоохранения",
    }

    for (let name of Object.keys(data)) {
        t.is(partialName(name, { lang: 'ru' }), data[name]);
    }
})

test('Russian->RU Actions', t => {
    const data: { [name: string]: string } = {
        "Name": null,
        "New York, N.Y.": null,
        "President of the Parliament": null,
        "Министерство здравоохранения Российской Федерации": "Министерство здравоохранения",
        "Министерство здравоохранения (России‎)": "Министерство здравоохранения",
        "Министерство здравоохранения (Республики X)": null,
    }

    for (let name of Object.keys(data)) {
        t.is(partialName(name, { lang: 'ru', country: 'ru' }), data[name]);
    }
})
