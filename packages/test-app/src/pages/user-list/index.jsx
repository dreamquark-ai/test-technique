import React from "react";
import { useQuery } from "@apollo/client";

import { GET_USERS } from "../../graph";

import { IconButton } from "@rmwc/icon-button";
import { List, SimpleListItem } from "@rmwc/list";
import { Route, useHistory } from "react-router-dom";

import { Slider, SliderHeader, SliderTitle, SliderContent, SliderActions } from "../../components/Slider";
import { QueryLoader } from "../../components/QueryLoader";
import { UserDetail } from "../user-detail";

export const UserList = () => {
    const { data, ...state } = useQuery(GET_USERS);
    const history = useHistory();

    return (
        <>
            <Slider>
                <SliderHeader>
                    <SliderTitle>User list</SliderTitle>
                    <SliderActions>
                        <IconButton icon="add" label="New User" />
                    </SliderActions>
                </SliderHeader>
                <SliderContent>
                    <QueryLoader {...state}>
                        {() => (
                            <List twoLine>
                                {data.users.map((user) => (
                                    <SimpleListItem
                                        key={user.id}
                                        onClick={() => history.push(`/users/${user.id}`)}
                                        graphic="person"
                                        text={`${user.firstName} ${user.lastName}`}
                                        secondaryText={user.email}
                                        metaIcon="keyboard_arrow_right"
                                    />
                                ))}
                            </List>
                        )}
                    </QueryLoader>
                </SliderContent>
            </Slider>
            <Route path="/users/:userId" component={UserDetail} />
        </>
    );
};
