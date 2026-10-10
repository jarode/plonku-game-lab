#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { boardFromInput } from '../games/breakout-lab/data/board-from-input.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = path.join(root, 'experiments/open-data-met-breaker/met-records.json');
const fixturePath = path.join(root, 'games/breakout-lab/data/fixtures/met-vase-open-data.json');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const recs = source.records;
if (!Array.isArray(recs) || recs.length < 4 || recs.length > 16) throw Error('Expected 4–16 objects');
const ids = new Set();
for (const r of recs) {
  if (!r.isPublicDomain || !r.primaryImageSmall || !Number.isInteger(r.objectBeginDate)) throw Error('Non-eligible Met object');
  if (ids.has(r.objectID)) throw Error('Duplicate object');
  ids.add(r.objectID);
}
const order = [...recs].sort((a,b)=>a.objectBeginDate-b.objectBeginDate || a.objectID-b.objectID);
const scores = new Map(order.map((o,i)=>[o.objectID,Math.round((order.length-i)*100/order.length)]));
const fixture = {id:'met-vase-open-data',values:recs.map(o=>scores.get(o.objectID))};
const board = boardFromInput(fixture);
if (process.argv.includes('--write')) {
 fs.writeFileSync(fixturePath,JSON.stringify(fixture,null,2)+'\n');
}
if (process.argv.includes('--check')) {
 const actual=JSON.parse(fs.readFileSync(fixturePath,'utf8'));
 if (JSON.stringify(actual)!==JSON.stringify(fixture)) throw Error('Fixture drift');
}
console.log('MET_BREAKER_ADAPTER: PASS',JSON.stringify({objects:recs.length,columns:board.columns,bricks:board.brickCount,signature:board.signature,values:fixture.values}));
