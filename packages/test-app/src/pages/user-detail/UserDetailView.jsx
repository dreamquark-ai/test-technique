import React from "react";

import { IconButton } from "@rmwc/icon-button";
import { List, SimpleListItem } from "@rmwc/list";

import {
    Slider,
    SliderHeader,
    SliderTitle,
    SliderSubtitle,
    SliderContent,
    SliderActions,
} from "../../components/Slider";

export const UserDetailView = ({ user, goToEdit }) => {
    return (
        <>
            <Slider>
                <SliderHeader>
                    <div>
                        <SliderTitle>User detail</SliderTitle>

                        <SliderSubtitle>{`${user.firstName} ${user.lastName}`}</SliderSubtitle>
                    </div>
                    <SliderActions>
                        <IconButton icon="edit" label="Edit User" onClick={goToEdit} />
                    </SliderActions>
                </SliderHeader>

                <SliderContent>
                    <List twoLine nonInteractive>
                        <SimpleListItem text="First name" secondaryText={user.firstName} ripple={false} />
                        <SimpleListItem text="Last name" secondaryText={user.lastName} ripple={false} />
                        <SimpleListItem text="email" secondaryText={user.email} ripple={false} />
                    </List>
                </SliderContent>
            </Slider>
        </>
    );
};
