function responsify(promise, success) {
    try {
        return promise()
            .then(success)
            .catch((err) => {
                console.error(err);
                return { error: err.message };
            });
    } catch (err) {
        console.error(err);
        return Promise.resolve({ error: err.message });
    }
}

export const mutationResolvers = {
    addUser(_parent, { email, firstName, lastName, role }, { dataSources }) {
        return responsify(
            () => dataSources.users.addUser(email, firstName, lastName, role),
            (user) => ({ user })
        );
    },

    addTeam(_parent, { name, leaderId, memberIds, internIds }, { dataSources }) {
        return responsify(
            () => dataSources.teams.upsertTeam(undefined, name, leaderId, memberIds, internIds),
            (team) => ({ team })
        );
    },
    updateTeam(_parent, { teamId, name, leaderId, memberIds, internIds }, { dataSources }) {
        return responsify(
            () => dataSources.teams.upsertTeam(teamId, name, leaderId, memberIds, internIds),
            (team) => ({ team })
        );
    },
    deleteTeam(_parent, { teamId }, { dataSources }) {
        return responsify(
            () => dataSources.teams.deleteTeam(teamId),
            (team) => ({ team })
        );
    },
};
