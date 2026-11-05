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
