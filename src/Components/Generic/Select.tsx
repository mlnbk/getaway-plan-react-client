import { FC } from 'react';
import Select, {
  ActionMeta,
  GroupBase,
  OptionsOrGroups,
  PropsValue,
  SingleValue,
} from 'react-select';

interface SelectProperties {
  label: string;
  name: string;
  placeholder: string;
  ref?: any;
  options:
    | OptionsOrGroups<
        {
          label: string;
          value: string;
        },
        GroupBase<{
          label: string;
          value: string;
        }>
      >
    | undefined;
  value?:
    | PropsValue<{
        label: string;
        value: string;
      }>
    | undefined;
  onChange: (
    newValue: SingleValue<{ label: string; value: string }>,
    actionMeta: ActionMeta<{ label: string; value: string }>,
  ) => void;
}

const StyledSelect: FC<SelectProperties> = ({
  label,
  name,
  placeholder,
  onChange,
  options,
  ref,
  value,
}) => {
  return (
    <div className="mb-4">
      <p className="pb-2">{label}</p>
      <Select
        key={name}
        ref={ref}
        id={name}
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        className="styled-select-container"
        classNamePrefix="styled-select"
        placeholder={placeholder}
      />
    </div>
  );
};

export default StyledSelect;
