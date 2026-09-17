'use client';

import { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import { CheckoutForm } from '@/components/website/sections/checkout/CheckoutForm';
import { OrderSummary } from '@/components/website/sections/checkout/OrderSummary';
import { ExpressCheckout } from '@/components/website/sections/checkout/ExpressCheckout';
import { ComplimentarySample } from '@/components/website/sections/checkout/ComplimentarySample';

// ... [Keep your existing MOCK_CART, RECOMMENDED_PRODUCTS, UPSELL_PRODUCT] ...

const MOCK_CART = {
  items: [
    { id: '1', name: 'Debaser', size: '50 mL', price: 450, quantity: 1, image: '/images/NB-01.jpg' },
    { id: '2', name: 'Debaser', size: '10 mL', price: 240, quantity: 1, image: '/images/NB-02.jpg' },
  ],
  subtotal: 690,
  shipping: 0,
  tax: 0,
  total: 690,
};

const RECOMMENDED_PRODUCTS = [
  { id: '3', name: 'Pocket Perfume Enhancer', price: 80, image: '/images/NB-03.jpg' },
  { id: '4', name: 'Big Sur After Rain Candle', price: 75, image: '/images/NB-04.jpg' },
  { id: '5', name: 'Big Sur After Rain Auto Fragrance', price: 18, image: '/images/NB-05.jpg' },
];

const UPSELL_PRODUCT = {
  id: '6',
  name: 'Holy Ficus Auto Fragrance',
  price: 18,
  image: '/images/NB-06.jpg',
};

export default function CheckoutPage() {
  const [cart] = useState(MOCK_CART);
  const [addedSampleId, setAddedSampleId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: 'United States',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    company: '',
    apartment: '',
    newsletter: false,
    smsNewsletter: false,
    giftWrapping: false,
    giftMessage: '',
    giftFrom: '',
    giftTo: '',
    discountCode: '',
    billingSameAsShipping: true,
    saveInfo: false,
  });

  // Use useCallback to prevent function recreation on every render
  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleAddSample = useCallback((sample: any) => {
    console.log('✅ Sample clicked:', sample);
    setAddedSampleId((prevId) => {
      const newId = prevId === sample.id ? null : sample.id;
      console.log('✅ Sample ID updated to:', newId);
      return newId;
    });
  }, []);

  return (
    <main className="bg-[#FAF7F2] text-[#2A2520] min-h-screen">
      {/* Add padding-top to account for fixed header */}
      <div className="pt-24 max-w-[1400px] mx-auto"> {/* Added pt-24 */}
        <ComplimentarySample 
          onAddSample={handleAddSample}
          addedSampleId={addedSampleId}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-6 md:px-12 lg:px-24 py-12">
          <div className="space-y-12">
            <ExpressCheckout />

            <CheckoutForm.Section title="Contact">
              <CheckoutForm.Email
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                newsletter={formData.newsletter}
                onNewsletterChange={(value) => handleInputChange('newsletter', value)}
              />
            </CheckoutForm.Section>

            <CheckoutForm.Section title="Delivery">
              <CheckoutForm.Delivery
                formData={formData}
                onChange={handleInputChange}
              />
            </CheckoutForm.Section>

            <CheckoutForm.Section title="Gift Options">
              <CheckoutForm.GiftOptions
                giftWrapping={formData.giftWrapping}
                onGiftWrappingChange={(value) => handleInputChange('giftWrapping', value)}
                giftFrom={formData.giftFrom}
                giftTo={formData.giftTo}
                giftMessage={formData.giftMessage}
                onGiftFromChange={(value) => handleInputChange('giftFrom', value)}
                onGiftToChange={(value) => handleInputChange('giftTo', value)}
                onGiftMessageChange={(value) => handleInputChange('giftMessage', value)}
              />
            </CheckoutForm.Section>

            <CheckoutForm.Section title="Shipping Method">
              <CheckoutForm.ShippingMethod />
            </CheckoutForm.Section>

            <CheckoutForm.Section title="You Might Like">
              <CheckoutForm.Recommendations products={RECOMMENDED_PRODUCTS} />
            </CheckoutForm.Section>

            <CheckoutForm.Section title="Payment">
              <CheckoutForm.Payment
                formData={formData}
                onChange={handleInputChange}
              />
            </CheckoutForm.Section>
          </div>

          <div className="lg:sticky lg:top-32 lg:self-start">
            <OrderSummary
              cart={cart}
              discountCode={formData.discountCode}
              onDiscountCodeChange={(value: string) => handleInputChange('discountCode', value)}
              upsellProduct={UPSELL_PRODUCT}
            />
          </div>
        </div>
      </div>
    </main>
  );
}