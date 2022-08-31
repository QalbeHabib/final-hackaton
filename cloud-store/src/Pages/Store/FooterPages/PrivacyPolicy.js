import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Formik} from "formik";
import { addProduct } from '../../../Axios/Requests/Product';
 const PrivacyPolicy = () => {

    var stripe = 'pk_test_51LN9rySFCbq4hsXBa0sF6HRMsolKvgBOxS2zzi5eydLXriFuMM8naadDZwwZGm2N2sk6goohJOXrsRudcJ2NiFM200vO9doYx0';
    const elements = stripe.elements();
    var style = {
        base: {
            color: "#fff"
        }
    }
    const card = elements.create('card', { style });
    card.mount('#card-element');
    const form = document.querySelector('form');
    const errorEl = document.querySelector('#card-errors');
    const stripeTokenHandler = token => {
        const hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);
    console.log(form)
        form.submit();
    }
    form.addEventListener('submit', e => {
        e.preventDefault();
    stripe.createToken(card).then(res => {
            if (res.error) errorEl.textContent = res.error.message;
            else {
                console.log(res.token)
                stripeTokenHandler(res.token);
            }
        })
    })
    
    return (
        <div className="wrapper">
            <div className="row">
                <div className="column small-12 text-center color-white mb_45">
                    <div className="custom-headline text text-48 font-bold">
                        <h1>
                            Crate user
                        </h1>
                    </div>
                </div>
            </div>

            
            <form action="/charge" method="POST" class="flex flex-col w-1/3">
            <input class="bg-transparent text-white p-2 h-10 mb-4" type="text" name="name" placeholder="Name"/>
            <input type="email" class="bg-transparent text-white p-2 h-10 mb-4" name="email" placeholder="Email"/>
            <input class="bg-transparent text-white p-2 h-10 mb-4" type="text" name="amount" placeholder="Amount"/>
<div id="card-element" class="bg-transparent text-white p-2 h-10 mb-4"></div>
            <div id="card-errors" role="alert"></div>
            <button class="text-white bg-purple-900 p-4 rounded">Submit Payment</button>
        </form>
        </div>
    )
};
export default PrivacyPolicy;