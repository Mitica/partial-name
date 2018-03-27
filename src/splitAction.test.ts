
import test from 'ava';
import { createPrefixAction, createSuffixAction } from './splitAction';

test('Default PrefixAction', t => {
    const data: { [name: string]: string } = {
        "Name": "Name",
        "New York, N.Y.": "New York",
    }

    const action = createPrefixAction(/\s*[,;]+\s*/);

    for (let name of Object.keys(data)) {
        t.is(action(name).name, data[name]);
    }
})

test('Default SuffixAction', t => {
    const data: { [name: string]: string } = {
        "Name": "Name",
        "New York, N.Y.": "N.Y.",
    }

    const action = createSuffixAction(/\s*[,;]+\s*/);

    for (let name of Object.keys(data)) {
        t.is(action(name).name, data[name]);
    }
})
