import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectUsersDomain = (state: any) => {
    const s = fromJS(state);
    return s.get('users');
};

const selectUserPools = () =>
    createSelector(
        selectUsersDomain,
        substate => substate.get('userPools')
    );
const selectUsers = () =>
    createSelector(
        selectUsersDomain,
        substate => substate.get('users')
    );
export { selectUserPools, selectUsers };
