// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useField } from "formik";

// Components
import { TextField } from "@rmwc/textfield";
import { Select } from "@rmwc/select";

export function Field({ className, label, options, ...props }) {
    const [field, meta] = useField(props);

    const fieldClassName = classnames("c-field", className);

    const fieldProps = {
        className: fieldClassName,
        label,
        ...field,
        ...props,
        invalid: meta.touched && meta.error,
        helpText: meta.touched && meta.error,
    };

    if (options) {
        const handleChange = (event) => {
            event.target.name = field.name;
            field.onChange(event);
        };
        return <Select options={options} {...fieldProps} onChange={handleChange} />;
    }

    return <TextField {...fieldProps} />;
}

Field.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Label for field
     */
    label: PropTypes.string,
    /**
     * Options for select field
     */
    options: PropTypes.any,
};
