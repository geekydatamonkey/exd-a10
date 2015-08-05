
'use strict';

/**
* Returns a random integer between min (included)
* and max (included). 
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
* Returns a random float between min and max,
* including min, but excluding max.
*/
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
* a better modulo. Handles negatives correctly.
*/
function mod(n,m) {
  return ((n%m)+m)%m;
}


function addProtocolIfNeeded(link) {
    if (link.search(/^http[s]?\:\/\//) === -1) {
        link = 'http://' + link;
    }
    return link;
}


function getColorOfNode(domNode) {
  let colors = {
    // headings
    'h1': [255,0,0],
    'h2': [255,20,20],
    'h3': [255,40,40],
    'h4': [255,60,60],
    'h5': [255,80,80],

    // semantic sections
    'header': [255,100,100],
    'main': [255,120,120],
    'nav': [255,140, 140],
    'section': [255, 160, 160],
    'article': [255, 180, 180],

    // lists
    'ul': [0,255,255],
    'ol': [20,255,255],
    'dl': [40,255,255],
    'li': [150,255,255],
    'dd': [180,255,255],


    // text and hypertext
    'p': [100,100,255],
    'a': [0,0,255],


    // media
    'img': [255,0,255],
    'figure': [255,10,255],
    'figcaption': [255, 40, 255],
    'video': [255,50,255],
    'audio': [255,100,255],
    'embed': [255,150,255],
    'iframe': [255,200,255],

    // table
    'table': [255,255,0],
    'tr': [255,255,20],
    'td': [255,255,40],
    'th': [255,255,150],
    'tbody': [255,255,160],
    'thead': [255,255,170],

    // forms
    'form': [0, 255, 0],
    'fieldset': [10, 200, 10],
    'input': [20, 255, 0],
    'label': [40, 255,40],
    'option': [60, 255, 60],
    'select': [80, 255, 80],
    'textarea': [100,255,100],
    'button': [200,255,200],

    // non-semantic markup
    'span': [120,120,120],
    'div': [100,100,100],
    'br': [70,70,70],
    'body': [255,255,255],
    'head': [0,0,0],
    'default': [50,50,50],
  };

  if (! domNode.tagName) {
    return colors.default;
  }

  let tagName = domNode.tagName.toLowerCase();
  return colors[tagName] || colors.default;

}

export default {
  getRandomInt,
  getRandomFloat,
  mod,
  getColorOfNode,
  addProtocolIfNeeded,
};