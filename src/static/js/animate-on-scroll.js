/*!
 * Anime on Scroll - https://github.com/wallacesilva/animate-on-scroll
 * Author: Wallace Silva <contato@wallacesilva.com>
 * Version - 0.1.0
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2017
 */
function debounce(funcCall, timeWait = 2, immediate = true) {
    var timeout;
    return function(){
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) funcCall.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, timeWait);
        if (callNow) funcCall.apply(context, args);
    };
}

const aos_elements = document.querySelectorAll('.aos-item');
console.log(aos_elements);

function checkScroll(e) {

    aos_elements.forEach((aos_item) => {

        // halt the item on page
        const scrollInAt = (window.scrollY + window.innerHeight) - aos_item.height / 2;
        // bottom of item
        const itemBottom = aos_item.offsetTop + aos_item.height;
        const isHalfShown = scrollInAt > aos_item.offsetTop;
        const isNotScrolledPast = window.scrollY < itemBottom;

        const animationClass = aos_item.getAttribute('data-animation');
        
        if (isHalfShown && isNotScrolledPast) {
            console.log("here222")

            aos_item.classList.add(animationClass);
            aos_item.classList.add('animated');
            console.log(aos_item.height);

            // console.log('animated');

        } else {

            aos_item.classList.remove('animated');
            aos_item.classList.remove(animationClass);

        }

    });
}

// document.addEventListener('DOMContentLoaded', (e) => {});
window.addEventListener('scroll', debounce(checkScroll));

// make scroll to animate if scrolled
checkScroll();