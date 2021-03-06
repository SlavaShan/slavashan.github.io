jQuery(document).ready(function(){
    var productCustomization = $('.mainCnt_item'),
        cart = $('.cd-cart'),
        animating = false;

    initCustomization(productCustomization);

    function initCustomization(items) {
        items.each(function(){
            var actual = $(this),
                addToCartBtn = actual.find('.add-to-cart');

            //detect click on the add-to-cart button
            addToCartBtn.on('click', function() {
                if(!animating) {
                    //animate if not already animating
                    animating =  true;

                    addToCartBtn.addClass('is-added').find('path').eq(0).animate({
                        //draw the check icon
                        'stroke-dashoffset':0
                    }, 300, function(){
                        setTimeout(function(){
                            updateCart();
                            addToCartBtn.removeClass('is-added').find('em').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                                //wait for the end of the transition to reset the check icon
                                addToCartBtn.find('path').eq(0).css('stroke-dashoffset', '19.79');
                                animating =  false;
                            });

                            if( $('.no-csstransitions').length > 0 ) {
                                // check if browser doesn't support css transitions
                                addToCartBtn.find('path').eq(0).css('stroke-dashoffset', '19.79');
                                animating =  false;
                            }
                        }, 600);
                    });
                }
            });

        });
    }


    function updateCart() {
        //show counter if this is the first item added to the cart
        ( !cart.hasClass('items-added') ) && cart.addClass('items-added');

        var cartItems = cart.find('span'),
            text = parseInt(cartItems.text()) + 1;
        cartItems.text(text);
    }
});