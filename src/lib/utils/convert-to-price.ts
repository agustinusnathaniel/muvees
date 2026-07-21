'use client';

/**
 * convert number to price with currency string
 * @param num valuation number
 */
export const convertToPrice = (num: number): string =>
  num.toLocaleString('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: 'currency',
  });
