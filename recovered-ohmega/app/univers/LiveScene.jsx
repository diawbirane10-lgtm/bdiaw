'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { waveWorld, batteryWorld, driveWorld } from './additional-scenes';
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';

// These procedural scenes illustrate a principle, rather than live measurements.
const fallbackImages = ['/project-images/smartsense/assembly-open.webp', '/project-images/ufls-smartgrid.svg', '/project-images/railway-traction-25kv.svg', '/project-images/wave-energy-conversion.svg', '/project-images/digital-twin-liion-battery.svg', '/project-images/digital-twin-electric-drive.svg'];
const palette = { navy: 0x143954, blue: 0x297eb2, pale: 0xdcebf5, white: 0xf8fcff, metal: 0x829cb0, green: 0x257469, amber: 0xdc943b };

function material(color, options = {}) { return new THREE.MeshStandardMaterial({ color, roughness: .54, metalness: .13, ...options }); }
function box(group, size, position, mat) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
  mesh.position.set(...position); mesh.castShadow = true; mesh.receiveShadow = true; group.add(mesh); return mesh;
}
function cylinder(group, radius, length, position, mat, radialSegments = 20) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, radialSegments), mat);
  mesh.position.set(...position); mesh.castShadow = true; mesh.receiveShadow = true; group.add(mesh); return mesh;
}
function beam(group, start, end, radius, mat) {
  const a = new THREE.Vector3(...start), b = new THREE.Vector3(...end);
  const mesh = cylinder(group, radius, a.distanceTo(b), a.clone().add(b).multiplyScalar(.5).toArray(), mat, 8);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.sub(a).normalize()); return mesh;
}
function wire(group, points, mat, radius = .025) {
  const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 36, radius, 6, false), mat); group.add(mesh); return curve;
}
function pulses(group, curve, mat, count = 4, radius = .065) {
  const dots = Array.from({ length: count }, () => {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(radius, 10, 8), mat); group.add(dot); return dot;
  });
  return (time, direction = 1, visible = true) => dots.forEach((dot, i) => {
    dot.visible = visible;
    const t = ((time * .16 * direction + i / count) % 1 + 1) % 1;
    dot.position.copy(curve.getPoint(t));
  });
}

function sensorWorld(world) {
  const shell = material(0x183343), pcb = material(palette.green), metal = material(palette.metal, { metalness: .65 });
  const gold = material(0xc6a050), blue = material(palette.blue), chip = material(0x13222b);
  box(world, [3.8, .13, 2.6], [0, .25, 0], shell);
  box(world, [3.8, .85, .13], [0, .72, -1.24], shell);
  box(world, [.13, .85, 2.6], [-1.84, .72, 0], shell);
  box(world, [.13, .85, 2.6], [1.84, .72, 0], shell);
  box(world, [3.8, .85, .13], [0, .72, 1.24], shell);
  box(world, [3.35, .08, 2.12], [0, .47, 0], pcb);
  box(world, [.58, .12, .58], [0, .59, -.02], chip);
  for (let i = 0; i < 6; i++) {
    box(world, [.04, .04, .2], [-.23 + i * .09, .59, -.4], metal);
    box(world, [.04, .04, .2], [-.23 + i * .09, .59, .38], metal);
  }
  for (let i = 0; i < 4; i++) {
    const x = -1.24 + i * .8;
    const port = cylinder(world, .17, .5, [x, .67, 1.43], metal); port.rotation.x = Math.PI / 2;
    const cable = cylinder(world, .065, .7, [x, .67, 1.98], chip); cable.rotation.x = Math.PI / 2;
    box(world, [.3, .18, .37], [x, .61, -.7], metal);
    wire(world, [[x, .53, -.3], [x, .53, .05], [.4, .53, .6]], gold, .012);
  }
  for (const x of [-1.55, 1.55]) for (const z of [-.94, .94]) cylinder(world, .07, .35, [x, .58, z], gold);
  const coil = new THREE.Mesh(new THREE.TorusGeometry(.43, .055, 8, 32), gold); coil.rotation.x = Math.PI / 2; coil.position.set(-.82, .65, -.03); world.add(coil);
  const lid = new THREE.Group(); world.add(lid);
  box(lid, [3.8, .16, 2.6], [0, 0, 0], blue);
  box(lid, [1.5, .04, .65], [0, .1, 0], chip);
  box(lid, [1.24, .02, .42], [0, .13, 0], material(0x96cadb, { emissive: 0x164358, emissiveIntensity: .25 }));
  const ringMat = new THREE.MeshBasicMaterial({ color: palette.blue, transparent: true, opacity: .5, depthWrite: false });
  const rings = Array.from({ length: 3 }, () => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.25, .018, 6, 48), ringMat.clone());
    ring.position.set(-1.2, .67, 2); world.add(ring); return ring;
  });
  const signal = wire(world, [[-1.2, .7, 1.5], [-1.2, 1, .2], [0, .8, 0], [1, 1.1, -.6]], material(0x70b7d8), .015);
  const updatePulses = pulses(world, signal, material(0x91d5f5, { emissive: 0x2e7b9d, emissiveIntensity: .8 }), 3, .05);
  let opening = 0;
  return (time, delta, action, immediate) => {
    opening = immediate ? Number(action) : THREE.MathUtils.damp(opening, Number(action), 5, delta);
    lid.position.set(0, 1.24 + opening * 2.1, -opening * .35);
    lid.rotation.z = opening * -.12;
    rings.forEach((ring, index) => {
      const phase = (time * .45 + index / 3) % 1;
      ring.scale.setScalar(1 + phase * 3.5); ring.position.z = 2 + phase * 1.5; ring.material.opacity = (1 - phase) * .55;
    });
    updatePulses(time, 1, action);
  };
}

