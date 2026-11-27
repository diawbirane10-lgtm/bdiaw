import * as THREE from 'three';

// Illustrations of operating principles only. No solver results or live telemetry.
const C = { navy: 0x143954, blue: 0x297eb2, pale: 0xdcebf5, metal: 0x829cb0, green: 0x257469, white: 0xf8fcff, gold: 0xc99c4b };
const mat = color => new THREE.MeshStandardMaterial({ color, roughness: .57, metalness: .12 });
function mesh(parent, geometry, material, position = [0,0,0]) {
  const m = new THREE.Mesh(geometry, material); m.position.set(...position);
  m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
}
const box = (p, s, pos, m) => mesh(p, new THREE.BoxGeometry(...s), m, pos);
const cyl = (p, r, h, pos, m) => mesh(p, new THREE.CylinderGeometry(r,r,h,16), m, pos);
function beam(parent, a, b, radius, material) {
  const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b), d = end.clone().sub(start);
  const m = cyl(parent, radius, d.length(), start.clone().add(end).multiplyScalar(.5).toArray(), material);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), d.normalize()); return m;
}
function flow(parent, points, color = C.blue) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  mesh(parent, new THREE.TubeGeometry(curve,24,.026,5,false),mat(C.metal));
  const material = mat(color);
  const dots = Array.from({length:5},()=>mesh(parent,new THREE.SphereGeometry(.075,8,6),material));
  return (time, direction = 1, visible = true) => dots.forEach((dot,i)=> {
    dot.visible = visible;
    dot.position.copy(curve.getPoint(((time*.18*direction+i/5)%1+1)%1));
  });
}
function cabinet(parent, x, z, color = C.navy) {
  const g = new THREE.Group(); g.position.set(x,0,z); parent.add(g);
  box(g,[.85,1.35,.75],[0,.9,0],mat(color));
  box(g,[.58,.35,.035],[0,1.15,.395],mat(C.pale));
  for(let i=0;i<3;i++)box(g,[.55,.035,.04],[0,.55+i*.13,.395],mat(C.metal));
  return g;
}

export function waveWorld(world) {
  const navy=mat(C.navy), metal=mat(C.metal), blue=mat(C.blue), gold=mat(C.gold);
  const waterGeometry = new THREE.PlaneGeometry(4.1,3.6,12,9);
  waterGeometry.rotateX(-Math.PI/2);
  const water = mesh(world,waterGeometry,mat(0x6eaec8),[-2,.45,0]);
  const positions = waterGeometry.attributes.position;
  const buoy = new THREE.Group(); world.add(buoy); buoy.position.set(-2,.85,0);
  cyl(buoy,.68,.35,[0,0,0],blue);
  cyl(buoy,.42,.22,[0,.28,0],gold);
  cyl(buoy,.1,.9,[0,.7,0],metal);
  box(buoy,[.7,.08,.55],[0,1.19,0],navy);
  beam(world,[-2,.18,0],[-2,.6,0],.08,metal);
  const generator = cabinet(world,.25,-.65,C.blue);
  // Rotor marker makes conversion visible without reporting a numerical output.
  const rotor = cyl(generator,.28,.08,[0,1.15,.46],gold); rotor.rotation.x=Math.PI/2;
  const mark=box(rotor,[.06,.13,.49],[0,0,0],navy); mark.rotation.y=.4;
  cabinet(world,1.65,.55);
  const tower = new THREE.Group();tower.position.set(3.1,0,-.7);world.add(tower);
  for(const z of [-.3,.3])for(const x of [-.3,.3])beam(tower,[x,.22,z],[x*.35,2.9,z*.35],.035,metal);
  for(const h of [1,1.75,2.5])beam(tower,[-.65,h,0],[.65,h,0],.035,metal);
  for(const z of [-.2,.2])beam(world,[2.85,2.5,z-.7],[3.65,2.65,z-.7],.015,navy);
  const ptoFlow=flow(world,[[-1.4,.68,0],[-.7,.3,0],[.25,.3,-.65]],C.gold);
  const generatorFlow=flow(world,[[.25,.3,-.3],[.25,.3,.55],[1.65,.3,.55]]);
  const gridFlow=flow(world,[[2.05,.3,.55],[3.1,.3,.55],[3.1,.3,-.7]]);
  const contact=box(world,[.32,.07,.12],[2.7,.4,.55],gold);
  return (time, delta, action) => {
    for(let i=0;i<positions.count;i++) {
      const x=positions.getX(i),z=positions.getZ(i);
      positions.setY(i,.11*Math.sin(x*2.3-time*1.6)+.055*Math.sin(z*2.8+time));
    }
    positions.needsUpdate=true;waterGeometry.computeVertexNormals();
    buoy.position.y=.9+.15*Math.sin(time*1.6);buoy.rotation.z=.055*Math.sin(time*1.6+.4);
    rotor.rotation.y=-time*1.6;
    ptoFlow(time);generatorFlow(time);gridFlow(time,1,!action);
    contact.rotation.z=action?-.7:0;
  };
}

