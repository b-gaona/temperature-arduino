import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";

function Form({ config, objectConfig, onSubmit, children }) {
  const [user, setUser] = useState(objectConfig);

  useEffect(() => {
    setUser(objectConfig);
  }, [objectConfig]);

  const handleSelectChange = (option) => {
    const { label, value, property } = option;
    setUser((curr) => {
      return { ...curr, [property]: value, [property + "_label"]: label };
    });
  };

  const handleInputChange = (value) => {
    const { text, property } = value;
    setUser((curr) => {
      return { ...curr, [property]: text };
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(user);
  };

  const renderedItems = config.map((element) => {
    const {
      input: { type, data, property, placeholder },
      label,
    } = element;

    const ddLogic = {
      onChange: handleSelectChange,
      currentValue: user[property],
      options: data,
      property,
      placeholder,
    };

    const inpLogic = {
      property,
      type,
      value: user[property],
      onChange: handleInputChange,
      placeholder,
    };

    const input =
      type !== "select" ? (
        <Input
          className="border rounded-lg text-lg py-1 indent-3 w-full"
          {...inpLogic}
        />
      ) : (
        <Dropdown className="text-lg" {...ddLogic} />
      );

    return (
      <fieldset className="flex flex-col" key={label}>
        <label className="text-lg" htmlFor={property}>
          {label}
        </label>
        {input}
      </fieldset>
    );
  });

  return (
    <form
      className="flex flex-col justify-between gap-4"
      onSubmit={handleSubmit}
    >
      {children}
      {renderedItems}
      <Button
        className="text-lg justify-center rounded-md mt-5 hover:bg-green-600 w-full"
        success
      >
        Enviar
      </Button>
    </form>
  );
}

export default Form;
