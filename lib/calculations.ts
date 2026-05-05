export const PLATFORM_FEE_PERCENT = 0.15;

export function calculateFeeBreakdown(trainerPay: number) {
  const platformFeeAmount = Number((trainerPay * PLATFORM_FEE_PERCENT).toFixed(2));
  const organisationTotal = Number((trainerPay + platformFeeAmount).toFixed(2));

  return {
    trainerPay,
    platformFeePercent: PLATFORM_FEE_PERCENT,
    platformFeeAmount,
    organisationTotal
  };
}

export function formatCurrency(amount: number) {
  return `$${Math.round(amount)}`;
}
