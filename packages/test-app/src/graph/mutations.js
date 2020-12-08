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
