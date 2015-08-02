/* jshint newcap: false */

'use strict';

import $ from 'jquery';
import _ from 'lodash';
import p5 from 'p5';
import ParticleSystem from './ParticleSystem';
//import { getRandomInt } from './util';

let Vector = p5.Vector;

let config = {
  parent: '.canvas-wrapper',
};

let $canvasWrapper = $(config.parent);
let particleSys;

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

    window.particleSys = particleSys;

    let p0 = particleSys.add( {
      position: new Vector(s.width/2 - 100, s.height/2),
      color: 'red',
    });

    let p1 = particleSys.add( {
      position: new Vector(s.width/2 + 100, s.height/2),
      color: 'blue',
    });

    let p2 = particleSys.add( {
      position: new Vector(s.width/2 + 200, s.height/2 - 100),
      color: 'green',
    });

    particleSys.connect(p0, p1);
    particleSys.connect(p1, p2);

    for (let i=0; i < 6; i++) {
      let p = particleSys.add( {
        position: new Vector(s.width/2, s.height/2),
        color: 'magenta',
      });
      particleSys.connect(p2, p);
    }
    for (let i=0; i < 4; i++) {
      let p = particleSys.add( {
        position: new Vector(s.width/2 + i, s.height/2 - i),
        color: 'yellow',
      });
      particleSys.connect(p1, p);
    }

    let last = _.last(particleSys.particles);
    for (let i=0; i < 3; i++) {
      let p = particleSys.add( {
        position: new Vector(s.width/2, s.height/2),
        color: 'orange',
      });
      particleSys.connect(last, p);
    }

  };

  s.draw = function() {
    s.background(0);
    particleSys.update().render();
  };

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
