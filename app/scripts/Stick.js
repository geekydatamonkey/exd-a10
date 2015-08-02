'use strict';

import _ from 'lodash';

export default class Stick {

  /**
  * constructor
  */
  constructor(config) {
    let defaults = {
      head: null,
      tail: null,
      length: 20,
      sketch: null,
      color: 100,
    };

    config = _.assign({}, defaults, config);

    if (! config.head) {
      throw new Error(`No head set.`);
    }
    if (! config.tail) {
      throw new Error(`No tail set.`);
    }
    if (! config.sketch) {
      throw new Error(`No sketch set.`);
    }

    Object.keys(config).forEach((key) => {
      this[key] = config[key];
    });

  }

  setLength(l) {
    this.length = l;
    return this;
  }

  /**
  * make sure the distance between head and tail
  * particles is this.length
  */
  update() {
    let dx = this.tail.position.x - this.head.position.x;
    let dy = this.tail.position.y - this.head.position.y;

    let distance = Math.sqrt(dx*dx + dy*dy);

    // the difference between stick length and the actual
    // distance.
    // Will be positive if too close and
    // negative if too far
    let diff = this.length - distance;

    // percent of distance each point will need to move
    // to wind up at the right spot
    let percent = diff/distance/2;
    let offsetX = dx * percent;
    let offsetY = dy * percent;

    this.head.position.x -= offsetX;
    this.head.position.y -= offsetY;

    this.tail.position.x += offsetX;
    this.tail.position.y += offsetY;

  }

  render() {
    let s = this.sketch;

    s.push();
    s.stroke(this.color);
    s.strokeWeight(1);
    s.line(
      this.head.position.x,
      this.head.position.y,
      this.tail.position.x,
      this.tail.position.y
    );
    s.pop();
  }

}
