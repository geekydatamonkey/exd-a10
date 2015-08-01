// sketch.js
/*jshint newcap: false */

'use strict';

const p5 = require('p5');
const $ = require('jquery');

let $canvasWrapper = $('.canvas-wrapper');

/**
* sketch function, which allows p5 to run in instance mode
*/
function mySketch(s) {

  /**
  * p5 setup
  */
  s.setup = function() {

    // create canvas and put in canvasWrapper
    s.createCanvas($canvasWrapper.innerWidth(), $canvasWrapper.innerHeight())
      .parent($canvasWrapper[0]);

    // load data from a mcad.edu
    $.ajax({
        type: 'GET',
        url: 'http://mcad.edu',
        dataType: 'jsonp',
    }).success( function( data ) {
        $canvasWrapper.html(data);
    });

  };

  /**
  * p5 draw
  * continuously loops
  */
  s.draw = function() {
  };

  /**
  * resize canvas on window resize
  */
  s.windowResized = function() {
    s.resizeCanvas($canvasWrapper.innerWidth(), $canvasWrapper.innerHeight());
  };

}

function init() {
  return new p5(mySketch);
}

module.exports = {
  init
};
