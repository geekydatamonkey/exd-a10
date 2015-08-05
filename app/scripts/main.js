/* jshint devel:true */

'use strict';

import $ from 'jquery';
import sketch from './sketch';
import sketchDOM from './sketchDOM';

/**
* namespace
*/
window.app = window.app || {};
let app = window.app;

app.sketch = sketch.init();


// Handle url submission on click/enter
function onSubmit() {
  app.url = $('.input-website input').val();
  sketchDOM(app.url);
}

$('.js-load-page').on('click', onSubmit);
$('.input-website input').on('keypress', function(event){
  if ( event.which === 13 ) {
    event.preventDefault();
    onSubmit();
  }
});







