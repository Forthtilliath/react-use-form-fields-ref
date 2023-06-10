# react-use-form-fields-ref

[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/Forthtilliath/react-use-form-fields-ref/blob/main/README.md) [![fr](https://img.shields.io/badge/lang-fr-blue.svg)](https://github.com/Forthtilliath/react-use-form-fields-ref/blob/main/README.fr.md)

## Introduction

[![npm version](https://img.shields.io/npm/v/@forthtilliath/react-use-form-fields-ref?&label=version&style=flat-square)](https://img.shields.io/npm/v/@forthtilliath/react-use-form-fields-ref?label=version&style=flat-square) [![npm download](https://img.shields.io/npm/dt/@forthtilliath/react-use-form-fields-ref?style=flat-square)](https://img.shields.io/npm/dt/@forthtilliath/react-use-form-fields-ref?style=flat-square) [![github repo size](https://img.shields.io/github/repo-size/Forthtilliath/react-use-form-fields-ref?style=flat-square)](https://img.shields.io/github/repo-size/Forthtilliath/react-use-form-fields-ref?style=flat-square) [![licence](https://img.shields.io/npm/l/@forthtilliath/react-use-form-fields-ref?style=flat-square)](https://img.shields.io/npm/l/@forthtilliath/react-use-form-fields-ref?style=flat-square)

Le package `@forthtilliath/react-use-form-fields-ref` est une bibliothèque qui fournit un hook React appelé `useFormFieldsRef`. Ce hook vous permet de gérer les références de champs de formulaire dans un composant React. Il renvoie un tableau contenant deux éléments : un objet qui contient les références pour chaque champ, et un objet qui contient des fonctions pour interagir avec ces références.

Le hook `useFormFieldsRef` est utile pour simplifier la gestion des champs de formulaire dans un composant React. Il facilite la définition de références pour chaque champ et l'interaction avec ces références de manière cohérente. Le package `@forthtilliath/react-use-form-fields-ref` est facile à utiliser et peut être installé via NPM, Yarn ou PNPM.

## Installation

Installez-le depuis npm et incluez-le dans votre processus de construction React

```bash
npm install --save @forthtilliath/react-use-form-fields-ref
```

ou depuis yarn :

```bash
yarn add --dev @forthtilliath/react-use-form-fields-ref
```

ou depuis pnpm :

```bash
pnpm install --save @forthtilliath/react-use-form-fields-ref
```

## Usage

Voici un exemple de formulaire montrant comment utiliser le hook ``useFormFieldsRef`` pour gérer les références des champs de saisie, des boutons radio et d'une liste déroulante :

__JSX__

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
      {/* Exemples avec des champs de saisie */}
      <input type="text" ref={setRef("username")} placeholder="Nom d'utilisateur" />
      <input type="password" ref={setRef("password")} placeholder="Mot de passe" />

      {/* Exemples avec des boutons radio */}
      <label>
        <span>Mineur :</span>
        <input type="radio" name="age" ref={setRef("age")} value="mineur" />
      </label>
      <label>
        <span>Majeur :</span>
        <input type="radio" name="age" ref={setRef("age")} value="majeur" />
      </label>

      {/* Exemples avec des listes déroulantes */}
      <select ref={setRef("gender")} defaultValue={"default"}>
        <option value="default" disabled>
          Genre
        </option>
        <option value="male">Homme</option>
        <option value="female">Femme</option>
        <option value="other">Autre</option>
      </select>

      <textarea ref={setRef("message")} placeholder="Message" />
      <button type="submit">Envoyer</button>
    </form>
  );
}
```

__TSX__

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
      {/* Exemples avec des champs de saisie */}
      <input type="text" ref={setRef("username")} placeholder="Nom d'utilisateur" />
      <input type="password" ref={setRef("password")} placeholder="Mot de passe" />

      {/* Exemples avec des boutons radio */}
      <label>
        <span>Mineur :</span>
        <input type="radio" name="age" ref={setRef("age")} value="mineur" />
      </label>
      <label>
        <span>Majeur :</span>
        <input type="radio" name="age" ref={setRef("age")} value="majeur" />
      </label>

      {/* Exemples avec des listes déroulantes */}
      <select ref={setRef("gender")} defaultValue={"default"}>
        <option value="default" disabled>
          Genre
        </option>
        <option value="male">Homme</option>
        <option value="female">Femme</option>
        <option value="other">Autre</option>
      </select>

      <textarea ref={setRef("message")} placeholder="Message" />
      <button type="submit">Envoyer</button>
    </form>
  );
}
```

Le code utilise le hook ``useFormFieldsRef`` pour créer une référence pour chaque champ de saisie dans le formulaire. Cette fonction renvoie un tableau contenant deux éléments : un objet de références pour chaque champ de saisie, et un objet contenant des fonctions pour interagir avec les références.

Une fois les références créées, le code définit les champs de saisie du formulaire en utilisant les éléments JSX ``<input>``, ``<select>`` et ``<textarea>``. Pour chaque champ de saisie, il utilise la fonction ``setRef`` fournie par ``useFormFieldsRef`` pour créer une référence.

Lorsque l'utilisateur soumet le formulaire en cliquant sur le bouton "Submit", le code appelle la fonction ``handleSubmit``, qui utilise les fonctions fournies par ``useFormFieldsRef`` pour accéder aux valeurs actuelles des champs de saisie, et les affiche dans la console.

## Ce que retourne useFormFieldsRef

Le hook `useFormFieldsRef` renvoie un tableau contenant deux éléments :

- Le premier élément est un objet `useRef` initialisé avec un objet contenant des valeurs ``null`` pour chaque champ de saisie.
- Le deuxième élément est un objet contenant des fonctions pour interagir avec l'objet `useRef`.


### Premier élément : objet `useRef`

Dans le code donné, on peut voir que le premier élément d'un tableau renvoyé par la fonction useFormFieldsRef correspond à un objet de références pour chaque champ de saisie. On peut y accéder de la manière suivante :

__JSX / TSX__

```tsx
const [myFormRef, actions] = useFormFieldsRef(myFields);

// Met le focus sur le champ `username` si celui-ci est vide
const checkInput = () => {
  // myInput has the type HTMLFieldElement | null
  // Le type HTMLFieldElement est union type
  // HTMLFieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  const myInput = refs.current.username;
  if (myInput && myInput.value === "") {
    myInput.focus();
  }
};
```
Ici, on peut voir que ``refs.current.username`` correspond à la référence du champ ``username``. Cette référence peut être utilisée pour accéder à la valeur actuelle du champ de saisie.

### Second élément : ``actions``

Le second élément est un objet qui contient toutes les actions. Voici une liste de ces fonctions avec une brève description de ce qu'elles font : 

* `getFieldsRef` : renvoie un objet qui contient les références pour chaque champ.
* `setRef` : renvoie une fonction qui prend un élément `HTMLInputElement`, `HTMLSelectElement` ou `HTMLTextAreaElement` en argument et définit la référence pour le champ correspondant au nom donné.
* `getRef` : renvoie la référence pour le champ correspondant au nom donné.
* `getField` : renvoie un objet contenant la référence et la valeur pour le champ correspondant au nom donné.
* `getAllRefs` : renvoie un objet contenant toutes les références pour chaque champ.
* `getFormData` : renvoie un tableau contenant des paires clé-valeur pour chaque champ.
* `isFieldNotNull` : renvoie `true` si le champ n'est pas nul, `false` sinon.

#### setRef

`setRef` renvoie un rappel utilisé pour mettre à jour la référence liée à la clé donnée.

__JSX / TSX__

```tsx
<input type="text" ref={setRef("username")} placeholder="Username" />
```

Dans cet exemple, ``setRef("username")`` est utilisé pour créer une référence pour le champ de saisie.

#### getRef

``getRef`` renvoie la valeur contenue dans la référence ``fieldsRef`` pour la clé donnée. Un bouton radio renverra une chaîne vide.

__JSX / TSX__

```tsx
const [, { getRef }] = useFormFieldsRef(["username", "password"]);

const handleSubmit = () => {
  console.log(getRef("username"));
};
```

Le code crée des références pour les champs de saisie "username" et "password" et utilise ``getRef`` pour obtenir la valeur du champ de saisie "username" lorsque ``handleSubmit`` est appelée et l'afficher.

#### getField

`getField` renvoie l'élément contenu dans la référence `fieldsRef` pour la clé donnée. Un bouton radio renverra un tableau d'entrées qui contient des `HTMLInputElement` de la clé donnée.

__JSX__

```jsx
const [, { getField }] = useFormFieldsRef(["username", "password"]);

const checkInput = () => {
  const myUsernameInput = getField("username");
  if (myUsernameInput.value === "") {
    myUsernameInput.focus();
  }
};
```

__TSX__

```tsx
const [, { getField }] = useFormFieldsRef(["username", "password"]);

const checkInput = () => {
  const myUsernameInput = getField<HTMLInputElement>("username");
  if (myUsernameInput.value === "") {
    myUsernameInput.focus();
  }
};
```

Le code crée une référence pour le champ de saisie "username" en utilisant `useFormFieldsRef`, et utilise `getField` pour obtenir la valeur du champ de saisie "username" lorsque `checkInput` est appelée. Si la valeur du champ de saisie est une chaîne vide, `checkInput` met le focus sur le champ de saisie "username".

#### getAllRef

`getAllRef` renvoie un objet contenant des valeurs à partir d'une liste de références d'entrée.

__JSX / TSX__

```tsx
const [, { getAllRef }] = useFormFieldsRef(["username", "password"]);

const handleSubmit = () => {
  console.log(getAllRef());
};
```

Le code crée des références pour les champs de saisie "username" et "password" en utilisant ``useFormFieldsRef``, et utilise ``getAllRef`` pour obtenir les valeurs des deux champs de saisie lorsque ``handleSubmit`` est appelée et les afficher dans la console.

#### getFormData

`getFormData` récupère les données d'un formulaire à partir des champs de saisie et les renvoie sous forme d'un objet ``FormData``.

__JSX / TSX__

```tsx
const [, { getFormData }] = useFormFieldsRef(["username", "password"]);

const handleSubmit = () => {
  console.log(Object.fromEntries(getFormData()));
};
```

Le code crée des références pour les champs de saisie "username" et "password" en utilisant ``useFormFieldsRef``, et définit une fonction ``getFormData`` qui renvoie un objet ``FormData`` contenant les valeurs des champs de saisie. Lorsque ``handleSubmit`` est appelée, le code affiche un objet contenant les valeurs des champs de saisie dans la console.

#### isFieldNotNull

`isFieldNotNull` est une fonction qui vérifie si un élément ``HTMLFieldElement`` donné n'est pas nul.

__JSX__

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

__TSX__

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

Le code définit une fonction ``focusIfEmpty`` qui met le focus sur un champ de saisie s'il est vide, et lance une erreur si le champ est nul.

## Types utilitaires

### UseFormFieldsRefActions

``UseFormFieldsRefActions`` est un type qui aide à obtenir le type de retour du deuxième paramètre d'un hook. Cela peut être utile lorsque vous passez ``setRef`` à un enfant.

__TSX__

```tsx
// Dans votre composant de formulaire
export const connexionInputs = ["username", "password"] as const;

// Dans votre composant enfant
import { UseFormFieldsRefActions } from "@forthtilliath/react-use-form-fields-ref";

// Action contient tous les types d'action
type InputKey = (typeof connexionInputs)[number];
type Action = UseFormFieldsRefActions<InputKey>;

type Props = {
  // Notez le setRef pour obtenir uniquement le type de la méthode setRef
  setRef: Action["setRef"];
};
```

## Exemple d'utilisation

Consultez cet [exemple StackBlitz](https://stackblitz.com/edit/react-use-form-fields-ref?file=src%2Fcomponents%2FSignUpForm.tsx) ([version JS](https://stackblitz.com/edit/reactjs-use-form-fields-ref?file=src%2Fcomponents%2FSignUpForm.jsx)) pour voir comment ces fonctions peuvent être utilisées dans un formulaire React .

Dans l'exemple, vous pouvez voir comment le crochet `useFormFieldsRef` est utilisé pour gérer les champs du formulaire et comment les autres fonctions peuvent être utilisées pour accéder ou manipuler les données du formulaire. N'hésitez pas à bifurquer l'exemple et à l'expérimenter vous-même !

Faites-moi savoir si vous avez des questions ou des commentaires sur l'exemple.