const {EXAMPLE, CHANGE_IP} = require('../actions/example');

const assign = require('object-assign');

module.exports = (state = {calls: 0, message: ''}, action) => {
    switch (action.type) {
        case EXAMPLE:
            return assign({}, state, {
                calls: state.calls + 1,
                message: action.payload
            });
        case CHANGE_IP:
            return assign({}, state, {
                ip: action.ip
            });
        default:
            return state;
    }
};
