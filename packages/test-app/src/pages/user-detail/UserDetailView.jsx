// Libs
import React from "react";

// Graph
import { USER_ROLE_LABEL } from "../../graph";

// Components
import { IconButton } from "@rmwc/icon-button";
import { List, SimpleListItem } from "@rmwc/list";
import {
    Slider,
    SliderHeader,
    SliderTitle,
    SliderSubtitle,
    SliderContent,
    SliderActions,
} from "../../components/slider";

export const UserDetailView = ({ user, goToEdit }) => {
    return (
        <>
            <Slider className="c-slider--2x">
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
                        <SimpleListItem text="Email" secondaryText={user.email} ripple={false} />
                        <SimpleListItem text="Role" secondaryText={USER_ROLE_LABEL[user.role]} ripple={false} />
                    </List>
                </SliderContent>
            </Slider>
        </>
    );
};
