type CurrencyList = [string, {
  name: string;
  symbol_native: string;
  symbol: string;
  code: string;
  name_plural: string;
  rounding: number;
  decimal_digits: number;
}][] 

export default function getCurrencyRegExp(
  currencyCode: string,
  currencyList: CurrencyList
) {
  const currecyfound = currencyList.find((c: any) => c[0] === currencyCode);

  if (currecyfound && currecyfound[1].decimal_digits !== 2) {
    const decimalregex: RegExp =
      currecyfound[1].decimal_digits === 1
        ? /^(?!0\.00)\d{1,3}(\d{3})*(\.\d)?$/
        : // currecyfound[1].decimal_digits === 0
          /^(?!0\.00)\d{1,3}(\d{3})*?$/;
    return decimalregex;
  }

  return /^(?!0\.00)\d{1,3}(\d{3})*(\.\d\d)?$/;
}
