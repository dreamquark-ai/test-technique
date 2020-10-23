export const queryResolvers = {
    users: (_parent, { filter }, { dataSources }) => dataSources.users.findUsers(filter),

    teams: (_parent, _args, { dataSources }) => dataSources.teams.findTeams(),
};
