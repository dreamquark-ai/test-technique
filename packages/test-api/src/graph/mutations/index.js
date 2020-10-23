import { gql } from "apollo-server";

export const mutations = gql`
    type Mutation {
        # User
        addUser(email: String!, firstName: String!, lastName: String!, role: UserRoleEnum!): UserResponse!
        updateUser(id: ID!, email: String!, firstName: String!, lastName: String!, role: UserRoleEnum!): UserResponse!

        #Team
        addTeam(name: String!, leaderId: ID!, memberIds: [ID!]!, internIds: [ID!]!): TeamResponse!
        updateTeam(teamId: ID!, name: String!, leaderId: ID!, memberIds: [ID!]!, internIds: [ID!]!): TeamResponse!
        deleteTeam(teamId: ID!): TeamResponse!
    }
`;
