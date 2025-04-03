export default function calculateDiscountPercentage(actualPrice, discountedPrice) {
    if (actualPrice === 0) return 0; // Avoid division by zero
    const discount = ((actualPrice - discountedPrice) / actualPrice) * 100;
    return Math.round(discount); // Rounds the discount percentage to the nearest whole number
  }
  