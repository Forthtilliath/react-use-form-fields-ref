import { renderHook } from "@testing-library/react";
import { useFormFieldsRef } from "./useFormFieldsRef";

describe("useFormFieldsRef", () => {
  describe("refs", () => {
    it("should initiate all fields at null", () => {
      const { result } = renderHook(() => useFormFieldsRef(["username", "password"]));

      const [refs] = result.current;

      expect(refs.current).toStrictEqual({
        username: null,
        password: null
      });
      
    });
  });

  describe("setRef", () => {
    it("should set the reference of an input element", () => {
      // const { result } = renderHook(() => useFormFieldsRef(["username"]));

      // const [refs] = result.current;

      // expect(refs.current.username).toBe(null);
    });
  });
});
