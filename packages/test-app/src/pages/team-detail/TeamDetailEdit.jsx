// Libs
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useFormik, FormikProvider } from "formik";

// Graph
import { GET_USERS, UPDATE_TEAM, USER_ROLE } from "../../graph";

// Components
import { IconButton } from "@rmwc/icon-button";
import { Snackbar, SnackbarAction } from "@rmwc/snackbar";
import { Tooltip } from "@rmwc/tooltip";
import { Field, Form } from "../../components/form";
import { Slider, SliderHeader, SliderTitle, SliderContent, SliderActions } from "../../components/slider";
import { QueryLoader } from "../../components/query-loader";

function formatInitialValues({ leader, members, interns, ...otherValues }) {
    return {
        ...otherValues,
        leaderId: leader.id,
        memberIds: members.map((m) => m.id),
        internIds: interns.map((i) => i.id),
    };
}

export function TeamDetailEdit({ team, goToView, refetch }) {
    const [error, setError] = useState(undefined);
    const [success, setSuccess] = useState(undefined);

    const formik = useFormik({
        initialValues: formatInitialValues(team),
        onSubmit: ({ id, ...value }) => updateTeam({ variables: { teamId: id, ...value } }),
    });

    const [updateTeam] = useMutation(UPDATE_TEAM, {
        onCompleted: (data) => {
            if (data?.updateTeam.error) {
                setError(data?.updateTeam.error);
            } else {
                setSuccess("Successfully edited");
                refetch();
                goToView();
            }
            formik.setSubmitting(false);
        },
        onError: () => {
            setError("An error ocurred during save");
            formik.setSubmitting(false);
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

    return (
        <>
            <Slider className="c-slider--2x">
                <SliderHeader>
                    <SliderTitle>Edit Team</SliderTitle>
                    <SliderActions>
                        <Tooltip content="Cancel" align="bottom">
                            <IconButton icon="undo" label="Cancel" onClick={goToView} />
                        </Tooltip>
                        <Tooltip content="Save" align="bottom">
                            <IconButton icon="save" label="Save User" onClick={formik.handleSubmit} />
                        </Tooltip>
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
