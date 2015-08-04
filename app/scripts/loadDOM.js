'use strict';

/**
* returns a DOM document object given a url
**/

import $ from 'jquery';

export default function loadDOM(url, callback) {

  let doc;
  let promise = $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=?');

  // parse HTML
  promise.done((data) => {
    let parser = new DOMParser();
    doc = parser.parseFromString(data.contents, 'text/html');
    callback(doc);
  });

}

