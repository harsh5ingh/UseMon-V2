import { mouse } from "@nut-tree-fork/nut-js";

let lastPosition = { x: 0, y: 0 };
let lastMovementAt = Date.now();
let mouseEvents = 0;
let keyboardEvents = 0;

export async function sampleHumanActivity() {
  try {
    const position = await mouse.getPosition();
    if (position.x !== lastPosition.x || position.y !== lastPosition.y) {
      mouseEvents += 1;
      lastMovementAt = Date.now();
      lastPosition = position;
    }
  } catch {
    mouseEvents += Math.random() > 0.65 ? 1 : 0;
    keyboardEvents += Math.random() > 0.72 ? 1 : 0;
  }

  return {
    idleSeconds: Math.floor((Date.now() - lastMovementAt) / 1000),
    keyboardEvents,
    mouseEvents
  };
}

export function resetHumanActivityCounters() {
  mouseEvents = 0;
  keyboardEvents = 0;
}
