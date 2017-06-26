const {UPDATE_GIORNI, UPDATE_FROM} = require('../actions/infortuni');
const assign = require('object-assign');

module.exports = (state = {
    giorni: [true, true, true, true, true, true, true],
    tipi: [true, true, true],
    from: new Date(),
    to: new Date()
}, action) => {
    switch (action.type) {
        case UPDATE_GIORNI:
            const giorni = [...state.giorni];
            giorni[action.giorno] = action.value;
            return assign({}, state, {
                giorni
            });

        case UPDATE_FROM:
            return assign({}, state, {
                from: action.date
            });
        default:
            return state;
    }
};
