import React, { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";

import { GET_USER } from "../../graph";

import { QueryLoader } from "../../components/QueryLoader";
import { UserDetailView } from "./UserDetailView";
import { UserDetailEdit } from "./UserDetailEdit";

export const UserDetail = ({ match }) => {
    const {
        params: { userId },
        path,
    } = match;

    const history = useHistory();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const goToEdit = useCallback(() => history.push(`/users/${userId}?edition=true`), [userId]);
    const goToView = useCallback(() => history.push(`/users/${userId}`), [userId]);

    const { data, ...state } = useQuery(GET_USER, {
        variables: { userId },
    });

    const user = data?.users[0];

    return (
        <QueryLoader {...state}>
            {() =>
                query.get("edition") ? (
                    <UserDetailEdit user={user} goToView={goToView} />
                ) : (
                    <UserDetailView user={user} goToEdit={goToEdit} />
                )
            }
        </QueryLoader>
    );
};
