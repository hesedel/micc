{% include vendor/StackBlur/dist/stackblur.min.js %}

(function () {
  'use strict';

  /** @type {number} */
  var i;

  /** @type {HTMLCollection} */
  var imgs = document.getElementsByClassName('js-w-img');

  /**
   * @constructor
   * @param {HTMLElement img}
   */
  var Img = (function () {
    function __construct (img) {
      this.figure = img;
      this.img = img.getElementsByTagName('img')[0];
      this.canvas = img.getElementsByTagName('canvas')[0];

      if (!this.canvas) {
        return;
      }

      this.loadSrc();
      this.loadDataSrc();
    }

    /**
     * @function
     */
    __construct.prototype.loadSrc = function () {
      if (this.img.complete) {
        this.onSrcLoad();

        return;
      }

      this.img.addEventListener('load', this.onSrcLoad);
    };

    /**
     * @function
     */
    __construct.prototype.loadDataSrc = function () {
      var img = document.createElement('img');

      img.addEventListener('load', (function () {
        this.onDataSrcLoad(img);
      }).bind(this));

      img.src = this.img.getAttribute('data-src');
    };

    /**
     * @function
     * @param {HTMLElement} img
     */
    __construct.prototype.onDataSrcLoad = function (img) {
      this.figure.insertBefore(img, this.canvas);
      this.figure.setAttribute('class', this.figure.getAttribute('class') + ' is-data-src-loaded');
    }

    /**
     * @function
     */
    __construct.prototype.onSrcLoad = function () {
      this.figure.setAttribute('class', this.figure.getAttribute('class') + ' is-src-loaded');
      this.renderCanvas();
    }

    /**
     * @function
     */
    __construct.prototype.renderCanvas = function () {
      var context = this.canvas.getContext('2d');

      this.canvas.width = this.img.width;
      this.canvas.height = this.img.height;
      context.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
      StackBlur.canvasRGB(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 16);
      this.figure.setAttribute('class', this.figure.getAttribute('class') + ' is-canvas-rendered');
    };

    return __construct;
  })();

  for (i = 0; i < imgs.length; i++) {
    new Img(imgs[i]);
  }
})(window, document);
