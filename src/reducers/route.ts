import { LOCATION_CHANGE } from 'connected-react-router';
import { fromJS } from 'immutable';

// Initial routing state
const routeInitialState = fromJS({
    location: null
});

const routeReducer = (state = routeInitialState, action: any) => {
    switch (action.type) {
        /* istanbul ignore next */
        case LOCATION_CHANGE:
            console.log(action);
        default:
            return state;
    }
};
export default routeReducer;
