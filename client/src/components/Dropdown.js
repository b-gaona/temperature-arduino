import Panel from "./Panel";

function Dropdown({ options, currentValue, onChange, property }) {
  const handleOptionClick = (option) => {
    onChange({ ...option, property });
  };

  const renderedOptions = options.map((option) => {
    const { label, value } = option;

    return (
      <option
        key={label}
        className="hover:bg-sky-100 cursor-pointer w-100"
        style={{ all: "none" }}
        value={value}
      >
        {label}
      </option>
    );
  });

  return (
    <div>
      <Panel className="bg-white w-full p-0">
        <select
          onChange={(evt) =>
            handleOptionClick({
              value: evt.target.value,
              label: evt.target.options[evt.target.selectedIndex].text,
              property,
            })
          }
          className="w-full rounded p-3 cursor-pointer active:outline-none"
          value={currentValue}
        >
          <option value="">Selecciona la {property}</option>
          {renderedOptions}
        </select>
      </Panel>
    </div>
  );
}

export default Dropdown;
