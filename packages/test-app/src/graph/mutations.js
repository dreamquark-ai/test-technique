import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
    mutation updateUser($userId: ID!, $email: String!, $firstName: String!, $lastName: String!, $role: UserRoleEnum!) {
        updateUser(userId: $userId, email: $email, firstName: $firstName, lastName: $lastName, role: $role) {
            error
            user {
                id
                email
                firstName
                lastName
                role
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($email: String!, $firstName: String!, $lastName: String!, $role: UserRoleEnum!) {
        addUser(email: $email, firstName: $firstName, lastName: $lastName, role: $role) {
            error
            user {
                id
                email
            }
        }
    }
`;

export const UPDATE_TEAM = gql`
    mutation updateTeam($teamId: ID!, $name: String!, $leaderId: ID!, $memberIds: [ID!]!, $internIds: [ID!]!) {
        updateTeam(teamId: $teamId, name: $name, leaderId: $leaderId, memberIds: $memberIds, internIds: $internIds) {
            error
            team {
                id
                name
            }
        }
    }
`;

export const ADD_TEAM = gql`
    mutation addTeam($name: String!, $leaderId: ID!, $memberIds: [ID!]!, $internIds: [ID!]!) {
        addTeam(name: $name, leaderId: $leaderId, memberIds: $memberIds, internIds: $internIds) {
            error
            team {
                id
                name
            }
        }
    }
`;
