import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckOut = () => {
    const onToken = (token) => {
        console.log(token)
    }
    return (
        <div>
            <StripeCheckout token={onToken} stripeKey = 'pk_test_51J4oUqGAb678aVcfvCPvNoaQ07u2vnPHAFZUylaPYjhpceBM2AD4PaQgAmgdx6kYWpZmEz2SyX760jGRmIcP7n6500kZyJtOWf'></StripeCheckout>
        </div>
    );
};

export default StripeCheckOut;