import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query users {
        users {
            id
            email
            firstName
            lastName
            role
            teams {
                id
                name
            }
        }
    }
`;

export const GET_USER = gql`
    query users($userId: ID!) {
        users(filter: { userId: $userId }) {
            id
            email
            firstName
            lastName
            role
            teams {
                id
                name
            }
        }
    }
`