function gridWorld(world) {
  const metal = material(palette.metal, { metalness: .65 }), navy = material(palette.navy), pale = material(palette.pale), blue = material(palette.blue);
  const tower = new THREE.Group(); tower.position.set(-2.4, .2, -.9); world.add(tower);
  const top = 3.9;
  for (const x of [-1, 1]) for (const z of [-1, 1]) beam(tower, [x * .5, 0, z * .5], [x * .15, top, z * .15], .045, metal);
  for (let n = 0; n < 4; n++) {
    const y = n * .85, w = .5 - n * .075, w2 = w - .075;
    for (const z of [-1, 1]) { beam(tower, [-w, y, z * w], [w2, y + .85, z * w2], .025, metal); beam(tower, [w, y, z * w], [-w2, y + .85, z * w2], .025, metal); }
  }
  for (const y of [2.5, 3.3]) beam(tower, [-1, y, 0], [1, y, 0], .05, metal);
  for (const z of [-.3, .3]) wire(world, [[-2.4, 3.5, z - .9], [-1.1, 2.8, z - .9], [.2, 3.1, z - .9]], material(0x5f7a90), .018);
  box(world, [1, 1.6, 1], [.1, 1, -.7], navy);
  box(world, [.76, .51, .04], [.1, 1.36, -.18], material(0x92c9de, { emissive: 0x24516a, emissiveIntensity: .4 }));
  for (let i = 0; i < 3; i++) box(world, [.64, .035, .06], [.1, .73 + i * .12, -.17], metal);
  const states = [], flows = [];
  for (let i = 0; i < 3; i++) {
    const x = -1.7 + i * 1.9, z = 1.65;
    box(world, [.84, 1.05, .84], [x, .73, z], pale);
    box(world, [.95, .12, .95], [x, 1.32, z], metal);
    const lampMat = material(palette.blue, { emissive: palette.blue, emissiveIntensity: .45 });
    box(world, [.42, .29, .04], [x, .93, z + .44], lampMat);
    box(world, [.2, .36, .05], [x, .46, z + .44], navy);
    const breaker = box(world, [.28, .06, .11], [x, .34, .83], blue);
    states.push({ lampMat, breaker });
    const path = wire(world, [[.1, .27, -.1], [.1, .27, .45], [x, .27, .75], [x, .27, 1.25]], material(0x87acc5), .025);
    flows.push(pulses(world, path, material(0x3993bf, { emissive: palette.blue, emissiveIntensity: .4 }), 3, .055));
  }
  let incidentTime = null;
  return (time, delta, action, immediate) => {
    if (action && incidentTime === null) incidentTime = time;
    if (!action) incidentTime = null;
    states.forEach(({ lampMat, breaker }, i) => {
      const disconnected = action && i > 0 && (immediate || time - incidentTime >= (i - 1) * .75);
      lampMat.color.set(disconnected ? palette.amber : palette.blue);
      lampMat.emissive.set(disconnected ? 0x6b3e0e : palette.blue);
      breaker.rotation.z = disconnected ? -.7 : 0;
      flows[i](time, 1, !disconnected);
    });
  };
}

