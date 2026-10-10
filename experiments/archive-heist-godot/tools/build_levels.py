#!/usr/bin/env python3
"""Deterministic Archive Heist prototype. Each round has exactly one tampered year label."""
from pathlib import Path
import json,random
base=Path(__file__).resolve().parent.parent
raw=json.loads((base/'data/met-objects.json').read_text())
objects=raw['records']
assert len(objects)>=8
def century(year):
    return (-year+99)//100 if year<0 else (year+99)//100
def period(year):
    return f"{century(year)} w. p.n.e." if year<0 else f"{century(year)} w. n.e."
def tamper(year,seed):
    # Preserve BCE/CE sign: move to a different century, but keep a sensible fictitious year.
    return year + (240 if year>=0 else -240)
rng=random.Random(240610)
rounds=[]
for n in range(8):
    pick=rng.sample(objects,4)
    wrong_idx=rng.randrange(4)
    cards=[]
    for i,obj in enumerate(pick):
        year=obj['objectBeginDate']
        shown=tamper(year,n) if i==wrong_idx else year
        cards.append({'object_id':obj['objectID'],'title':obj['title'],'period':period(year),'display_year':shown,'catalog_year':year,'is_forged':i==wrong_idx,'image':obj['local_image'],'object_url':obj['objectURL']})
    assert sum(c['is_forged'] for c in cards)==1
    assert sum(period(c['display_year'])!=c['period'] for c in cards)==1
    rounds.append({'id':f'case-{n+1:02d}','cards':cards,'answer_object_id':pick[wrong_idx]['objectID']})
(base/'data/levels.json').write_text(json.dumps({'schema':'archive-heist.1','source':'The Met Open Access objects; all falsified dates are fictional gameplay artifacts','levels':rounds},ensure_ascii=False,indent=2)+'\n')
print('ARCHIVE_LEVEL_GEN: PASS rounds=',len(rounds),'records=',len(objects))
