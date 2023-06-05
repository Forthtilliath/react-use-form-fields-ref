import { renderHook } from "@testing-library/react";
import { useFormFieldsRef } from "./useFormFieldsRef";

const inputsName = [
  "username",
  "password",
  "gender",
  "message",
  "age",
] as const;

type InputKey = (typeof inputsName)[number];
type Hook = ReturnType<typeof useFormFieldsRef<InputKey>>;

let refs: Hook[0], actions: Hook[1];

beforeEach(() => {
  const { result } = renderHook(() => useFormFieldsRef(inputsName));

  [refs, actions] = result.current;
});

function createOption(value: string, text: string, disabled = false) {
  const option = document.createElement("option");

  option.value = value;
  option.text = text;
  option.disabled = disabled;

  return option;
}

describe("useFormFieldsRef", () => {
  describe("refs", () => {
    it("should initiate all fields at null", () => {
      expect(refs.current).toStrictEqual({
        username: null,
        password: null,
        gender: null,
        message: null,
        age: null,
      });
    });
  });

  describe("setRef", () => {
    it("should set the reference of an input element", () => {
      // Create a mock input element and set its ref
      const mockInputElement = document.createElement("input");
      actions.setRef("username")(mockInputElement);

      // Check that the ref was set correctly
      expect(refs.current.username).toEqual(mockInputElement);
    });

    it("should set the reference of a radio input element", () => {
      // Create a mock input element and set its ref
      const mockRadioElement = document.createElement("input");
      mockRadioElement.type = "radio";
      mockRadioElement.value = "minor";
      const mockRadioElement2 = document.createElement("input");
      mockRadioElement2.type = "radio";
      mockRadioElement2.value = "major";
      actions.setRef("age")(mockRadioElement);
      actions.setRef("age")(mockRadioElement2);

      // Check that the ref was set correctly
      expect(refs.current.age).toEqual([mockRadioElement, mockRadioElement2]);
    });

    it("should set the reference of a select element", () => {
      // Create a mock select element and set its ref
      const mockSelectElement = document.createElement("select");
      actions.setRef("gender")(mockSelectElement);

      // Check that the ref was set correctly
      expect(refs.current.gender).toEqual(mockSelectElement);
    });

    it("should set the reference of a textarea element", () => {
      // Create a mock textarea element and set its ref
      const mockTextAreaElement = document.createElement("textarea");
      actions.setRef("message")(mockTextAreaElement);

      // Check that the ref was set correctly
      expect(refs.current.message).toEqual(mockTextAreaElement);
    });
  });

  describe("getRef", () => {
    it("should return an error exception if the field is not defined", () => {
      try {
        actions.getRef("username");
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toBe("The username reference is not affected!");
        } else {
          expect(true).toBeFalsy();
        }
      }
    });

    it("should return the value contained in the input reference for a given key", () => {
      // Create a mock input element and set its ref
      const mockInputElement = document.createElement("input");
      mockInputElement.value = "forthtilliath";
      actions.setRef("username")(mockInputElement);

      expect(actions.getRef("username")).toBe("forthtilliath");
    });

    it("should return the value contained in the select reference for a given key", () => {
      // Create a mock select element and set its ref
      const mockSelectElement = document.createElement("select");
      mockSelectElement.add(createOption("default", "Gender", true));
      mockSelectElement.add(createOption("male", "Male"));
      mockSelectElement.add(createOption("female", "Female"));
      mockSelectElement.add(createOption("other", "Other"));
      mockSelectElement.value = "default";
      mockSelectElement.value = "female";
      actions.setRef("gender")(mockSelectElement);

      expect(actions.getRef("gender")).toBe("female");
    });

    it("should return the value contained in the textarea reference for a given key", () => {
      // Create a mock textarea element and set its ref
      const mockTextAreaElement = document.createElement("textarea");
      mockTextAreaElement.value = "This is a test message !";
      actions.setRef("message")(mockTextAreaElement);

      expect(actions.getRef("message")).toBe("This is a test message !");
    });
  });

  describe("getField", () => {
    it("should return an error exception if the field is not defined", () => {
      try {
        actions.getField("username");
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toBe("The username reference is not affected!");
        } else {
          expect(true).toBeFalsy();
        }
      }
    });

    it("should return the element contained in the input reference for a given key", () => {
      // Create a mock input element and set its ref
      const mockInputElement = document.createElement("input");
      actions.setRef("username")(mockInputElement);

      // Check that the ref was set correctly
      expect(actions.getField("username")).toEqual(mockInputElement);
    });

    it("should return the element contained in the select reference for a given key", () => {
      // Create a mock select element and set its ref
      const mockSelectElement = document.createElement("select");
      actions.setRef("gender")(mockSelectElement);

      // Check that the ref was set correctly
      expect(actions.getField("gender")).toEqual(mockSelectElement);
    });

    it("should return the element contained in the fieldsRef reference for a given key", () => {
      // Create a mock textarea element and set its ref
      const mockTextAreaElement = document.createElement("textarea");
      actions.setRef("message")(mockTextAreaElement);

      // Check that the ref was set correctly
      expect(actions.getField("message")).toEqual(mockTextAreaElement);
    });
  });

  describe("getAllRef", () => {
    it("should return an object containing values from a list of input references", () => {
      const mockInputElement = document.createElement("input");
      mockInputElement.value = "forthtilliath";
      actions.setRef("username")(mockInputElement);
      const mockInputElement2 = document.createElement("input");
      mockInputElement2.value = "secret";
      actions.setRef("password")(mockInputElement2);

      const mockRadioElement = document.createElement("input");
      mockRadioElement.type = "radio";
      mockRadioElement.value = "minor";
      const mockRadioElement2 = document.createElement("input");
      mockRadioElement2.type = "radio";
      mockRadioElement2.value = "major";
      mockRadioElement2.checked = true;
      actions.setRef("age")(mockRadioElement);
      actions.setRef("age")(mockRadioElement2);

      const mockSelectElement = document.createElement("select");
      mockSelectElement.add(createOption("default", "Gender", true));
      mockSelectElement.add(createOption("male", "Male"));
      mockSelectElement.add(createOption("female", "Female"));
      mockSelectElement.add(createOption("other", "Other"));
      mockSelectElement.value = "male";
      actions.setRef("gender")(mockSelectElement);

      const mockTextAreaElement = document.createElement("textarea");
      mockTextAreaElement.value = "This is a test message !";
      actions.setRef("message")(mockTextAreaElement);

      expect(actions.getAllRef()).toEqual({
        username: "forthtilliath",
        password: "secret",
        gender: "male",
        message: "This is a test message !",
        age: "major",
      });
    });
  });

  describe("getFormData", () => {
    it("should return a FormData object with the correct values", () => {
      const mockInputElement = document.createElement("input");
      mockInputElement.value = "forthtilliath";
      actions.setRef("username")(mockInputElement);
      const mockInputElement2 = document.createElement("input");
      mockInputElement2.value = "secret";
      actions.setRef("password")(mockInputElement2);

      const mockRadioElement = document.createElement("input");
      mockRadioElement.type = "radio";
      mockRadioElement.value = "minor";
      const mockRadioElement2 = document.createElement("input");
      mockRadioElement2.type = "radio";
      mockRadioElement2.value = "major";
      mockRadioElement2.checked = true;
      actions.setRef("age")(mockRadioElement);
      actions.setRef("age")(mockRadioElement2);

      const mockSelectElement = document.createElement("select");
      mockSelectElement.add(createOption("default", "Gender", true));
      mockSelectElement.add(createOption("male", "Male"));
      mockSelectElement.add(createOption("female", "Female"));
      mockSelectElement.add(createOption("other", "Other"));
      mockSelectElement.value = "male";
      actions.setRef("gender")(mockSelectElement);

      const mockTextAreaElement = document.createElement("textarea");
      mockTextAreaElement.value = "This is a test message !";
      actions.setRef("message")(mockTextAreaElement);

      const formData = new FormData();
      formData.append("username", "forthtilliath");
      formData.append("password", "secret");
      formData.append("gender", "male");
      formData.append("message", "This is a test message !");
      formData.append("age", "major");

      expect(actions.getFormData()).toEqual(formData);
    });
  });
});
