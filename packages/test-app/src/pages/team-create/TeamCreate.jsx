// Libs
import React, { useState } from "react";
import { useFormik, FormikProvider } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory, useRouteMatch } from "react-router-dom";

// Graph
import { ADD_TEAM, GET_USERS, USER_ROLE } from "../../graph";

// Components
import { IconButton } from "@rmwc/icon-button";
import { CircularProgress } from "@rmwc/circular-progress";
import { Snackbar, SnackbarAction } from "@rmwc/snackbar";
import { Tooltip } from "@rmwc/tooltip";
import { Field, Form } from "../../components/form";
import { Slider, SliderHeader, SliderTitle, SliderContent, SliderActions } from "../../components/slider";
import { QueryLoader } from "../../components/query-loader";

const initialValues = {
    name: "",
    leaderId: "",
    memberIds: [],
    internIds: [],
};

export function TeamCreate({ refetch }) {
    const [error, setError] = useState(undefined);
    const [success, setSuccess] = useState(undefined);
    const history = useHistory();
    const { url } = useRouteMatch();

    const formik = useFormik({
        initialValues,
        onSubmit: (value) => {
            addTeam({
                variables: value,
            });
        },
    });

    const { data, ...state } = useQuery(GET_USERS);

    const filter = (data, role) =>
        data?.users
            .filter((user) => user.role === role)
            .map((user) => ({ label: `${user.firstName} ${user.lastName}`, value: user.id }));
    const leaderOptions = filter(data, USER_ROLE.SQUAD_LEADER);
    const memberOptions = filter(data, USER_ROLE.SQUAD_MEMBER);
    const interOptions = filter(data, USER_ROLE.INTERN);

    const [addTeam] = useMutation(ADD_TEAM, {
        onCompleted: (data) => {
            if (data?.addTeam.error) {
                setError(data?.addTeam.error);
            } else {
                refetch();
                setSuccess("Successfully created");
                formik.resetForm({
                    values: initialValues,
                });
                history.push(`${url}/../${data.addTeam.team.id}`);
            }
            formik.setSubmitting(false);
        },
        onError: () => {
            setError("An error ocurred during save");
            formik.setSubmitting(false);
        },
    });

    return (
        <>
            <Slider className="c-slider--2x">
                <SliderHeader>
                    <SliderTitle>New Team</SliderTitle>
                    <SliderActions>
                        <SliderActions>
                            <Tooltip content="Save Team" align="bottom">
                                <IconButton
                                    disabled={formik.isSubmitting}
                                    icon={formik.isSubmitting ? <CircularProgress /> : "save"}
                                    label="Save Team"
                                    onClick={formik.handleSubmit}
                                />
                            </Tooltip>
                        </SliderActions>
                    </SliderActions>
                </SliderHeader>
                <SliderContent>
                    <QueryLoader {...state}>
                        {() => (
                            <FormikProvider value={formik}>
                                <Form>
                                    <Field name="name" label="Team name" type="text" />
                                    <Field name="leaderId" label="Leader" type="text" options={leaderOptions} />
                                    <Field
                                        multiple
                                        name="memberIds"
                                        label="Members"
                                        type="text"
                                        options={memberOptions}
                                    />
                                    <Field
                                        multiple
                                        name="internIds"
                                        label="Interns"
                                        type="text"
                                        options={interOptions}
                                    />
                                </Form>
                            </FormikProvider>
                        )}
                    </QueryLoader>
                </SliderContent>
            </Slider>

            <Snackbar
                open={Boolean(error) || Boolean(success)}
                onClose={() => (error ? setError(undefined) : setSuccess(undefined))}
                message={error ?? success}
                dismissesOnAction
                icon={error ? "error" : "check"}
                action={<SnackbarAction label="Dismiss" />}
            />
        </>
    );
}