function trainWorld(world) {
  const navy = material(palette.navy), metal = material(palette.metal, { metalness: .7 }), white = material(palette.white), blue = material(palette.blue);
  const ties = [];
  for (let i = 0; i < 17; i++) ties.push(box(world, [.1, .08, 1.8], [-3.6 + i * .45, .25, 0], material(0xabc0d0)));
  for (const z of [-.65, .65]) box(world, [8, .08, .08], [0, .33, z], metal);
  // Contact wire stays straight; the messenger sags between the two supports.
  const contactY = 3.05;
  const messengerY = x => 3.75 - .35 * (1 - (x / 3.6) ** 2);
  for (const x of [-3.6, 3.6]) {
    beam(world, [x, .2, -1.65], [x, 4, -1.65], .065, metal);
    beam(world, [x, 3.75, -1.65], [x, 3.75, .15], .045, metal);
    beam(world, [x, 3.1, -1.65], [x, 3.75, -.2], .035, metal);
    // Insulators and a steady arm support the contact wire from the side.
    cylinder(world, .075, .22, [x, 3.64, 0], material(0x586956));
    beam(world, [x, 3.1, -1.35], [x, contactY, 0], .022, metal);
  }
  wire(world, [[-4, contactY, 0], [0, contactY, 0], [4, contactY, 0]], navy, .018);
  wire(world, Array.from({length:17}, (_,i) => {const x=-3.6+i*.45;return [x,messengerY(x),0];}), metal, .018);
  for (const x of [-3, -2, -1, 0, 1, 2, 3]) beam(world, [x, contactY, 0], [x, messengerY(x), 0], .012, metal);
  const train = new THREE.Group(); world.add(train);
  box(train, [4.4, .95, 1.28], [0, 1.15, 0], white);
  box(train, [4.3, .14, 1.33], [0, .88, 0], blue);
  box(train, [3.6, .18, 1.12], [-.2, 1.72, 0], metal);
  const nose = box(train, [.68, .78, 1.2], [2.22, 1.08, 0], white); nose.rotation.z = -.24;
  box(train, [.05, .39, .97], [2.52, 1.25, 0], navy).rotation.z = -.24;
  for (let i = 0; i < 6; i++) for (const z of [-.655, .655]) box(train, [.4, .38, .025], [-1.67 + i * .57, 1.34, z], navy);
  const wheels = [];
  for (const x of [-1.45, 1.35]) for (const z of [-.66, .66]) {
    const wheel = cylinder(train, .25, .13, [x, .57, z], navy); wheel.rotation.x = Math.PI / 2;
    const marker = box(wheel, [.07, .14, .32], [0, .03, 0], metal); marker.rotation.y = .3; wheels.push(wheel);
  }
  // Single-arm articulated pantograph, with the contact strip exactly under the wire.
  box(train, [.75, .08, .65], [-.3, 1.85, 0], navy);
  for (const z of [-.17, .17]) {
    beam(train, [-.55, 1.9, z], [.35, 2.43, z], .035, navy);
    beam(train, [.35, 2.43, z], [-.3, 2.99, z], .028, navy);
  }
  beam(train, [.35, 2.43, -.22], [.35, 2.43, .22], .045, metal);
  box(train, [.16, .07, .85], [-.3, 3.015, 0], metal);
  box(train, [.10, .025, .72], [-.3, 3.0375, 0], navy);
  box(world, [.8, 1.1, .8], [-2.6, .78, 2.1], material(palette.pale));
  box(world, [.5, .25, .04], [-2.6, 1.01, 2.52], blue);
  const route = wire(world, [[-2.6, .28, 1.7], [-2.6, .28, 1.1], [.6, .28, 1.1], [.6, .28, .65]], material(0x97b8ce), .025);
  const moving = pulses(world, route, material(0x3a9cc6, { emissive: palette.blue, emissiveIntensity: .6 }), 6, .065);
  let distance = 0, wheelAngle = 0;
  return (time, delta, action) => {
    distance += delta * (action ? .3 : .9);
    wheelAngle -= delta * (action ? .9 : 2.3);
    wheels.forEach(wheel => { wheel.rotation.y = wheelAngle; });
    ties.forEach((tie, i) => { tie.position.x = -3.8 + ((i * .45 - distance) % 7.65 + 7.65) % 7.65; });
    moving(time, action ? -1 : 1);
  };
}

