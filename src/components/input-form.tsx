import React, { FunctionComponent, SyntheticEvent } from 'react';
import PropTypes from 'prop-types';

const initialFormData = {
  'username': ''
};

interface InputFormProps {
  submitHandler: (event: SyntheticEvent, formData: typeof initialFormData) => void
};

const InputForm: FunctionComponent<InputFormProps> = ({ submitHandler }) => {
  const [formData, setFormData] = React.useState(initialFormData);

  const handleChange = (event: SyntheticEvent) => {
    const { name, value } = event.target as HTMLButtonElement;
    setFormData({
      ...formData,

      // Trimming any whitespace
      [name]: value.trim()
    });
  };

  return (
    <form onSubmit={(event) => submitHandler(event, formData)}>
      <input
        type="text"
        name="username"
        onChange={handleChange}
      />
      <button type="submit">Find</button>
    </form>
  );
};

InputForm.propTypes = {
  submitHandler: PropTypes.func.isRequired
};

export default InputForm;
