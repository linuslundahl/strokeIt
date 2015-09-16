/* global jQuery:true, strokeIt:true; */

'use strict';

;(function () {
  var StrokeIt = function (el, settings) {
    return this.init(el, settings);
  };

  StrokeIt.prototype = {
    /**
     * Initialize
     */
    init : function (el, settings) {
      var _ = this,
          result = [],
          delay = 0,
          paths, length, speed, previousStrokeLength;

      _.settings = settings || {};

      if (!el.jquery && typeof el === 'object' && el.constructor !== Array) {
        el = [el];
      }

      for (var i = 0, l = el.length; i < l; i++) {
        paths = el[i].querySelectorAll('path, cicle, rect');

        if (!_.settings.sequence) {
          delay = 0;
        }

        for (var j = 0, k = paths.length; j < k; j++) {
          length = paths[j].getTotalLength();
          previousStrokeLength = speed || 0;
          speed = length < 100 ? 20 : Math.floor(length);
          delay += previousStrokeLength + 100;

          paths[j].style.transition = 'none';
          paths[j].setAttribute('data-length', length);
          paths[j].setAttribute('data-speed', speed);
          paths[j].setAttribute('data-delay', delay);

          if (_.settings.reverse) {
            paths[j].setAttribute('stroke-dashoffset', '0');
            paths[j].setAttribute('stroke-dasharray', '0');
          } else {
            paths[j].setAttribute('stroke-dashoffset', length);
            paths[j].setAttribute('stroke-dasharray', length + ',' + length);
          }
        }

        result.push(paths);
      }

      window.setTimeout(function () {
        _.animate(result);
      }, 100);

      return this;
    },

    /**
     * Animate
     */
    animate : function (paths) {
      var _ = this,
          length;

      for (var i = 0, l = paths.length; i < l; i++) {
        for (var j = 0, k = paths[i].length; j < k; j++) {
          length = paths[i][j].getAttribute('data-length');
          paths[i][j].style.transition = 'stroke-dashoffset ' + paths[i][j].getAttribute('data-speed') + 'ms ' + paths[i][j].getAttribute('data-delay') + 'ms linear';

          if (_.settings.reverse) {
            paths[i][j].setAttribute('stroke-dashoffset', length);
            paths[i][j].setAttribute('stroke-dasharray', length + ',' + length);
          } else {
            paths[i][j].setAttribute('stroke-dashoffset', '0');
          }
        }
      }

      return this;
    }
  };

  window.strokeIt = function (el, settings) {
    return new StrokeIt(el, settings);
  };

  if (window.jQuery) {
    jQuery.fn.extend({'strokeIt': function (settings) {
      strokeIt(this, settings);
      return this;
    }});
  }
})();
