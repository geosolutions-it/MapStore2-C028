const {EXAMPLE} = require('../actions/example');

module.exports = (state = {count: 0, message: 'started'}, action) => {
    switch (action.type) {
        case EXAMPLE:
            return {
                count: state.count + 1,
                message: action.payload
            };
        default:
            return state;
    }
};
