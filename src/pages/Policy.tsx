import React from 'react';
import { useParams } from 'react-router-dom';

export const Policy = () => {
  const { policyName } = useParams<{ policyName: string }>();

  let title = '';
  let content = null;

  switch (policyName) {
    case 'shipping':
      title = 'Shipping & Returns';
      content = (
        <>
          <h3>Shipping</h3>
          <p>Since all our products are handmade, please allow 3-5 business days for ready-to-ship items to be dispatched. Made-to-order catalogue pieces may take 7-10 days depending on the design.</p>
          <p>Bulk orders for existing catalogue designs require at least two months of advance booking before the requested delivery date.</p>
          <p>We offer free shipping on all orders above ₹2000 within India. For orders below this amount, standard shipping rates apply.</p>
          
          <h3>Returns & Exchanges</h3>
          <p>We want you to love your terracotta jewellery. If you receive a damaged product, please contact us within 48 hours of delivery with a photograph to arrange a replacement.</p>
          <p>Due to the handmade nature of our products, minor variations in color or shape are not considered defects but rather a mark of authentic artisanal work. Bulk orders are confirmed only after the studio reviews the piece, quantity, colour option, and timeline.</p>
        </>
      );
      break;
    case 'privacy':
      title = 'Privacy Policy';
      content = (
        <>
          <h3>Data Collection</h3>
          <p>We collect essential information required to process your order, including your name, shipping address, and contact details. We do not store your payment information directly.</p>
          <h3>Usage of Information</h3>
          <p>Your details are used solely for fulfilling your orders and communicating with you regarding your purchases. We will never sell your data to third parties.</p>
        </>
      );
      break;
    case 'terms':
      title = 'Terms & Conditions';
      content = (
        <>
          <h3>Handmade Disclaimer</h3>
          <p>By purchasing from Goonjaa, you acknowledge that our products are handcrafted using natural earthen clay. Slight imperfections, variations in glaze, or paint are inherent to the process and celebrated as unique characteristics.</p>
          <h3>Product Care</h3>
          <p>Terracotta is porous and fragile if dropped. We are not responsible for damage caused by improper handling after delivery. Please refer to our care instructions included with every package.</p>
        </>
      );
      break;
    default:
      title = 'Policy Not Found';
      content = <p>The policy you are looking for does not exist.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="font-serif text-4xl text-gray-900 mb-8">{title}</h1>
      <div className="prose prose-terracotta text-gray-600">
        {content}
      </div>
    </div>
  );
};
