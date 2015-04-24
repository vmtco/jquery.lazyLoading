(function($) {
  $.fn.lazyLoading = function(options) {
    var $this, checkImages, checking, settings;
    settings = $.extend({}, {
      sourceAttr: "data-src",
      effectTime: 1000
    }, options);
    $this = this;
    checking = false;
    checkImages = function() {
      if (checking) {
        return;
      }
      checking = true;
      $($this).filter(function(i) {
        return $($this[i]).attr(settings.sourceAttr) !== void 0;
      }).each(function(i, v) {
        var rect, src;
        rect = v.getBoundingClientRect();
        if (rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)) {
          $(v).css("opacity", 0);
          src = v.getAttribute(settings.sourceAttr);
          v.removeAttribute(settings.sourceAttr);
          v.src = src;
          $(v).animate({
            "opacity": 1
          }, settings.effectTime);
        }
      });
      checking = false;
    };
    checkImages();
    $(window).scroll(function() {
      checkImages();
    });
    return this;
  };
})(jQuery);