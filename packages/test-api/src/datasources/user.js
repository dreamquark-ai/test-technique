// Model
import { userModel } from "../models";

export function userDatasource(dataLoaders) {
    return {
        initialize() {},

        /**
         * Find all users
         * @param {object} filter Filter object.
         */
        findUsers(filter) {
            return userModel.find(filter).lean();
        },

        /**
         * Find a User by identifier.
         * @param {string} userId User own identifier.
         */
        findUserById(userId) {
            return dataLoaders.user.load(userId);
        },

        /**
         * Find a list of Users by identifiers.
         * @param {Array<string>} userIds List of User identifiers.
         */
        findUsersByIds(userIds) {
            return Promise.all(userIds.map((userId) => dataLoaders.user.load(userId)));
        },

        /**
         * Add a user.
         * @param {string} email User own email.
         * @param {*} firstName User own first name.
         * @param {*} lastName User own last name.
         * @param {*} role User own role.
         */
        addUser(email, firstName, lastName, role) {
            return userModel.create({ email, firstName, lastName, role }).then((user) => user.toObject());
        },
    };
}
