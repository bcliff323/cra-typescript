export const api = {
    getUserPools() {
        return fetch('http://localhost:3001/api/user-pools').then(res => {
            try {
                return res.json().then(json => json);
            } catch (err) {
                return err;
            }
        });
    },

    getUsersInPool(poolId) {
        return fetch(`http://localhost:3001/api/users/${poolId}`).then(res => {
            try {
                return res.json().then(json => json);
            } catch (err) {
                return err;
            }
        });
    }
};
