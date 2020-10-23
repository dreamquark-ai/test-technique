/* eslint-disable no-underscore-dangle */
// Libs
import { uniq } from "lodash";
import { Types } from "mongoose";

// Model
import { teamModel, USER_ROLE_ENUM } from "../models";

export function teamDatasource(dataLoaders) {
    return {
        initialize() {},

        /**
         * Find all teams.
         */
        findTeams() {
            return teamModel.find({}).lean();
        },

        /**
         * Find all teams for a given user.
         * @param {string} userId User own identifier.
         */
        findTeamsByUserId(userId) {
            return teamModel.find({ userIds: new Types.ObjectId(userId) }).lean();
        },

        /**
         * Upsert a team.
         * @param {string} teamId Team own identifier.
         * @param {*} name Team name.
         * @param {*} leaderId Leader own identifier.
         * @param {*} memberIds Members array of identifiers.
         * @param {*} internIds Intern array of identifiers.
         */
        upsertTeam(teamId, name, leaderId, memberIds, internIds) {
            return Promise.all([
                teamId && dataLoaders.team.load(teamId),
                this.findTeamsByUserId(leaderId),
                dataLoaders.user.load(leaderId),
                ...memberIds.map((id) => dataLoaders.user.load(id)),
                ...internIds.map((id) => dataLoaders.user.load(id)),
            ])
                .then(([team, otherTeams, ...users]) => {
                    const leader = users.find((usr) => usr._id === leaderId);
                    const members = users.filter((usr) => memberIds.includes(usr._id));
                    const interns = users.filter((usr) => internIds.includes(usr._id));

                    if (teamId && !team) {
                        throw new Error("Unknown team");
                    }
                    if (!leader) {
                        throw new Error("Unknown leader");
                    }
                    if (memberIds.length !== members.length) {
                        throw new Error("Unknown member");
                    }
                    if (internIds.length !== interns.length) {
                        throw new Error("Unknown intern");
                    }
                    if (otherTeams.filter((ot) => ot._id.toString() !== teamId).length > 0) {
                        throw new Error("Leader is already in another team");
                    }
                    if (leader.role !== USER_ROLE_ENUM.SQUAD_LEADER) {
                        throw new Error("Leader is not a Leader");
                    }
                    if (members.some((member) => member.role !== USER_ROLE_ENUM.SQUAD_MEMBER)) {
                        throw new Error("Member is not a Member");
                    }
                    if (interns.some((intern) => intern.role !== USER_ROLE_ENUM.INTERN)) {
                        throw new Error("Intern is not an Intern");
                    }
                    if (members.length > 2) {
                        throw new Error("Maximum 2 members per team");
                    }
                    if (interns.length > 1) {
                        throw new Error("Maximum 1 intern per team");
                    }

                    const userIds = [leaderId, ...memberIds, ...internIds];

                    if (uniq(userIds).length !== userIds.length) {
                        throw new Error("Duplicates in users");
                    }

                    if (teamId) {
                        return teamModel.findByIdAndUpdate({ _id: teamId }, { $set: { name, userIds } }, { new: true });
                    }

                    return teamModel.create({ name, userIds });
                })
                .then((team) => team.toObject());
        },

        /**
         * Delete a Team.
         * @param {string} teamId Team own identifier.
         */
        deleteTeam(teamId) {
            return teamModel.findOneAndDelete({ _id: new Types.ObjectId(teamId) }).then((team) => team.toObject());
        },
    };
}
