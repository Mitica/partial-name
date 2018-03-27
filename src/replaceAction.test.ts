
import test from 'ava';
import { createReplaceAction } from './replaceAction';

test('remove searchValue', t => {
    const data: { [name: string]: string } = {
        "Name": null,
        "New York, N.Y. (album)": "New York, N.Y.",
    }

    const action = createReplaceAction(/\s*\(.+\)$/);

    for (let name of Object.keys(data)) {
        t.is(action(name).name, data[name]);
    }
})

test('replace searchValue', t => {
    const data: { [name: string]: string } = {
        "Name": null,
        "New York, N.Y. (album)": "New York, N.Y.?",
    }

    const action = createReplaceAction(/\s*\(.+\)$/, { replaceValue: '?' });

    for (let name of Object.keys(data)) {
        t.is(action(name).name, data[name]);
    }
})
