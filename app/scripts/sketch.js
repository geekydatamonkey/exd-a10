/* jshint newcap: false */

'use strict';

import $ from 'jquery';
import _ from 'lodash';
import p5 from 'p5';
import ParticleSystem from './ParticleSystem';

/**
* namespace
*/
window.app = window.app || {};
let app = window.app;

/**
* app variables
*/
let config = { parent: '.canvas-wrapper' };
let $canvasWrapper = $(config.parent);


function sketch(s) {

  s.setup = function() {

    s.createCanvas(
      $canvasWrapper.innerWidth(),
      $canvasWrapper.innerHeight()
    ).parent($canvasWrapper[0]);

    s.background(0);
    s.noStroke();

    app.particleSys = new ParticleSystem({
      sketch: s,
      gravitationalConstant: -5 * Math.pow(10,3),
      frictionFactor: 0.2,
    });

  };


  s.draw = function() {
    s.background(0);

    if (app.url) {
      s.push();
      s.translate(s.width, s.height);
      s.textAlign(s.RIGHT);
      s.text(app.url, -10, -10);
      s.pop();  
    }

    app.particleSys.update().render();

    // if hovering over any particle console.log tag name
    _.forEach(app.particleSys.particles, (p) => {
      let dist = s.dist(p.position.x, p.position.y, s.mouseX, s.mouseY);
      if (dist < p.radius) {
        s.text(p.name, p.position.x + 20, p.position.y+ 20);
      }
    });

  };

  s.keyPressed = function() {
    if (s.key === ' ') {
      app.particleSys.removeAll();
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
