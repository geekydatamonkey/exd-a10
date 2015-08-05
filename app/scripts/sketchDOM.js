'use strict';

/**
* loads a dom from given url, and sketches it 
* using particle sys
* TODO: Break this monstrosity apart
*/

import p5 from 'p5';
import $ from 'jquery';
import walkTheDom from './walkTheDom';
import { 
  getRandomInt,
  addProtocolIfNeeded,
  getColorOfNode 
} from './util';
let Vector = p5.Vector;

window.app = window.app || {};
let app = window.app;
app.MAX_NODES = 300;

export default function sketchDOM(url) {

  url = addProtocolIfNeeded(url);

  // load DOM
  let domPromise = Promise.resolve($.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=?')
  ).then((data) => {
    let parser = new DOMParser();
    let dom = parser.parseFromString(data.contents, 'text/html');
    app.dom = dom;
    return dom;
  }).then((dom) => {
    console.log('Dom Loaded.', dom);
    return dom;
  });

  // setup sketch
  let particleSysPromise = new Promise(function(resolve) {
      
      // FIXME: is there a better way to check if
      // setup() has already ran on sketch?
      (function poll() {
        if (app.particleSys) {
          resolve(app.particleSys);
        } else {
          setTimeout(poll, 100);
        }
      })();

  }).then((particleSys) => {
    console.log('particleSys', particleSys);
    return particleSys;
  });

  // check that dom is loaded and particleSys is spawned
  Promise.all([domPromise, particleSysPromise])
    .then(([dom, particleSys]) => {

      // reset particle system;
      app.particleSys.removeAll();

      let s = app.sketch;
      
      // walk the dom, creating new particles
      walkTheDom(dom.body, function(node) {

        // if we're at MAX_NODES, then we're done
        if (app.particleSys.particles.length >= app.MAX_NODES) {
          return;
        }

        // ignore all but doc and element nodes
        if (! (node.nodeType === 1 || node.nodeType === 9)) {
          return;
        }

        let color = getColorOfNode(node);

        let p = particleSys.add( {
          position: new Vector(
            getRandomInt(s.width/2 - 50, s.width/2 + 50),
            getRandomInt(s.height/2 - 50, s.height/2 + 50)
          ),
          color: color,
          name: node.nodeName,
        });

        // keep a reference to this particle on
        // each of the children
        if (node.children) {
          for (let i=0, l = node.children.length; i < l; i++) {
            let child = node.children[i];
            child._parentParticle = p;
          }
        }

        // if this node had a parent, connect it.
        if (node._parentParticle) {
          particleSys.connect(node._parentParticle, p);
        } else {
          //console.log('no parent', node);
        }

      });
    });
}