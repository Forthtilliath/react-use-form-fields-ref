# @forthtilliath/react-use-form-fields-ref

[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/Forthtilliath/react-use-form-fields-ref/blob/main/README.md) [![fr](https://img.shields.io/badge/lang-fr-blue.svg)](https://github.com/Forthtilliath/react-use-form-fields-ref/blob/main/README.fr.md)

## Introduction

[![npm version](https://img.shields.io/npm/v/@forthtilliath/react-use-form-fields-ref?&label=version&style=flat-square)](https://img.shields.io/npm/v/@forthtilliath/react-use-form-fields-ref?label=version&style=flat-square) [![npm download](https://img.shields.io/npm/dt/@forthtilliath/react-use-form-fields-ref?style=flat-square)](https://img.shields.io/npm/dt/@forthtilliath/react-use-form-fields-ref?style=flat-square) [![github repo size](https://img.shields.io/github/repo-size/Forthtilliath/react-use-form-fields-ref?style=flat-square)](https://img.shields.io/github/repo-size/Forthtilliath/react-use-form-fields-ref?style=flat-square) [![licence](https://img.shields.io/npm/l/@forthtilliath/react-use-form-fields-ref?style=flat-square)](https://img.shields.io/npm/l/@forthtilliath/react-use-form-fields-ref?style=flat-square)

The ``@forthtilliath/react-use-form-fields-ref`` package is a library that provides a React hook called ``useFormFieldsRef``. This hook allows you to manage form field references in a React component. It returns an array containing two elements: an object that contains the references for each field, and an object that contains functions to interact with these references.

The ``useFormFieldsRef`` hook is useful for simplifying the management of form fields in a React component. It makes it easy to define references for each field and to interact with these references in a consistent way. The ``@forthtilliath/react-use-form-fields-ref`` package is easy to use and can be installed via NPM, Yarn or PNPM.

## Install

Install it from npm and include it in your React build process

```bash
npm install --save @forthtilliath/react-use-form-fields-ref
```

or from yarn:

```bash
yarn add --dev @forthtilliath/react-use-form-fields-ref
```

or from pnpm:

```bash
pnpm install --save @forthtilliath/react-use-form-fields-ref
```

## Usage

Here's a sample form showing how to use the ``useFormFieldsRef`` hook to handle references for input fields, radio buttons, and a drop-down list:

##### JSX

```jsx
import { useFormFieldsRef } from "@forthtilliath/react-use-form-fields-ref";

export function MyForm() {
  const [
    fieldsRef,
    { setRef, getRef, getField, getAllRef, getFormData, isFieldNotNull },
  ] = useFormFieldsRef(["username", "password", "gender", "message", "age"]);

  const handleSubmit = () => {
    const usernameField = getField("username");
    if (isFieldNotNull(usernameField)) {
      console.log(usernameField.value);
    }
    console.log(getRef("age"));
    console.log(getAllRef());
    console.log(Object.fromEntries(getFormData()));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Examples with inputs */}
      <input type="text" ref={setRef("username")} placeholder="Username" />
      <input type="password" ref={setRef("password")} placeholder="Password" />

      {/* Examples with input radio */}
      <label>
        <span>Minor:</span>
        <input type="radio" name="age" ref={setRef("age")} value="minor" />
      </label>
      <label>
        <span>Minor:</span>
        <input type="radio" name="age" ref={setRef("age")} value="major" />
      </label>

      {/* Examples with select */}
      <select ref={setRef("gender")} defaultValue={"default"}>
        <option value="default" disabled>
          Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <textarea ref={setRef("message")} placeholder="Message" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

##### TSX

```tsx
import { useFormFieldsRef } from "@forthtilliath/react-use-form-fields-ref";

export function MyForm() {
  const [
    fieldsRef,
    { setRef, getRef, getField, getAllRef, getFormData, isFieldNotNull },
  ] = useFormFieldsRef(["username", "password", "gender", "message", "age"]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = () => {
    const usernameField = getField("username");
    if (isFieldNotNull(usernameField)) {
      console.log(usernameField.value);
    }
    console.log(getRef("age"));
    console.log(getAllRef());
    console.log(Object.fromEntries(getFormData()));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Examples with inputs */}
      <input type="text" ref={setRef("username")} placeholder="Username" />
      <input type="password" ref={setRef("password")} placeholder="Password" />

      {/* Examples with input radio */}
      <label>
        <span>Minor:</span>
        <input type="radio" name="age" ref={setRef("age")} value="minor" />
      </label>
      <label>
        <span>Major:</span>
        <input type="radio" name="age" ref={setRef("age")} value="major" />
      </label>

      {/* Examples with select */}
      <select ref={setRef("gender")} defaultValue={"default"}>
        <option value="default" disabled>
          Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <textarea ref={setRef("message")} placeholder="Message" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

The code uses the `useFormFieldsRef` hook to create a reference for each input field in the form. This function returns an array containing two elements: an object of references for each input field, and an object containing functions to interact with the references.

Once the references are created, the code defines the input fields of the form using the JSX elements `<input>`, `<select>`, and `<textarea>`. For each input field, it uses the `setRef` function provided by `useFormFieldsRef` to create a reference.

When the user submits the form by clicking on the "Submit" button, the code calls the `handleSubmit` function, which uses the functions provided by `useFormFieldsRef` to access the current values of the input fields, and logs them to the console.

## useFormFieldsRef return

The hook returns an array containing two elements:

- The first element is an initialized `useRef` object with an object containing null values for each input.
- The second element is an object containing functions to interact with the `useRef` object.

### First key : `useRef` object

The first element is the reference which contains all fields. You can access them in the following way :

##### JSX / TSX

```tsx
const [myFormRef, actions] = useFormFieldsRef(myFields);

const checkInput = () => {
  // Focus the input if it's empty
  // myInput has the type HTMLFieldElement | null
  // HTMLFieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  const myInput = refs.current.username;
  if (myInput && myInput.value === "") {
    myInput.focus();
  }
};
```
Here, we can see that ``refs.current.username`` corresponds to the reference for the ``username`` field. This reference can be used to access the current value of the input field.

### Second key : actions

The second element is an object which contains all actions.

#### setRef

`setRef` returns a callback used to update the reference bound to the given key.

##### JSX / TSX

```tsx
<input type="text" ref={setRef("username")} placeholder="Username" />
```

In this example, ``setRef("username")`` is used to create a reference for the input field.

#### getRef

`getRef` returns the value contained in the ``fieldsRef`` reference to the given key. An input radio will return an empty string.

##### JSX / TSX

```tsx
const [, { getRef }] = useFormFieldsRef(["username", "password"]);

const handleSubmit = () => {
  console.log(getRef("username"));
};
```

The code creates references for the "username" and "password" input fields using `useFormFieldsRef`, and uses `getRef` to obtain the value of the "username" input field when `handleSubmit` is called and display it.

#### getField

`getField` returns the element contained in the `fieldsRef` reference to the given key. An input radio will return an array of input which contains `HTMLInputElement` from the given key.

##### JSX

```jsx
const [, { getField }] = useFormFieldsRef(["username", "password"]);

const checkInput = () => {
  const myUsernameInput = getField("username");
  if (myUsernameInput.value === "") {
    myUsernameInput.focus();
  }
};
```

##### TSX

```tsx
const [, { getField }] = useFormFieldsRef(["username", "password"]);

const checkInput = () => {
  const myUsernameInput = getField<HTMLInputElement>("username");
  if (myUsernameInput.value === "") {
    myUsernameInput.focus();
  }
};
```

The code creates a reference for the "username" input field using ``useFormFieldsRef``, and uses ``getField`` to obtain the value of the "username" input field when ``checkInput`` is called. If the value of the input field is an empty string, ``checkInput`` sets the focus on the "username" input field.

#### getAllRef

`getAllRef` returns an object containing values from a list of input references.

##### JSX / TSX

```tsx
const [, { getAllRef }] = useFormFieldsRef(["username", "password"]);

const handleSubmit = () => {
  console.log(getAllRef());
};
```

The code creates references for the "username" and "password" input fields and uses ``getAllRef`` to obtain the values of both input fields when ``handleSubmit`` is called and logs them to the console.

#### getFormData

`getFormData` gets form data from input fields and returns it as a ``FormData`` object.

##### JSX / TSX

```tsx
const [, { getFormData }] = useFormFieldsRef(["username", "password"]);

const handleSubmit = () => {
  console.log(Object.fromEntries(getFormData()));
};
```

The code creates references for the "username" and "password" input fields and defines a function ``getFormData`` that returns a ``FormData`` object containing the values of the input fields. When ``handleSubmit`` is called, the code logs an object containing the values of the input fields to the console.

#### isFieldNotNull

`isFieldNotNull` is a function that checks if a given ``HTMLFieldElement`` is not null.

##### JSX

```jsx
const focusIfEmpty = (key) => {
  const field = getField(key);
  if (isFieldNotNull(field)) {
    if (field.value === "") field.focus();
  } else {
    throw new Error(`The field with ${key} key is null`);
  }
};
```

##### TSX

```tsx
type InputKey = (typeof inputsName)[number];

const focusIfEmpty = (key: InputKey) => {
  const field = getField(key);
  if (isFieldNotNull(field)) {
    if (field.value === "") field.focus();
  } else {
    throw new Error(`The field with ${key} key is null`);
  }
};
```

The code defines a function ``focusIfEmpty`` that sets the focus on an input field if it is empty, and throws an error if the field is null.

## Utility types

### useFormFieldsRefActions

The `useFormFieldsRefActions` type helps to get the return type of the second parameter of the hook. This can be useful when you pass `setRef` to a child.

##### TSX

```tsx
// In your form component
export const connexionInputs = ["username", "password"] as const;

// In your child component
import { useFormFieldsRefActions } from "@forthtilliath/react-use-form-fields-ref";

// Action contains all actions type
type InputKey = (typeof connexionInputs)[number];
type Action = useFormFieldsRefActions<InputKey>;

type Props = {
  // Note the setRef to get only the type of the methode setRef
  setRef: Action["setRef"];
};
```
