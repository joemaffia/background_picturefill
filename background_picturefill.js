/*!
Author: @joemaffia (c) 2013

Based on Scott Jehl (c) 2012 - Picturefill
https://github.com/scottjehl/picturefill

Responsive background image
 */

(function( w ){
    // Enable strict mode
    "use strict";

    w.background_picturefill = function() {
        var ps = this.document.getElementsByTagName( "div" );
        // Loop the pictures
        for( var i = 0, il = ps.length; i < il; i++ ){
            if( ps[ i ].getAttribute( "data-picture" ) !== null ){

                var sources = ps[ i ].getElementsByTagName( "span" ),
                    matches = [];

                // See if which sources match
                for( var j = 0, jl = sources.length; j < jl; j++ ){
                    var media = sources[ j ].getAttribute( "data-media" );
                    // if there's no media specified, OR w.matchMedia is supported
                    if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
                        matches.push( sources[ j ] );
                    }
                }

                if( matches.length ){
                    var matchedEl = matches.pop();
                    matchedEl.parentNode.style.backgroundImage = 'url('+matchedEl.getAttribute('data-src')+')';
                    matchedEl.parentNode.setAttribute("class", matchedEl.getAttribute( "class" ));
                } else {
                    //... deal with it, no matching media
                }
            }
        }
    };
    // Run on resize and domready (w.load as a fallback)
    if (w.addEventListener) {
        w.addEventListener("resize", w.background_picturefill, false);
        w.addEventListener("DOMContentLoaded", function () {
            w.background_picturefill();
            // Run once only
            w.removeEventListener("load", w.background_picturefill, false);
        }, false);
        w.addEventListener("load", w.background_picturefill, false);
    }
    else if (w.attachEvent) {
        w.attachEvent("onload", w.background_picturefill);
    }
}( this ));