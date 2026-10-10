#!/usr/bin/env node
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { boardFromInput } from '../games/breakout-lab/data/board-from-input.mjs';

const manifest=JSON.parse(fs.readFileSync('experiments/open-data-met-breaker/met-records.json','utf8'));
const fixture=JSON.parse(fs.readFileSync('games/breakout-lab/data/fixtures/met-vase-open-data.json','utf8'));
const project=JSON.parse(fs.readFileSync('games/breakout-lab/breakout-lab.json','utf8'));
assert.equal(fixture.id,'met-vase-open-data');
assert(manifest.records.length>=4,'at least four eligible works');
assert.equal(manifest.records.length,fixture.values.length,'one column per object');
assert.equal(new Set(manifest.records.map(o=>o.objectID)).size,manifest.records.length);
for(const work of manifest.records){
  assert.equal(work.isPublicDomain,true,'filter Open Access');
  assert(Number.isInteger(work.objectBeginDate) && work.objectBeginDate!==0,'valid date');
  assert(/^https:\/\//.test(work.primaryImageSmall),'valid thumbnail URL');
  assert(/^https:\/\//.test(work.objectURL),'valid source link');
}
const order=[...manifest.records].sort((a,b)=>a.objectBeginDate-b.objectBeginDate||a.objectID-b.objectID);
const scores=new Map(order.map((o,i)=>[o.objectID,Math.round((order.length-i)*100/order.length)]));
assert.deepEqual(fixture.values,manifest.records.map(o=>scores.get(o.objectID)),'deterministic rank mapping');
const board=boardFromInput(fixture);
assert.equal(board.columns,11);
assert.equal(board.brickCount,30);
assert.equal(boardFromInput(fixture).signature,board.signature,'stable SHA signature');
const js=JSON.stringify(project.layouts.find(l=>l.name==='Game'));
assert(js.includes('bo-museum-panel'),'museum info panel embedded');
assert(js.includes('met-vase-open-data'),'fixture embedded');
assert(js.includes('The Metropolitan Museum of Art'),'source attribution embedded');
assert(!js.includes('__BO_MET_RECORDS__'),'no unreplaced token');
const rounds=JSON.parse(fs.readFileSync('experiments/archive-heist-godot/data/levels.json','utf8')).levels;
assert.equal(rounds.length,8);
for(const game of rounds){
 assert.equal(game.cards.length,4);
 assert.equal(new Set(game.cards.map(o=>o.object_id)).size,4);
 assert.equal(game.cards.filter(o=>o.is_forged).length,1);
 assert.equal(game.cards.find(o=>o.is_forged).object_id,game.answer_object_id);
}
console.log('OPEN_DATA_GAME_TEST: PASS Met rights/filter + deterministic board + museum UI embed + 8 cases');
