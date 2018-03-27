
import test from 'ava';
import { partialName } from './partialName';
import { createReplaceAction } from './replaceAction';
import { EndParenthesesReplaceAction } from './actions';

test('default actions', t => {
    const data: { [name: string]: string } = {
        "Name": "Name",
        "New York, N.Y.": "New York",
        "New York, N.Y. (album)": "New York, N.Y.",
    }

    for (let name of Object.keys(data)) {
        t.is(partialName(name), data[name]);
    }
})

test('custom actions', t => {
    const data: { [name: string]: string } = {
        "Name": "Name",
        "New York, N.Y.": "New York; NY",
        "New York, N.Y. (album)": "New York; NY",
    }

    const actions = [
        createReplaceAction(/,+/g, { replaceValue: ';', stopOnSuccess: false }),
        createReplaceAction(/\.+/g, { stopOnSuccess: false }),
        EndParenthesesReplaceAction,
    ];

    for (let name of Object.keys(data)) {
        t.is(partialName(name, { actions }), data[name]);
    }
})
