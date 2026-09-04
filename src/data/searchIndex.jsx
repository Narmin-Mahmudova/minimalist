const searchIndex = [
  // Skin 
  { id: "skin-1", name: "Alpha Arbutin 2% Face Serum", image: "/images/skin1.avif", link: "/skin-care", price: 299, oldPrice: 329, description: "Hyperpigmentation, Tanning & Sunspot" },
  { id: "skin-2", name: "AHA PHA BHA 32% Face Peel", image: "/images/skin2.avif", link: "/skin-care", price: 399, oldPrice: 429, description: "Hyperpigmentation, Dullness & Wrinkles" },
  { id: "skin-3", name: "Niacinamide 10% Face Serum", image: "/images/skin3.avif", link: "/skin-care", price: 237, oldPrice: 250, description: "Acne Marks, Acne Prone & Oily Skin" },
  { id: "skin-5", name: "Marula Oil 5% Face Moisturizer", image: "/images/skin5.avif", link: "/skin-care", price: 190, oldPrice: 199, description: "Dry Skin, Flakiness & Tightness" },
  { id: "skin-6", name: "Granactive Retinoid 2% Face Serum", image: "/images/skin6.avif", link: "/skin-care", price: 665, oldPrice: 699, description: "Uneven tone, Wrinkles & Loss of elasticity" },
  { id: "skin-7", name: "AHA BHA 10% Face Exfoliator", image: "/images/skin7.avif", link: "/skin-care", price: 570, oldPrice: 599, description: "Dullness, Roughness & Uneven Texture" },
  { id: "skin-8", name: "AHA BHA 10% Face Exfoliator", image: "/images/skin8.avif", link: "/skin-care", price: 570, oldPrice: 599, description: "Dullness, Roughness & Uneven Texture" },
  { id: "skin-9", name: "Polyhydroxy Acid 3% Face Toner", image: "/images/skin9.avif", link: "/skin-care", price: 380, oldPrice: 399, description: "Fine Lines, Wrinkles & Loss of Elasticity" },
  { id: "skin-10", name: "Retinol 0.3% Face Serum", image: "/images/skin10.avif", link: "/skin-care", price: 237, oldPrice: 249, description: "Acne Marks, Irritated & Damaged Skin" },
  { id: "skin-11", name: "Niacinamide 5% Face Serum", image: "/images/skin11.avif", link: "/skin-care", price: 570, oldPrice: 599, description: "Acne, Oily Skin, Blackheads & Irritation" },
  { id: "skin-12", name: "Tranexamic 3% Face Serum", image: "/images/skin12.avif", link: "/skin-care", price: 617, oldPrice: 649, description: "Acne Scars, Melasma, PIE" },
  { id: "skin-13", name: "SPF 50 Sunscreen", image: "/images/skin13.avif", link: "/skin-care", price: 380, oldPrice: 399, description: "Sun protection, UV exposure / damage" },

  // Hair
  { id: "hair-1", name: "Hair Growth Actives 18% Hair Serum", image: "/images/collection3.avif", link: "/hair-care", price: 760, oldPrice: 799, description: "Capixyl, Redensyl & Procapil for Hairfall" },
  { id: "hair-2", name: "Anti Dandruff Shampoo 3.5%", image: "/images/hair2.avif", link: "/hair-care", price: 418, oldPrice: 440, description: "Reduces Dandruff, Itchiness, Scalp Impurities" },
  { id: "hair-3", name: "Maleic Bond Repair Complex 3.5% Hair Shampoo", image: "/images/hair3.avif", link: "/hair-care", price: 209, oldPrice: 220, description: "Dull, Weak & Damaged Hair" },
  { id: "hair-4", name: "Maleic Bond Repair Complex 5% Hair Serum", image: "/images/hair4.avif", link: "/hair-care", price: 475, oldPrice: 499, description: "Frizzy, Weak, Damaged & Brittle Hair" },
  { id: "hair-5", name: "Frizz Control Complex SPF 30 Hair Serum", image: "/images/hair5.avif", link: "/hair-care", price: 570, oldPrice: 599, description: "Frizzy Hair · UV exposure / damage" },
  { id: "hair-6", name: "Maleic Bond Repair Complex 5% Hair Mask", image: "/images/hair6.avif", link: "/hair-care", price: 665, oldPrice: 699, description: "Dull, Frizzy, Weak & Damaged Hair" },
  { id: "hair-7", name: "CPH Complex + Oligopeptide 0.8% Anti-Dandruff Serum", image: "/images/hair7.avif", link: "/hair-care", price: 475, oldPrice: 499, description: "Dandruff & Scalp Irritation" },
  { id: "hair-8", name: "Maleic Bond Repair Complex Hair Shampoo & Mask Duo", image: "/images/hair8.avif", link: "/hair-care", price: 1169, oldPrice: 1299, description: "Dull, Frizzy, Weak & Damaged Hair" },
  { id: "hair-9", name: "Hydrating Factors 7.3% Hair Shampoo", image: "/images/hair9.avif", link: "/hair-care", price: 475, oldPrice: 499, description: "Manage dry, dull & frizzy hair" },
  { id: "hair-10", name: "Maleic Bond Repair Complex Hair Care Trio", image: "/images/hair10.avif", link: "/hair-care", price: 1614, oldPrice: 1899, description: "Frizzy, Weak, Damaged & Brittle Hair" },
  { id: "hair-11", name: "Maleic Bond Repair Complex Hair Serum & Shampoo Duo", image: "/images/hair11.avif", link: "/hair-care", price: 944, oldPrice: 1049, description: "Frizzy, Weak, Damaged & Brittle Hair" },

  // Lip 
  { id: "lip-1", name: "LAscorbic Acid Lip Treatment Balm", image: "/images/lip1.avif", link: "/lip-care", price: 360, oldPrice: 399, description: "Lip Dehydration & Hyperpigmentation" },
  { id: "lip-2", name: "Lip Balm SPF 30", image: "/images/lip2.avif", link: "/lip-care", price: 270, oldPrice: 299, description: "Chapped Lips & UV Protection" },

  // Bath & Body
  { id: "bathbody-1", name: "Nonopeptide + AHA Underarm Roll", image: "/images/bothbody1.avif", link: "/bath-body", price: 360, oldPrice: 399, description: "Fades Underarm darkness & Odour" },
  { id: "bathbody-2", name: "Niacinamide 5% Body Lotion", image: "/images/bothbody2.avif", link: "/bath-body", price: 270, oldPrice: 299, description: "Damaged Barrier, Dry & Flaky Skin" },
  { id: "bathbody-3", name: "Saliclic Acid + LHA 2% Body Wash", image: "/images/bothbody3.avif", link: "/bath-body", price: 315, oldPrice: 349, description: "Excess Sweat, Body Acne & Rough Skin" },
  { id: "bathbody-4", name: "HOCL Skin Relief Spray 150 ppm", image: "/images/bothbody4.avif", link: "/bath-body", price: 360, oldPrice: 399, description: "Eczema, Redness & Damaged skin barrier" },
  { id: "bathbody-5", name: "SPF 30 Body Lotion", image: "/images/bothbody5.avif", link: "/bath-body", price: 450, oldPrice: 499, description: "Sun protection, UV exposure / damage" },
  { id: "bathbody-6", name: "Sun Protection Body Care Kit", image: "/images/bothbody7.avif", link: "/bath-body", price: 1019, oldPrice: 1199, description: "UV Damage & Chapped Lips" },

  // Best Sellers
  { id: "bestseller-1", name: "Salicylic Acid + LHA 2% Cleanser", image: "/images/seller1.avif", link: "/best-sellers", price: 285, oldPrice: 299, description: "Acne, Breakouts & Oiliness" },
  { id: "bestseller-2", name: "SPF 50 Sunscreen", image: "/images/seller2.avif", link: "/best-sellers", price: 249, oldPrice: 299, description: "Sun protection, UV exposure / damage" },
  { id: "bestseller-3", name: "Vitamin B5 10% Moisturizer", image: "/images/seller3.avif", link: "/best-sellers", price: 540, oldPrice: 599, description: "Damaged Barrier, Oily & Dehydrated" },
  { id: "bestseller-4", name: "Niacinamide 10% Face Serum", image: "/images/seller4.avif", link: "/best-sellers", price: 237, oldPrice: 250, description: "Acne Marks, Acne Prone & Oily Skin" },
  { id: "bestseller-5", name: "Vitamin C 10% Face Serum", image: "/images/seller5.avif", link: "/best-sellers", price: 285, oldPrice: 299, description: "Dullness, Spots & Loss of Elasticity" },
  { id: "bestseller-6", name: "Salicylic Acid 2% Face Serum", image: "/images/seller6.avif", link: "/best-sellers", price: 495, oldPrice: 549, description: "Acne, Oily Skin, Blackheads & Irritation" },
  { id: "bestseller-7", name: "B12 + Oat Extract Gentle Cleanser", image: "/images/seller7.avif", link: "/best-sellers", price: 270, oldPrice: 299, description: "Dry, Dehydrated, Sensitive Skin" },
  { id: "bestseller-8", name: "Glycolic Acid 8% Exfoliating Liquid", image: "/images/seller8.avif", link: "/best-sellers", price: 450, oldPrice: 499, description: "Dull Skin, Uneven Tone & Texture" },
  { id: "bestseller-9", name: "AHA PHA BHA 32% Face Pell", image: "/images/seller9.avif", link: "/best-sellers", price: 285, oldPrice: 299, description: "Hyperpigmentation, Dullness & Wrinkles" },

  // New Launches 
  { id: "launch-1", name: "Hydrating Factors 7.3% Hair Shampoo", image: "/images/product1-1.avif", link: "/new-launches", price: 450, oldPrice: 499, description: "Manage dry, dull & frizzy hair" },
  { id: "launch-2", name: "Multi Repair Actives 15% Face Serum", image: "/images/product2-1.avif", link: "/new-launches", price: 630, oldPrice: 699, description: "Dullness, Finelines & Loss of Firmness" },
  { id: "launch-3", name: "Marula Oil 05% Effective Cleansing Oil Serum", image: "/images/product3-1.avif", link: "/new-launches", price: 540, oldPrice: 599, description: "Gently remove oils and impurities" },
  { id: "launch-4", name: "Copper Peptide + PDRN 1.25% Face Serum", image: "/images/product4-1.avif", link: "/new-launches", price: 699, oldPrice: 799, description: "Wrinkles, Fine Lines, Damaged Barrier" },
  { id: "launch-5", name: "B12 + Repair Complex 5.5% Face Moisturizer", image: "/images/product5-1.avif", link: "/new-launches", price: 270, oldPrice: 299, description: "Repairs and strengthens skin barrier" },
  { id: "launch-6", name: "Anti Dandruff Shampoo 3.5%", image: "/images/product6-1.avif", link: "/new-launches", price: 396, oldPrice: 440, description: "Reduces Dandruff, Itchiness, Scalp Impurities" },
  { id: "launch-7", name: "HOCL Skin Relief Spray 150 ppm", image: "/images/product7-1.avif", link: "/new-launches", price: 360, oldPrice: 399, description: "Eczema, Redness & Damaged skin barrier" },
  { id: "launch-8", name: "Light Fluid SPF 50 Sunscreen", image: "/images/product8-1.avif", link: "/new-launches", price: 315, oldPrice: 349, description: "Sun protection & UV exposure / damage" },
  { id: "launch-9", name: "Frizz Control Complex Hair Serum", image: "/images/product9-1.avif", link: "/new-launches", price: 540, oldPrice: 599, description: "Frizzy Hair · UV exposure / damage" },
  { id: "launch-10", name: "Vitamin B12 + NMF Face Toner", image: "/images/product10-1.avif", link: "/new-launches", price: 360, oldPrice: 399, description: "Soothes & Nourishes Skin" },
  { id: "launch-11", name: "Ceramide Nourishing Lotion", image: "/images/product11-1.avif", link: "/new-launches", price: 810, oldPrice: 899, description: "Deeply nourishes, keeps skin soft" },

  // Baby Care
  { id: "babycare-1", name: "Ceramide & Vitamin B5 Delicate Cleanser", image: "/images/BabyCare1.avif", link: "/baby-care", price: 570, oldPrice: 599, description: "Gentle formula that cleanses without drying" },
  { id: "babycare-2", name: "Ceramide & Squalene Nourishing Lotion", image: "/images/BabyCare2.avif", link: "/baby-care", price: 855, oldPrice: 899, description: "Deeply nourishes, keeps skin soft" },
  { id: "babycare-3", name: "Zinc Oxide + B5 Healing Ointment", image: "/images/BabyCare3.avif", link: "/baby-care", price: 380, oldPrice: 399, description: "Prevents skin irritation & diaper rash" },
  { id: "babycare-4", name: "Provitamin D3 Massage Oil", image: "/images/BabyCare4.avif", link: "/baby-care", price: 570, oldPrice: 599, description: "Nourishes & soothes baby's delicate skin" },
];

export default searchIndex;