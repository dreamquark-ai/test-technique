import React from "react";
import PropTypes from "prop-types";

import {CircularProgress} from "@rmwc/circular-progress"

export const QueryLoader = ({ loading, error, children }) => {
    if (loading) {
        return <p><CircularProgress/> Loading...</p>;
    }
    if (error) {
        return <p>An error occured: {error}</p>;
    }

    return children();
};

QueryLoader.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};
