
import test from 'ava';
import { getActionsData, ActionInfo } from './actions';

const actionsData = getActionsData();

buildTests(actionsData.actions);

Object.keys(actionsData.languages).forEach(lang => {
    buildTests(actionsData.languages[lang].actions);
    
    Object.keys(actionsData.languages[lang].countries).forEach(country => {
        buildTests(actionsData.languages[lang].countries[country].actions);
    });
});

function buildTests(actionsInfo: ActionInfo[]) {
    actionsInfo.forEach(info => {
        for (let example of info.examples) {
            test(`${info.name}`, t => {
                t.is(info.action(example[0]).name, example[1], `${example[0]} => ${example[1]}`);
            })
        }
    })
}
