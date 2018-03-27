
import test from 'ava';
import { JOINERS, createSplitAction } from './splitAction';

test('FirstPart joiner', t => {
    const data: { [name: string]: string } = {
        "Name": "Name",
        "New York, N.Y.": "New York",
    }

    const action = createSplitAction(/\s*[,;]+\s*/, { joiner: JOINERS.FirstPart });

    for (let name of Object.keys(data)) {
        t.is(action(name).name, data[name]);
    }
})

test('LastPart joiner', t => {
    const data: { [name: string]: string } = {
        "Name": "Name",
        "New York, N.Y.": "N.Y.",
    }

    const action = createSplitAction(/\s*[,;]+\s*/, { joiner: JOINERS.LastPart });

    for (let name of Object.keys(data)) {
        t.is(action(name).name, data[name]);
    }
})
