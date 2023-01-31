import React from 'react';
import CheckoutCard from '../components/CheckoutCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './CheckoutPage.css';

function CheckoutPage() {
  return (
    <div className="Checkout">
      <Navbar />
        <CheckoutCard />
      <Footer />
    </div>
  );
}

export default CheckoutPage;