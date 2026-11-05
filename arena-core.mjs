// Camera-independent simulation, metres and seconds.
export function insidePolygon(x,z,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a.z>z)!==(b.z>z)&&x<(b.x-a.x)*(z-a.z)/(b.z-a.z)+a.x)inside=!inside}return inside}
export function withinArena(x,z,radius,polygon){return x*x+z*z<radius*radius&&(!polygon||insidePolygon(x,z,polygon))}
export function stepEnemy(e,dt,arena){dt=Math.min(.05,Math.max(0,dt));if(e.dead)return;e.time+=dt;const speed=e.speed*(e.flee>0?2.2:1);e.flee=Math.max(0,e.flee-dt);const nx=e.x+Math.sin(e.angle)*speed*dt,nz=e.z+Math.cos(e.angle)*speed*dt;if(withinArena(nx,nz,arena.radius,arena.polygon)){e.x=nx;e.z=nz}else e.angle+=Math.PI*.65;e.turn-=dt;if(e.turn<=0){e.angle+=Math.sin(e.time*1.7+e.seed)*.65;e.turn=1.5}e.flash=Math.max(0,e.flash-dt)}
export function blockedByDepth(targetZ,realDepth){return Number.isFinite(realDepth)&&realDepth>0&&targetZ>realDepth+.06}
export function damageEnemy(e){if(e.dead)return false;e.hp--;e.flash=.12;e.flee=1.4;e.angle+=1.1;if(e.hp<=0){e.dead=true;return true}return false}
export function stableSurface(history,p){history.push(p);if(history.length>18)history.shift();if(history.length<18)return false;return history.every(q=>Math.hypot(q.x-p.x,q.y-p.y,q.z-p.z)<.035)}
