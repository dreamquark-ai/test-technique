import React from "react";

import { IconButton } from "@rmwc/icon-button";
import { TextField } from "@rmwc/textfield";
import { useFormik } from "formik";

import {
    Slider,
    SliderHeader,
    SliderTitle,
    SliderSubtitle,
    SliderContent,
    SliderActions,
} from "../../components/Slider";

export const UserDetailEdit = ({ user, goToView }) => {
    const formik = useFormik({
        initialValues: user,
        onSubmit: (value) => console.dir(value),
    });

    return (
        <>
            <Slider>
                <SliderHeader>
                    <div>
                        <SliderTitle>User edition</SliderTitle>

                        <SliderSubtitle>{`${user.firstName} ${user.lastName}`}</SliderSubtitle>
                    </div>
                    <SliderActions>
                        <IconButton icon="undo" label="Cancel" onClick={goToView} />
                        <IconButton icon="save" label="Save User" onClick={goToView} />
                    </SliderActions>
                </SliderHeader>

                <SliderContent>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            id="firstName"
                            name="firstName"
                            label="First name"
                            type="text"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            type="text"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            id="email"
                            name="email"
                            label="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </form>
                </SliderContent>
            </Slider>
        </>
    );
};
