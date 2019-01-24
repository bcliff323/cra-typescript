import { LOCATION_CHANGE } from 'react-router-redux';
import { fromJS } from 'immutable';

// Initial routing state
const routeInitialState = fromJS({
    location: null
});

const routeReducer = (state = routeInitialState, action: any) => {
    switch (action.type) {
        /* istanbul ignore next */
        case LOCATION_CHANGE:
            return state.merge({
                location: action.payload
            });
        default:
            return state;
    }
};
export default routeReducer;