export default function LiveScene({ index = 0, lang = 'en', onReady }) {
  const mount = useRef(null), runtime = useRef(null), configuration = useRef({ paused: false, action: false });
  const [paused, setPaused] = useState(false), [action, setAction] = useState(false), [failed, setFailed] = useState(false);
  const fr = lang === 'fr';
  configuration.current = { paused, action };

  useEffect(() => {
    const host = mount.current;
    if (!host || failed) return;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
    catch {
      try { renderer = new SVGRenderer(); renderer.setQuality('low'); }
      catch { setFailed(true); return; }
    }
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) { configuration.current.paused = true; setPaused(true); }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 60);
    const world = new THREE.Group(); scene.add(world);
    const floor = box(world, [9, .15, 6.4], [0, .08, .1], material(0xf2f7fb)); floor.castShadow = false;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
    if (renderer.shadowMap) { renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; }
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0xffffff, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true'); renderer.domElement.style.touchAction = 'pan-y';
    renderer.domElement.style.display = 'block'; renderer.domElement.style.width = '100%'; renderer.domElement.style.height = '100%';
    host.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xa7bed1, 2.8));
    scene.add(new THREE.AmbientLight(0xffffff, .6));
    const light = new THREE.DirectionalLight(0xffffff, 3.2); light.position.set(4, 9, 6); light.castShadow = true;
    light.shadow.mapSize.set(1024, 1024); light.shadow.camera.left = -7; light.shadow.camera.right = 7; light.shadow.camera.top = 7; light.shadow.camera.bottom = -7; light.shadow.normalBias = .04; if (renderer.domElement.tagName.toLowerCase() === 'svg') light.intensity = .65; scene.add(light);
    const animate = [sensorWorld, gridWorld, trainWorld, waveWorld, batteryWorld, driveWorld][index](world);
    let yaw = .68, elevation = .53, elapsed = 0, last = 0, frame = 0, visible = false, disposed = false;
    const target = new THREE.Vector3(0, index === 0 ? 1.35 : 1.45, 0);
    function updateCamera() {
      const radius = camera.aspect < 1.1 ? 15 : 12.5;
      camera.position.set(Math.sin(yaw) * Math.cos(elevation) * radius, Math.sin(elevation) * radius + target.y, Math.cos(yaw) * Math.cos(elevation) * radius);
      camera.lookAt(target);
    }
    function paint(delta = 0, immediate = false) { animate(elapsed, delta, configuration.current.action, immediate); updateCamera(); renderer.render(scene, camera); }
    function shouldRun() { return !disposed && visible && !document.hidden && !configuration.current.paused; }
    function tick(now) {
      frame = 0;
      if (!shouldRun()) return;
      const delta = Math.min((now - (last || now)) / 1000, .05); last = now; elapsed += delta;
      paint(delta);
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      if (disposed) return;
      if (frame) cancelAnimationFrame(frame); frame = 0; last = 0;
      paint(0, configuration.current.paused);
      if (shouldRun()) frame = requestAnimationFrame(tick);
    }
    const size = new ResizeObserver(() => {
      const width = host.clientWidth, height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); sync();
    }); size.observe(host);
    const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; sync(); }, { threshold: .03 }); observer.observe(host);
    let drag = null;
    const onDown = event => { if (event.button !== 0) return; drag = { x: event.clientX, y: event.clientY }; renderer.domElement.setPointerCapture(event.pointerId); };
    const onMove = event => {
      if (!drag) return;
      yaw -= (event.clientX - drag.x) * .007;
      elevation = THREE.MathUtils.clamp(elevation + (event.clientY - drag.y) * .005, .2, 1.15);
      drag = { x: event.clientX, y: event.clientY }; paint(0, configuration.current.paused);
    };
    const onUp = () => { drag = null; };
    const onLost = event => { event.preventDefault(); setFailed(true); if (frame) cancelAnimationFrame(frame); frame = 0; };
    const onPreference = () => { if (preference.matches) { configuration.current.paused = true; setPaused(true); sync(); } };
    renderer.domElement.addEventListener('pointerdown', onDown); renderer.domElement.addEventListener('pointermove', onMove); renderer.domElement.addEventListener('pointerup', onUp); renderer.domElement.addEventListener('pointercancel', onUp); renderer.domElement.addEventListener('lostpointercapture', onUp); renderer.domElement.addEventListener('webglcontextlost', onLost);
    document.addEventListener('visibilitychange', sync); preference.addEventListener('change', onPreference);
    runtime.current = { sync, reset() { yaw = .68; elevation = .53; sync(); }, rotate(direction) { yaw += direction * .24; paint(0, configuration.current.paused); } };
    sync();
    onReady?.();
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); size.disconnect(); document.removeEventListener('visibilitychange', sync); preference.removeEventListener('change', onPreference);
      const canvas = renderer.domElement;
      canvas.removeEventListener('pointerdown', onDown); canvas.removeEventListener('pointermove', onMove); canvas.removeEventListener('pointerup', onUp); canvas.removeEventListener('pointercancel', onUp); canvas.removeEventListener('lostpointercapture', onUp); canvas.removeEventListener('webglcontextlost', onLost);
      const geometries = new Set(), materials = new Set();
      scene.traverse(object => { if (object.geometry) geometries.add(object.geometry); if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach(item => materials.add(item)); });
      geometries.forEach(item => item.dispose()); materials.forEach(item => item.dispose()); renderer.dispose?.(); canvas.remove(); runtime.current = null;
    };
  }, [index, failed]);

  useEffect(() => { runtime.current?.sync(); }, [paused, action]);
  const labels = fr ? ['Ouvrir le boîtier', 'Déclencher un incident', 'Passer en freinage', 'Couper l’injection réseau', 'Passer en charge', 'Inverser la rotation'] : ['Open the enclosure', 'Trigger an incident', 'Switch to braking', 'Disconnect grid injection', 'Switch to charging', 'Reverse rotation'];
  const activeLabels = fr ? ['Fermer le boîtier', 'Restaurer les départs', 'Reprendre la traction', 'Rétablir l’injection réseau', 'Passer en décharge', 'Rétablir la rotation'] : ['Close the enclosure', 'Restore the feeders', 'Resume traction', 'Reconnect grid injection', 'Switch to discharging', 'Restore rotation'];
  const states = fr ? [action ? 'Boîtier ouvert · chaîne de mesure visible' : 'Boîtier fermé · scan du capteur', action ? 'Incident illustratif · délestage par étapes' : 'Réseau alimenté · départs disponibles', action ? 'Freinage · retour d’énergie illustratif' : 'Traction · énergie vers le train', action ? 'Houle active · injection réseau coupée' : 'Houle active · conversion et injection réseau', action ? 'Charge · énergie vers les cellules' : 'Décharge · énergie vers la charge', action ? 'Commande inversée · rotation inverse' : 'Commande directe · rotation du rotor'] : [action ? 'Enclosure open · measurement chain exposed' : 'Enclosure closed · sensor scan', action ? 'Illustrative incident · staged shedding' : 'Grid supplied · feeders available', action ? 'Braking · illustrative energy return' : 'Traction · energy to the train', action ? 'Waves active · grid injection disconnected' : 'Waves active · conversion and grid injection', action ? 'Charging · energy into cells' : 'Discharging · energy to load', action ? 'Reversed control · reverse rotation' : 'Forward control · rotor rotation'];
  return <div className="u-live-scene">
    {failed ? <div className="u-live-fallback"><img src={fallbackImages[index]} alt={fr ? 'Illustration du projet' : 'Project illustration'}/><p role="status">{fr ? 'La vue 3D est indisponible sur cet appareil. L’illustration et l’étude restent accessibles.' : 'The 3D view is unavailable on this device. The illustration and case study remain available.'}</p></div> : <>
      <div className="u-live-canvas" ref={mount} role="img" aria-label={fr ? `Vue 3D conceptuelle interactive. ${states[index]}.` : `Interactive conceptual 3D view. ${states[index]}.`}/>
      <div className="u-live-controls"><button type="button" onClick={() => setAction(value => !value)} aria-pressed={action}>{action ? activeLabels[index] : labels[index]}</button><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? fr ? 'Reprendre' : 'Play' : fr ? 'Pause' : 'Pause'}</button><button type="button" onClick={() => runtime.current?.rotate(-1)} aria-label={fr ? 'Tourner la vue vers la gauche' : 'Rotate the view left'}>↶</button><button type="button" onClick={() => runtime.current?.rotate(1)} aria-label={fr ? 'Tourner la vue vers la droite' : 'Rotate the view right'}>↷</button><button type="button" onClick={() => runtime.current?.reset()}>{fr ? 'Réinitialiser la vue' : 'Reset view'}</button></div>
      <p className="u-live-status" aria-live="polite">{states[index]} · {fr ? 'Faire glisser pour tourner' : 'Drag to rotate'}</p>
    </>}
  </div>;
}
