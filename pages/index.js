import React from 'react';

import {Product, FooterBanner, HeroBanner} from "../components";

const Home = () => {
  return (
    <>
      <HeroBanner />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>..........</p>
      </div>

      <div className="products-container">
        {["product 1", "product 2", "product 3"].map((product) => product)}
      </div>

      <FooterBanner />
    </>
  )
}

export default Home