import React from 'react';
import CheckoutCard from '../components/ProfileContactCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ProfilePage.css';

export default function ProfilePage() {
    return (
        <div>
            <Navbar />
        <ProfileContactCard />
      <Footer />
        </div>
    );
}