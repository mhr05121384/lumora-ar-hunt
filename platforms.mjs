export function jumpPoint(a,b,t){t=Math.max(0,Math.min(1,t));return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t+Math.sin(Math.PI*t)*(.22+Math.abs(b.y-a.y)*.4),z:a.z+(b.z-a.z)*t}}
export function platformCenter(poly){if(poly.length<3)return null;const p=poly.reduce((a,b)=>({x:a.x+b.x,y:a.y+b.y,z:a.z+b.z}),{x:0,y:0,z:0});return {x:p.x/poly.length,y:p.y/poly.length,z:p.z/poly.length}}
