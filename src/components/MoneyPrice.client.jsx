import {useMoney} from '@shopify/hydrogen/client';

/**
 * A client component that defines the currency code, currency symbol, and amount of a product
 */
export default function MoneyPrice({money}) {
  const {amount, currencyNarrowSymbol, currencyCode} = useMoney(money);

  return (
    <>
      {currencyCode}
      {currencyNarrowSymbol}
      {amount}
    </>
  );
}