export function batteryWorld(world) {
  const shell=mat(C.navy), metal=mat(C.metal), green=mat(C.green), gold=mat(C.gold);
  const pack = new THREE.Group();pack.position.set(-.8,0,0);world.add(pack);
  box(pack,[4.2,.18,2.9],[0,.35,0],shell);
  box(pack,[4.2,.45,.1],[0,.64,-1.4],shell);
  for(const x of [-2.05,2.05])box(pack,[.1,.45,2.9],[x,.64,0],shell);
  for(let row=0;row<3;row++)for(let col=0;col<5;col++) {
    const x=-1.55+col*.77,z=-.88+row*.88;
    cyl(pack,.29,1.1,[x,1.03,z],green);
    cyl(pack,.21,.04,[x,1.6,z],metal);
    box(pack,[.65,.03,.13],[x,1.65,z],gold);
  }
  box(pack,[1.25,.12,.5],[0,1.86,0],mat(C.blue));
  for(const x of [-1.75,1.75])cyl(pack,.065,1.35,[x,1.16,1.1],metal);
  cabinet(world,2.7,-.2,C.blue);
  const wireFlow=flow(world,[[1.25,.68,.75],[1.9,.4,.75],[2.7,.4,.75],[2.7,.7,.25]],C.gold);
  const arrow=mesh(world,new THREE.ConeGeometry(.14,.4,8),mat(C.gold),[1.85,.6,.75]);
  return (time,delta,action) => {
    wireFlow(time,action?-1:1);
    arrow.rotation.z=action?Math.PI/2:-Math.PI/2;
  };
}

export function driveWorld(world) {
  const navy=mat(C.navy),metal=mat(C.metal),gold=mat(C.gold),blue=mat(C.blue);
  const motor=new THREE.Group();motor.position.set(.5,1.45,0);world.add(motor);
  for(const x of [-1,1]) {
    const ring=mesh(motor,new THREE.TorusGeometry(.94,.11,8,28),navy,[x,0,0]);ring.rotation.y=Math.PI/2;
    box(world,[.5,.5,1.5],[x+.5,.48,0],metal);
  }
  for(let i=0;i<8;i++) {
    const a=i*Math.PI/4;
    const coil=cyl(motor,.16,1.85,[0,.78*Math.cos(a),.78*Math.sin(a)],i%2?gold:blue);coil.rotation.z=Math.PI/2;
  }
  const rotor=new THREE.Group();motor.add(rotor);
  const core=cyl(rotor,.52,1.65,[0,0,0],metal);core.rotation.z=Math.PI/2;
  const shaft=cyl(rotor,.12,3.7,[.4,0,0],navy);shaft.rotation.z=Math.PI/2;
  for(let i=0;i<4;i++) {
    const a=i*Math.PI/2;
    box(rotor,[1.4,.15,.3],[0,.48*Math.cos(a),.48*Math.sin(a)],i%2?blue:gold);
  }
  const marker=box(rotor,[.12,.16,.5],[2.17,.42,0],gold);
  cabinet(world,-2.8,-.6);
  const energy=flow(world,[[-2.8,.3,-.1],[-2.8,.3,1],[-.7,.3,1],[-.7,.9,.5]]);
  const switchA=box(world,[.28,.1,.28],[-2.3,.38,.5],mat(C.gold));
  const switchB=box(world,[.28,.1,.28],[-2.3,.38,1.1],mat(C.blue));
  let angle=0;
  return (time,delta,action) => {
    angle+=delta*(action?-1:1)*2;
    rotor.rotation.x=angle;
    energy(time);
    switchA.material.color.set(action?C.blue:C.gold);switchB.material.color.set(action?C.gold:C.blue);
    marker.visible=true;
  };
}
