import test from 'node:test';
import assert from 'node:assert/strict';
import {withinArena,stepEnemy,damageEnemy,blockedByDepth,stableSurface} from './arena-core.mjs';
test('24 walkers stay on detected floor boundary for a ten minute simulation',()=>{
 const arena={radius:2,polygon:[{x:-.8,z:-.6},{x:.8,z:-.6},{x:.8,z:.6},{x:-.8,z:.6}]};
 const enemies=Array.from({length:24},(_,i)=>({x:0,z:0,angle:i,speed:.2,time:0,seed:i,turn:0,flee:0,flash:0}));
 for(let frame=0;frame<36000;frame++)for(const e of enemies){stepEnemy(e,1/60,arena);assert.ok(withinArena(e.x,e.z,arena.radius,arena.polygon));}
});
test('damage captures exactly once and dead creatures stop moving',()=>{const e={x:0,z:0,hp:2,time:0};assert.equal(damageEnemy(e),false);assert.equal(damageEnemy(e),true);assert.equal(damageEnemy(e),false);stepEnemy(e,.05,{radius:1});assert.equal(e.x,0);assert.equal(e.hp,0)});
test('real foreground prevents shots but missing depth is not invented',()=>{assert.equal(blockedByDepth(2,1),true);assert.equal(blockedByDepth(1,2),false);assert.equal(blockedByDepth(2,0),false);assert.equal(blockedByDepth(2,NaN),false)});
test('placement waits for 18 stable measurements and rejects jitter',()=>{const history=[];for(let i=0;i<17;i++)assert.equal(stableSurface(history,{x:0,y:0,z:0}),false);assert.equal(stableSurface(history,{x:0,y:0,z:0}),true);assert.equal(stableSurface(history,{x:.1,y:0,z:0}),false)});

import {waveRules,advanceRound} from './arena-core.mjs';
test('every wave increases speed while time stays playable',()=>{for(let i=1;i<100;i++){const a=waveRules(i),b=waveRules(i+1);assert.ok(b.speed>a.speed);assert.ok(b.seconds<=a.seconds&&b.seconds>=35);assert.ok(b.extraHP>=a.extraHP)}assert.equal(waveRules(1).seconds,100);assert.equal(waveRules(4).extraHP,1)});
test('clock loses exactly at zero and cannot run after win/loss',()=>{let r={state:'playing',remaining:1};advanceRound(r,.4,true);assert.equal(r.state,'playing');advanceRound(r,1,true);assert.deepEqual(r,{state:'lost',remaining:0});advanceRound(r,4,true);assert.equal(r.remaining,0);r={state:'won',remaining:20};advanceRound(r,10,true);assert.equal(r.remaining,20)});
test('lost tracking or hidden page pauses the clock',()=>{const r={state:'playing',remaining:30};advanceRound(r,20,false);assert.equal(r.remaining,30);advanceRound(r,2,true);assert.equal(r.remaining,28)});
import {jumpPoint,platformCenter} from './platforms.mjs';
test('jump lands at target and rises above linear path',()=>{const a={x:0,y:0,z:0},b={x:1,y:.8,z:1};assert.deepEqual(jumpPoint(a,b,0),a);const end=jumpPoint(a,b,1);assert.ok(Math.abs(end.y-b.y)<1e-8);assert.equal(end.x,b.x);assert.ok(jumpPoint(a,b,.5).y>.4);assert.equal(platformCenter([]),null)});
