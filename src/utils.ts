/**
 * This function asserts that a value is definite and not null or undefined.
 * @param {T} value - The value that must be checked to be set (not undefined or null).
 * @param {string} key - The key parameter is a string that represents the name or
 * identifier of the variable or property being checked to be set or not. It is used
 * in the error message to indicate which reference is not set.
 */
export function assertIsDefined<T>(
  value: T,
  key: string
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`The ${key} reference is not affected!`);
  }
}

// export function isRadioField(
//   refValue: HTMLFieldElement | HTMLRadioElement
// ): refValue is HTMLRadioElement {
//   return Array.isArray(refValue);
// }
