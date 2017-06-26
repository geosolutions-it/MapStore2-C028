const UPDATE_GIORNI = 'UPDATE_GIORNI';
const UPDATE_TIPI = 'UPDATE_TIPI';
const UPDATE_FROM = 'UPDATE_FROM';
const UPDATE_TO = 'UPDATE_TO';

const {changeLayerProperties} = require('../../MapStore2/web/client/actions/layers');

const updateGiorni = (giorno, value) => {
    return {
        type: UPDATE_GIORNI,
        giorno,
        value
    };
};

const updateFrom = (date) => {
    return {
        type: UPDATE_FROM,
        date
    };
};

const filterInfortuni = () => {
    return (dispatch, getState) => {
        const filter = getState().infortuni.giorni[0];
        dispatch(changeLayerProperties('infortuni', {
            cql_filter: filter
        }));
    };
};

module.exports = {
    UPDATE_GIORNI, UPDATE_TIPI, UPDATE_FROM, UPDATE_TO, updateGiorni, updateFrom, filterInfortuni
};
