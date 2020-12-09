// Libs
import React, { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";

// Graph
import { GET_TEAM } from "../../graph";

// Components
import { QueryLoader } from "../../components/query-loader";
import { TeamDetailView } from "./TeamDetailView";
import { TeamDetailEdit } from "./TeamDetailEdit";

export function TeamDetail({ refetch: refetchProp }) {
    const { teamId } = useParams();
    const history = useHistory();
    const { path, url } = useRouteMatch();

    const goToEdit = useCallback(() => history.push(`${url}/edit`), [url, history]);
    const goToView = useCallback(() => history.push(`${url}`), [url, history]);

    const { data, refetch, ...state } = useQuery(GET_TEAM, {
        variables: { teamId },
    });

    const team = data?.teams[0];

    return (
        <QueryLoader {...state}>
            <Switch>
                <Route path={`${path}/edit`}>
                    <TeamDetailEdit
                        team={team}
                        goToView={goToView}
                        refetch={() => {
                            refetchProp();
                            refetch();
                        }}
                    />
                </Route>
                <Route>
                    <TeamDetailView team={team} goToEdit={goToEdit} />
                </Route>
            </Switch>
        </QueryLoader>
    );
}
