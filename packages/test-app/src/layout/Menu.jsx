import React from "react";

import { Slider, SliderHeader, SliderTitle, SliderContent } from "../components/Slider";
import { List, ListItem } from "@rmwc/list";
import { Icon } from "@rmwc/icon";
import { NavLink } from "react-router-dom";

export const Menu = () => (
    <Slider className="menu">
        <SliderHeader>
            <SliderTitle>Menu</SliderTitle>
        </SliderHeader>
        <SliderContent>
            <List>
                <ListItem>
                    <NavLink to="/users">
                        <Icon icon="person_search" /> Users
                    </NavLink>
                </ListItem>
                <ListItem>
                    <NavLink to="/teams">
                        <Icon icon="groups" /> Teams
                    </NavLink>
                </ListItem>
            </List>
        </SliderContent>
    </Slider>
);
