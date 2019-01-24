const AWS = require('aws-sdk');
const chalk = require('chalk');
const CLOUDWATCH_ARN = process.env.CLOUDWATCH_ARN;
const utils = require('./utils');

/**
 * Documentation for the CognitoIdentityServiceProvider can be found here:
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html
 *
 * For info about rate limiting:
 * @see https://docs.aws.amazon.com/cognito/latest/developerguide/limits.html
 *
 * @returns {Object} The cognito api service
 */
const cognito = () => {
    let cognitoidentityserviceprovider = null;
    return {
        init(region) {
            cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(
                {
                    apiVersion: '2016-04-18',
                    region: region
                }
            );
        },

        /**
         * Returns configuration information and metadata for the provided user pool.
         *
         * API Reference:
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#describeUserPool-property
         *
         * Service Reference:
         * @see https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_DescribeUserPool.html
         *
         * @param {String} poolId
         * @returns {Promise} Promise object wrapping describeUserPool call
         */
        describeUserPool(poolId) {
            return new Promise((resolve, reject) => {
                if (cognitoidentityserviceprovider == null) {
                    console.error(chalk.red('Cognito was not initialized'));
                    reject({ message: 'Cognito not initialized' });
                }
                const params = {
                    UserPoolId: poolId
                };
                cognitoidentityserviceprovider.describeUserPool(
                    params,
                    function(err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    }
                );
            });
        },

        /**
         * Lists all the user pools in our AWS account.
         *
         * API Reference:
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#listUserPools-property
         *
         * Service Reference:
         * @see https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ListUserPools.html
         *
         * @returns {Promise} Promise wrapping the listUserPools call
         */
        getUserPools() {
            return new Promise((resolve, reject) => {
                if (cognitoidentityserviceprovider == null) {
                    console.error(chalk.red('Cognito was not initialized'));
                    reject({ message: 'Cognito not initialized' });
                }
                const params = {
                    MaxResults: 20
                };
                cognitoidentityserviceprovider.listUserPools(params, function(
                    err,
                    data
                ) {
                    if (err) {
                        reject(err);
                    } else {
                        if (data.UserPools.length < 1) {
                            reject({ message: 'No pools available' });
                        }
                        resolve(
                            data.UserPools.map(x => ({
                                id: x.Id,
                                name: x.Name
                            }))
                        );
                    }
                });
            });
        },

        /**
         * Gets user information based on the username and pool id
         *
         * API Reference:
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminGetUser-property
         *
         * Service Reference:
         * @see https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminGetUser.html
         *
         * @param {String} username
         * @param {String} poolId
         * @returns {Promise} Promise wrapping adminGetUser call
         */
        getUser(username, poolId) {
            return new Promise((resolve, reject) => {
                var params = {
                    UserPoolId: poolId,
                    Username: username
                };

                cognitoidentityserviceprovider.adminGetUser(params, function(
                    err,
                    data
                ) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        },

        /**
         * Returns a paginated list of users in a pool.
         *
         * API Reference:
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#listUsers-property
         *
         * Service Reference:
         * @see https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ListUsers.html
         *
         * @param {Strig} poolId
         * @param {Number} limit
         * @param {String} paginationToken
         * @returns {Promise} Promise wrapping the listUsers call
         */
        getUsersForPool(poolId, limit = 60, paginationToken = '') {
            return new Promise((resolve, reject) => {
                if (cognitoidentityserviceprovider == null) {
                    console.error(chalk.red('Cognito was not initialized'));
                    reject({ message: 'Cognito not initialized' });
                }
                var params = {
                    UserPoolId: poolId,
                    Limit: limit
                };

                if (paginationToken.length) {
                    params.PaginationToken = paginationToken;
                }

                cognitoidentityserviceprovider.listUsers(params, function(
                    err,
                    data
                ) {
                    if (err) {
                        reject(err);
                    } else {
                        if (data.Users.length < 1) {
                            reject({ message: 'No users available' });
                        }
                        resolve(data);
                    }
                });
            });
        },

        /**
         * Retrieves users from the user pool, and returns only their emails.
         *
         * API Reference:
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#listUsers-property
         *
         * Service Reference:
         * @see https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ListUsers.html
         *
         * @param {String} poolId
         * @param {Array} attributes
         * @returns {Promise} Promise wrapping the listUsers call
         */
        getUserEmails(poolId, attributes) {
            return new Promise((resolve, reject) => {
                if (cognitoidentityserviceprovider == null) {
                    console.error(chalk.red('Cognito was not initialized'));
                    reject({ message: 'Cognito not initialized' });
                }
                var params = {
                    UserPoolId: poolId,
                    AttributesToGet: attributes
                };
                cognitoidentityserviceprovider.listUsers(params, function(
                    err,
                    data
                ) {
                    if (err) {
                        reject(err);
                    } else {
                        if (data.Users.length < 1) {
                            reject({ message: 'No users available' });
                        }
                        resolve(
                            data.Users.map(users => {
                                return users.Attributes.find(
                                    attr => attr.Name === 'email'
                                ).Value;
                            })
                        );
                    }
                });
            });
        },

        /**
         * Deletes user from specified pool by username
         *
         * API Reference:
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminDeleteUser-property
         *
         * Service Reference:
         * @see https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminDeleteUser.html
         *
         * @param {String} userPoolId
         * @param {String} userName
         * @returns {Promise} Promise wrapping the adminDeleteUser call
         */
        deleteUser(userPoolId, userName) {
            return new Promise((resolve, reject) => {
                if (cognitoidentityserviceprovider == null) {
                    console.error(chalk.red('Cognito was not initialized'));
                    reject({ message: 'Cognito not initialized' });
                }
                var params = {
                    UserPoolId: userPoolId,
                    Username: userName
                };
                cognitoidentityserviceprovider.adminDeleteUser(params, function(
                    err,
                    data
                ) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        },

        /**
         * Creates a user, using first name, last name, email, and email_verified. Optionally
         * sends the user an invitation email.
         *
         * API Reference:
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminCreateUser-property
         *
         * Service Reference:
         * @see https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminCreateUser.html
         *
         * @param {Object} user
         * @param {String} user.name
         * @param {String} user.family_name
         * @param {String} user.email
         * @param {String} user.email_verified
         * @param {String} userPoolId
         * @param {Boolean} sendInviteEmail
         * @returns {Promise} Promise wrapping adminCreateUser call
         */
        createUser(user, userPoolId, sendInviteEmail) {
            const payload = {
                DesiredDeliveryMediums: ['EMAIL'],
                TemporaryPassword: utils.generateRandomPassword(8, 3, 2),
                UserAttributes: Object.keys(user).map(k => ({
                    Name: k,
                    Value: user[k]
                })),
                Username: user['email'],
                UserPoolId: userPoolId
            };

            if (!sendInviteEmail) {
                payload.MessageAction = 'SUPPRESS';
            }

            return new Promise((resolve, reject) => {
                cognitoidentityserviceprovider.adminCreateUser(
                    payload,
                    function(err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    }
                );
            });
        },

        /**
         * Leverages adminCreateUser to send an invitation email to a single user in a user pool.
         *
         * API Reference:
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminCreateUser-property
         *
         * Service Reference:
         * @see https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminCreateUser.html
         *
         * @param {Object} user
         * @param {String} user.name
         * @param {String} user.family_name
         * @param {String} user.email
         * @param {String} user.email_verified
         * @param {String} userPoolId
         * @returns {Promise} Promise wrapping adminCreateUser call
         */
        inviteUser(user, userPoolId) {
            const userAttributes = user.UserAttributes || user.Attributes;
            const payload = {
                DesiredDeliveryMediums: ['EMAIL'],
                TemporaryPassword: utils.generateRandomPassword(8, 3, 2),
                UserAttributes: userAttributes.filter(u => u.Name !== 'sub'),
                Username: userAttributes.find(u => u.Name === 'email').Value,
                UserPoolId: userPoolId,
                MessageAction: 'RESEND'
            };
            return new Promise((resolve, reject) => {
                cognitoidentityserviceprovider.adminCreateUser(
                    payload,
                    function(err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    }
                );
            });
        },

        /**
         * Triggers a password reset email to be sent to the specified user's email address.
         *
         * API Reference:
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminResetUserPassword-property
         *
         * Service Reference:
         * @see https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminResetUserPassword.html
         *
         * @param {String} userPoolId
         * @param {String} email
         * @returns {Promise} Promise wrapping the adminResetUserPassword call
         */
        resetPassword(userPoolId, email) {
            return new Promise((resolve, reject) => {
                if (cognitoidentityserviceprovider == null) {
                    console.error(chalk.red('Cognito was not initialized'));
                    reject({ message: 'Cognito not initialized' });
                }

                const params = {
                    UserPoolId: userPoolId,
                    Username: email
                };

                cognitoidentityserviceprovider.adminResetUserPassword(
                    params,
                    function(err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    }
                );
            });
        }
    };
};
module.exports = cognito();
