import { renderHook } from "@testing-library/react";
import { useFormFieldsRef } from "./useFormFieldsRef";

const inputsName = ["username", "password"] as const;
type InputKey = (typeof inputsName)[number];

type Hook = ReturnType<typeof useFormFieldsRef<InputKey>>;
let refs: Hook[0];
let actions: Hook[1];

beforeAll(() => {
  const { result } = renderHook(() => useFormFieldsRef(inputsName));

  [refs, actions] = result.current;
});

describe("useFormFieldsRef", () => {
  describe("refs", () => {
    it("should initiate all fields at null", () => {
      // const { result } = renderHook(() => useFormFieldsRef(["username", "password"]));

      // const [refs] = result.current;

      expect(refs.current).toStrictEqual({
        username: null,
        password: null,
      });
    });
  });

  describe("setRef", () => {
    it("should set the reference of a radio input element", () => {
      // Test that the setRef function sets the reference for a given radio input element
      const input = document.createElement("input");
    });
  });

  describe("getRef", () => {
    it("should return the value contained in the fieldsRef reference for a given key", () => {
      // Test that the getRef function returns the correct value for a given key
    });
  });

  describe("getField", () => {
    it("should return the element contained in the fieldsRef reference for a given key", () => {
      // Test that the getField function returns the correct element for a given key
    });
  });

  describe("getAllRef", () => {
    it("should return an object containing values from a list of input references", () => {
      // Test that the getAllRef function returns the correct object containing values from input references
    });
  });

  describe("getFormData", () => {
    it("should return a FormData object with the correct values", () => {
      // Test that the getFormData function returns the correct FormData object with the input values
    });
  });
});
