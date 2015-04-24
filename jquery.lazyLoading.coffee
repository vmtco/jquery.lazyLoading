( ($) ->
    $.fn.lazyLoading = (options) ->
        settings = $.extend({}, {sourceAttr:"data-src",effectTime:1000}, options)
        $this = this
        checking = false
        checkImages = ->
            if checking
                return
            checking = true
            $($this)
                .filter (i)->
                    $($this[i]).attr(settings.sourceAttr) isnt undefined
                .each (i,v) ->
                    rect = v.getBoundingClientRect()
                    if rect.top >= 0 and rect.left >= 0 and rect.top <= (window.innerHeight || document.documentElement.clientHeight)
                        $(v).css("opacity",0)
                        src = v.getAttribute(settings.sourceAttr)
                        v.removeAttribute(settings.sourceAttr)
                        v.src = src
                        $(v).animate({"opacity":1},settings.effectTime)
                    return
            checking = false
            return
        checkImages()
        $(window).scroll ->
            checkImages()
            return
        return this
    return
)(jQuery)