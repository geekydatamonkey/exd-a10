/* jshint newcap: false */

'use strict';

import $ from 'jquery';
import p5 from 'p5';
import ParticleSystem from './ParticleSystem';
import { getRandomInt } from './util';

/**
* namespace
*/
window.app = window.app || {};
let app = window.app;

/**
* app variables
*/
let Vector = p5.Vector;
let config = { parent: '.canvas-wrapper' };
let $canvasWrapper = $(config.parent);
let particleSys;


app.particleSys = particleSys;

function sketch(s) {

  s.setup = function() {

    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    s.background(0);
    s.noStroke();

    particleSys = new ParticleSystem({
      sketch: s,
      gravitationalConstant: -5 * Math.pow(10,3),
      frictionFactor: 0.2,
    });

    app.particleSys = particleSys;

    //generateRandomTree();

  };

  function generateRandomTree() {
    let n = getRandomInt(20, 100);
    console.log(`Generating Tree: ${n} nodes`);

    // create a root
    particleSys.add( {
      position: new Vector(
        getRandomInt(0, s.width),
        getRandomInt(0, s.height)
      ),
      color: [255,0,0],
    });


    for (let i=0; i < n; i++) {

      let parentIdx = getRandomInt(0, particleSys.particles.length - 1);
      let parent = particleSys.particles[parentIdx];

      // create a new particle
      let p = particleSys.add( {
        position: new Vector(s.width/2, s.height/2),
        color: [
          getRandomInt(0, 255),
          getRandomInt(0, 255),
          getRandomInt(0, 255)
        ],
      });

      // attach particle to parent
      particleSys.connect(parent, p);
    }
  }

  s.draw = function() {
    s.background(0);
    particleSys.update().render();
  };

  // s.mouseClicked = function() {
  //   particleSys.removeAll();
  //   generateRandomTree();
  // };

  s.keyPressed = function() {
    if (s.key === ' ') {
      particleSys.removeAll();
    }
  };

  s.windowResized = function() {
    s.resizeCanvas( $canvasWrapper.innerWidth(), $canvasWrapper.innerHeight() );
    s.setup();
  };

}

function init() {
  return new p5(sketch);
}

export default { init };
