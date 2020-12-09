// Libs
import React from "react";
import { useHistory } from "react-router-dom";

// Components
import { IconButton } from "@rmwc/icon-button";
import { List, SimpleListItem, ListGroup, ListGroupSubheader } from "@rmwc/list";
import { Tooltip } from "@rmwc/tooltip";
import { Typography } from "@rmwc/typography";
import { Slider, SliderHeader, SliderTitle, SliderContent, SliderActions } from "../../components/slider";

function UserLine({ user }) {
    const history = useHistory();

    return (
        <SimpleListItem
            graphic="person"
            text={`${user.firstName} ${user.lastName}`}
            secondaryText={`${user.email}`}
            metaIcon="launch"
            onClick={() => history.push(`/users/${user.id}`)}
        />
    );
}

export function TeamDetailView({ team, goToEdit }) {
    return (
        <>
            <Slider className="c-slider--2x">
                <SliderHeader>
                    <div>
                        <SliderTitle>Team detail</SliderTitle>
                    </div>
                    <SliderActions>
                        <Tooltip content="Edit" align="bottom">
                            <IconButton icon="edit" label="Edit Team" onClick={goToEdit} />
                        </Tooltip>
                    </SliderActions>
                </SliderHeader>

                <SliderContent padding>
                    <Typography use="subtitle1">Information</Typography>
                    <List twoLine nonInteractive>
                        <SimpleListItem text="Team" secondaryText={team.name} ripple={false} />
                    </List>

                    <Typography use="subtitle1">Persons</Typography>
                    <List twoLine>
                        <ListGroup>
                            <ListGroupSubheader>Leader</ListGroupSubheader>
                            <UserLine user={team.leader} />
                        </ListGroup>
                        <ListGroup>
                            <ListGroupSubheader>Members</ListGroupSubheader>
                            {team.members.map((member) => (
                                <UserLine user={member} />
                            ))}
                        </ListGroup>
                        <ListGroup>
                            <ListGroupSubheader>Interns</ListGroupSubheader>
                            {team.interns.map((member) => (
                                <UserLine user={member} />
                            ))}
                        </ListGroup>
                    </List>
                </SliderContent>
            </Slider>
        </>
    );
}
