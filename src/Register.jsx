import { useState } from "react";
import "./register.css";
import Creatable from "react-select/creatable";

const roles = [
  { label: "admin", value: "admin@email.com" },
  { label: "student", value: "student@email.com" },
  { label: "tutor", value: "tutor@email.com" },
  { label: "gurdian", value: "gurdian@email.com" },
];

const customStyle = {
  option: (provided, state) => ({
    ...provided,
    borderButton: "1px dotted pink",
    color: state.isSelected ? "red" : "blue",
    padding: 20,
  }),
};

const Register = () => {
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [age, setAge] = useState("");
  const [roleValue, setRoleValue] = useState("");
  const [validError, setValidError] = useState("");
  let properValue = [];

  const handleChange = async (newValue, actionMeta) => {
    properValue = [...roleValue];
    console.log("first");
    console.log(roleValue);
    console.log("in handle change");
    console.log(`action: ${actionMeta.action}`);
    const actionType = actionMeta.action;
    console.log("new value", newValue);
    console.log(actionType);
    console.log("action type", typeof actionMeta.action);
    console.log(actionType === "select-option");
    if (actionType === "create-option") {
      console.log("in action meta");
      const last = newValue[newValue.length - 1];
      console.log("last", last);
      const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
      if (emailRegex.test(last.value)) {
        console.log("in email regex");
        properValue = [...properValue, last];
        setValidError("");
      } else {
        setValidError(`${last.value} is not valid email`);
      }
      setRoleValue(properValue);
    }
    if (actionType === "select-option") {
      const last = newValue[newValue.length - 1];
      properValue = [...properValue, last];
      setRoleValue(properValue);
      setValidError("");
    }
    if (actionType === "remove-value") {
      console.log("reove-value", newValue);
      properValue = [...newValue];
      setRoleValue(properValue);
      setValidError("");
    }
    if (actionType === "clear") {
      properValue = "";
      setRoleValue(properValue);
    }

    // switch (field) {
    //   case "roles":
    //     try {
    //       console.log("in try");
    //       console.log(typeof value);
    //       const demo = [...value];
    //       console.log(demo);
    //       let last;
    //       last = demo.slice(-1)[0];
    //       console.log("last  =======> ", last);
    //       console.log("typeof last  =======>", typeof last.value);
    //       const strToNumber = parseInt(last.value);
    //       console.log(strToNumber);
    //       if (!isNaN(strToNumber)) {
    //         console.log("in condition");
    //         setRoleValue(value);
    //       }
    //     } catch {
    //       console.log("not possible");
    //       return;
    //     }
    //     console.log(value);
    //     break;

    //   default:
    //     break;
    // }
  };

  const onSubmitClick = () => {
    console.log(roleValue);
  };

  return (
    <div className="container">
      <h3>Add User</h3>
      <div className="register-form">
        <div className="input">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Family</label>
          <input
            type="text"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Age</label>
          <input
            type="number"
            value={family}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Roles</label>
          <Creatable
            isMulti
            onChange={handleChange}
            options={roles}
            value={roleValue}
            styles={customStyle}
          />
        </div>
        {validError && validError}
        <div className="buttons">
          <button onClick={onSubmitClick}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
