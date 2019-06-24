import React from "react";

const FormField = ({ formdata, id, handleChange, validation }) => {
  const showError = () => {
    let errorMessage = (
      <div className="error_label">
        {validation && !validation.valid ? validation.message : null}
      </div>
    );
    return errorMessage;
  };
  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case "input":
        formTemplate = (
          <div>
            {formdata.showLabel ? (
              <label className="label_inputs">{formdata.config.label}</label>
            ) : null}
            <input
              className={`${
                validation && validation.message.length > 0
                  ? "error"
                  : "success"
              }`}
              onChange={handleChange}
              {...formdata.config}
              value={formdata.value}
            />
            {showError()}
          </div>
        );
        break;

      case "select":
        formTemplate = (
          <div>
            {formdata.showLabel ? (
              <label className="label_inputs">{formdata.config.label}</label>
            ) : null}
            <select onChange={handleChange} value={formdata.value}>
              <option>Select One</option>
              {formdata.config.options.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;

      default:
        formTemplate = null;
    }

    return formTemplate;
  };
  return <div>{renderTemplate()}</div>;
};

export default FormField;
