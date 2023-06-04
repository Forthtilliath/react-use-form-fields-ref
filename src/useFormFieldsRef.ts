import { RefCallback, MutableRefObject, useRef } from "react";
import { assertIsDefined } from "./utils";

type HTMLFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

type HTMLRadioElement = Array<HTMLInputElement>;

type Field = HTMLFieldElement | HTMLRadioElement;

function isRadioField(
  refValue: HTMLFieldElement | HTMLRadioElement
): refValue is HTMLRadioElement {
  return Array.isArray(refValue);
}

/** `useFormFieldsRef` creates an object with references to form inputs and
 * provides methods to get and set their values.
 * @param fields - An array of strings representing the form input names for which useFormFieldsRef hook
 * will be used.
 * @returns an array containing two elements: the first element is an initialized `useRef`
 * object with an object containing null values for each input, and the second
 * element is an object containing functions to interact with the `useRef` object.
 *
 * Functions include `setRef` to set the reference of an input element to the
 * `useRef`, `getRef` to get the value of a field, `getField` to get the field,
 * `getAllRef` to get an object with the element name as key and to value the
 * element value and `getFormData` to get a ready-to-use FormData be sent.
 *
 * @example
 * useFormFieldsRef(['username', 'password'])
 * // => fieldsRef (after initialisation, before setting)
 * {
 *   username: null,
 *   password: null
 * }
 *
 * <input ref={setRef('username')} />
 * // => fieldsRef (allocate the field to key `username`)
 * {
 *   username: HTMLInputElement,
 *   password: null
 * }
 *
 * getField('username') // Get the field with the key `username`
 *
 * getRef('username') // Get the value in the field (like an `input.value`)
 *
 * getAllRef()
 * // Returns the values contained in the fields in the following form
 * {
 *   username: 'myusername',
 *   password: 'secret'
 * }
 *
 * getFormData()
 * // Returns a FormData in the following form
 * [
 *   ['username', 'myusername'],
 *   ['password', 'secret']
 * ]
 */
export function useFormFieldsRef<FieldName extends string>(
  fields: ReadonlyArray<FieldName>
) {
  type Fields = Record<FieldName, Field | null>;

  const initialState = fields.reduce(
    (obj, name: FieldName) => ({ ...obj, [name]: null }),
    {}
  ) as Fields;

  const fieldsRef: MutableRefObject<Fields> = useRef<Fields>(initialState);

  /**
   * `setRef` sends a callback function to set a reference based on a given key.
   * @param {FieldName} key - Key corresponding to a value contained in the array `fields`.
   * @returns `setRef` returns a callback used to update the reference bound to the given key.
   */
  const setRef =
    (key: FieldName): RefCallback<HTMLFieldElement | HTMLRadioElement> =>
    (ref: HTMLFieldElement) => {
      if (fields.includes(key)) {
        if (ref.type === "radio") {
          if (fieldsRef.current[key] === null) {
            fieldsRef.current[key] = [ref] as HTMLRadioElement;
          } else {
            (fieldsRef.current[key] as HTMLRadioElement).push(
              ref as HTMLInputElement
            );
          }
        } else {
          fieldsRef.current[key] = ref;
        }
      }
    };

  /**
   * `getRef` returns the value contained in the fieldsRef reference to the given key.
   * @param {FieldName} key - The `key` parameter is used as a key to access a value in the
   * `inputsRef.current` object.
   *
   * @example
   * getRef('username')
   * // johndoe
   */
  const getRef = (key: FieldName): string => {
    assertIsDefined(fieldsRef.current[key], key);

    // Array only for input radios
    const field = fieldsRef.current[key]!;
    if (isRadioField(field)) {
      return (
        field.find((radio: HTMLInputElement) => radio.checked)?.value ?? ""
      );
    }

    return field.value;
  };

  /**
   * `getField` returns the element contained in the fieldsRef reference to the given key.
   * @param {FieldName} key - The `key` parameter is used as a key to access a value in the
   * `inputsRef.current` object.
   *
   * @example
   * getField('username')
   */
  const getField = <T extends HTMLFieldElement = HTMLFieldElement>(
    key: FieldName
  ) => {
    assertIsDefined(fieldsRef.current[key], key);

    return fieldsRef.current[key] as T;
  };

  /**
   * `getFormData` gets form data from input fields and returns it as a FormData object.
   *
   * @example
   * getFormData()
   * // Returns a FormData in the following form
   * [
   *   ['username', 'myusername'],
   *   ['password', 'secret']
   * ]
   */
  const getFormData = () => {
    fields.every((key) => assertIsDefined(fieldsRef.current[key], key));

    return fields.reduce((form, key) => {
      form.append(key, getRef(key));
      return form;
    }, new FormData());
  };

  /**
   * `getAllRef` returns an object containing values from a list of input references.
   *
   * @example
   * getAllRef()
   * // Returns the values contained in the fields in the following form
   * {
   *   username: 'myusername',
   *   password: 'secret'
   * }
   */
  // const getAllRef = () => {
  //   return fields.reduce(
  //     (obj, key) => ({
  //       ...obj,
  //       [key]: getRef(key),
  //       // [key]: fieldsRef.current[key]?.value,
  //     }),
  //     initialState
  //   );
  // };
  const getAllRef = () => {
    return Object.fromEntries(getFormData());
  };

  /**
   * The function checks if a given HTMLFieldElement is not null.
   * @param {T | null} field - The `field` parameter is the HTMLFieldElement to verify.
   * @returns The function `isFieldNotNull` returns a boolean value indicating whether the input
   * `field` is not null. The function also uses a type predicate to narrow the type of `field` to `T`.
   *
   * @example
   * const field = getField(key);
   * if(isFieldNotNull(field)) {
   *   // here field is HTMLFieldElement
   *   // your code
   * } else {
   *   throw new Error(`${key} is null`);
   * }
   */
  const isFieldNotNull = <T extends HTMLFieldElement>(
    field: T | null
  ): field is T => {
    return field !== null;
  };

  const actions = {
    setRef,
    getRef,
    getField,
    getAllRef,
    getFormData,
    isFieldNotNull,
  };
  return [fieldsRef, actions] as const;
}

/**
 * Type of useFormFieldsRef actions. `Keys` is a Union Type of the array values
 * passed as arguments to useFormFieldsRef.
 *
 * @example
 * export const connexionInputs = ['username', 'password'] as const
 * type Action = useFormFieldsRefActions<(typeof connexionInputs)[number]>
 * //^?
 * type Actions = {
 *   setRef: (key: "username" | "password") => RefCallback<HTMLFieldElement>;
 *   getRef: (key: "username" | "password") => string;
 *   getAllRef: () => Record<"username" | "password", HTMLFieldElement | null>;
 *   getFormData: () => FormData;
 * }
 *
 * // To retrieve the specific type of one of the action methods
 * type SetRefField = Actions['setRef']
 * //^?
 * type SetRefField = (key: "username" | "password") => RefCallback<HTMLFieldElement>
 */
export type useFormFieldsRefActions<Keys extends string> = ReturnType<
  typeof useFormFieldsRef<Keys>
>[1];
