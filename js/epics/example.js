const Rx = require('rxjs');
const {EXAMPLE_COMPLEX, example} = require('../actions/example');
const axios = require('../../MapStore2/web/client/libs/ajax');

module.exports = action$ => action$.ofType(EXAMPLE_COMPLEX)
    .debounceTime(250)
    .switchMap((action) => {
        return Rx.Observable.of(axios('https://api.ip2country.info/ip?' + action.ip)
            .then((response) => response.data.countryName))
            .mergeAll()
            .map((country) => Rx.Observable.from([example(country), example(country)])
        ).mergeAll().catch((e) => Rx.Observable.of(example('Error: ' + e.message)));
    });
