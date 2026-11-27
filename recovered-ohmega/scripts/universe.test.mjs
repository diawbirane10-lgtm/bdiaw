import test from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../app/portfolio-data.js';
import { scenes, sceneForProject } from '../app/univers/catalog.mjs';

test('every featured project has a unique interactive chapter and case-study link', () => {
  assert.equal(scenes.length, projects.length);
  assert.equal(new Set(scenes.map(scene => scene.id)).size, scenes.length);
  for (const project of projects) {
    const scene = sceneForProject(project.slug);
    assert.ok(scene, `Missing 3D chapter for ${project.slug}`);
    for (const language of ['fr', 'en']) {
      for (const field of ['verb','title','text','caption','status']) assert.ok(scene[language][field]);
    }
  }
});
