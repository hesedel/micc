{% include vendor/StackBlur/dist/stackblur.min.js %}

(function () {
  'use strict';

  /** @type {number} */
  var i;

  /** @type {HTMLElement} */
  var canvas,
      figure,
      img;

  /** @type {HTMLCollection} */
  var figures = document.getElementsByClassName('js-w-img');

  /**
   * @function
   * @private
   * @param {HTMLElement} img
   */
  function getImageSize(img) {
    var vImg = document.createElement('img');
    vImg.setAttribute('crossOrigin', '');
    vImg.src = img.getAttribute('src');
    vImg.onload = function () {
      canvas.width = vImg.width;
      canvas.height = vImg.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(vImg, 0, 0, vImg.width, vImg.height);
      StackBlur.canvasRGB(canvas, 0, 0, vImg.width, vImg.height, 100);
    };
  }

  /**
   * @function
   * @private
   */
  function onWindowScroll () {

  }

  for (i = 0; i < figures.length; i++) {
    figure = figures[i];
    img = figure.getElementsByTagName('img')[0];
    canvas = figure.getElementsByTagName('canvas')[0];
    getImageSize(img);

    img.src = img.getAttribute('data-src');
  }

  window.addEventListener('scroll', onWindowScroll);
  // window.removeEventListener('scroll', onWindowScroll);
})(window, document);
