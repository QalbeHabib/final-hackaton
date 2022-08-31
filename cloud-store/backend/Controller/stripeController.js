
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51LN9rySFCbq4hsXBzK9BDzkQUzmY9d9IkQv8FvJ3xhAs80sxqC9nNCwRkurwmqZk0LEkpLz7kM3w64SdBGAKKyIo00LFgoIJbL');

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 100;
};

exports.add = async (req, res,next) => {
  const { items } = req.body;

  try {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2700,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
    description: "Example PaymentIntent",
    payment_method_types: ['card'],
  });
  const paymentIntents = await stripe.paymentIntents.confirm(
    paymentIntent.id,
    {payment_method: 'pm_card_visa'}
  );
  console.log("Payment Intent--------->>>>",paymentIntents)
  res.send({
      clientSecret: paymentIntent.client_secret,
    });
//   const YOUR_DOMAIN = 'http://localhost:3000';
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         // price: {100},
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });
}
  catch (err) {
    next(err)
  }
};



// This is your test secret API key.
// const express = require('express');
// const app = express();
// app.use(express.static('public'));



