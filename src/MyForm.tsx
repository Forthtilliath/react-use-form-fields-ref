import { useFormFieldsRef } from "./useFormFieldsRef";

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
      <input
        type="text"
        name="username"
        ref={setRef("username")}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        ref={setRef("password")}
        placeholder="Password"
      />

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
      <select ref={setRef("gender")} name="gender" defaultValue={"default"}>
        <option value="default" disabled>
          Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <textarea ref={setRef("message")} name="message" placeholder="Message" />
      <button type="submit">Submit</button>
    </form>
  );
}
