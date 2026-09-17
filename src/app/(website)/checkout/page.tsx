// src/app/(website)/checkout/page.tsx
"use client";

import { useState } from 'react';
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { CheckoutForm } from "@/components/website/sections/checkout/CheckoutForm";
import { OrderSummary } from "@/components/website/sections/checkout/OrderSummary";
import { ExpressCheckout } from "@/components/website/sections/checkout/ExpressCheckout";
import { ComplimentarySample } from "@/components/website/sections/checkout/ComplimentarySample";

// ✅ ADD THIS ARRAY - Mock recommended products
const RECOMMENDED_PRODUCTS = [
  { id: '3', name: 'Pocket Perfume Enhancer', price: 80, image: '/images/NB-03.jpg' },
  { id: '4', name: 'Big Sur After Rain Candle', price: 75, image: '/images/NB-04.jpg' },
  { id: '5', name: 'Big Sur After Rain Auto Fragrance', price: 18, image: '/images/NB-05.jpg' },
  { id: '7', name: 'Oud Royale Travel Spray', price: 65, image: '/images/NB-06.jpg' },
  { id: '8', name: 'Velvet Saffron Candle', price: 85, image: '/images/NB-07.jpg' },
  { id: '9', name: 'Neroli Memory Rollerball', price: 45, image: '/images/NB-08.jpg' },
];

const UPSELL_PRODUCT = {
  id: "6",
  name: "Holy Ficus Auto Fragrance",
  price: 18,
  image: "/images/NB-06.jpg",
};

export default function CheckoutPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  const [addedSampleId, setAddedSampleId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "United States",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    company: "",
    apartment: "",
    newsletter: false,
    smsNewsletter: false,
    giftWrapping: false,
    giftMessage: "",
    giftFrom: "",
    giftTo: "",
    discountCode: "",
    billingSameAsShipping: true,
    saveInfo: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSample = (sample: any) => {
    setAddedSampleId(sample.id);
    console.log("Sample added:", sample);
  };

  return (
    <main className="bg-[#FAF7F2] text-[#2A2520] min-h-screen pt-24">
      <div className="max-w-[1400px] mx-auto">
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
                onChange={(value) => handleInputChange("email", value)}
                newsletter={formData.newsletter}
                onNewsletterChange={(value) => handleInputChange("newsletter", value)}
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
                onGiftWrappingChange={(value) => handleInputChange("giftWrapping", value)}
                giftFrom={formData.giftFrom}
                giftTo={formData.giftTo}
                giftMessage={formData.giftMessage}
                onGiftFromChange={(value) => handleInputChange("giftFrom", value)}
                onGiftToChange={(value) => handleInputChange("giftTo", value)}
                onGiftMessageChange={(value) => handleInputChange("giftMessage", value)}
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
              cart={{
                items,
                subtotal,
                shipping: 0,
                tax: 0,
                total: subtotal,
              }}
              discountCode={formData.discountCode}
              onDiscountCodeChange={(value: string) => handleInputChange("discountCode", value)}
              upsellProduct={UPSELL_PRODUCT}
              onRemoveItem={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          </div>
        </div>
      </div>
    </main>
  );
}