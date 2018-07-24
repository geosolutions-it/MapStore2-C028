const expect = require('expect');
const { testEpic } = require('../../../MapStore2/web/client/epics/__tests__/epicTestUtils');

const {MAP_CONFIG_LOADED} = require('../../../MapStore2/web/client/actions/config');
const { SET_CONTROL_PROPERTY } = require('../../../MapStore2/web/client/actions/controls');

const {RESET, applyChanges} = require('../../actions/accidents');
const { CHANGE_LAYER_PARAMS } = require('../../../MapStore2/web/client/actions/layers');

const { accidentsInitialSetup, updateRoadAccidentLayers } = require('../accidents');

describe('accidents epic', () => {
    it('accidentsInitialSetup', (done) => {
        testEpic(accidentsInitialSetup, 3, { type: MAP_CONFIG_LOADED, forceInitAccidents: true }, actions => {
            expect(actions.length).toBe(3);
            expect(actions[0].type).toBe(RESET);
            expect(actions[1].type).toBe(SET_CONTROL_PROPERTY);
            expect(actions[2].type).toBe(SET_CONTROL_PROPERTY);
            done();

        }, {});
    });
    it('updateRoadAccidentLayers', (done) => {
        const STATE = {
            accidents: {
                viewParamsLayers: [{
                    predicate: {
                        name: "viewparams"
                    }
                }],
                cqlLayers: [{
                    predicate: {
                        name: "cql"
                    }
                }],
                values: {
                    dow: [null, true],
                    type: [null, true],
                    period: {
                        fromdate: new Date(1492, 9, 12),
                        todate: new Date(1789, 6, 14
                    )}
                }
            },
            layers: {
                flat: [{
                    id: 1,
                    name: "viewparams"
                }, {
                    id: 2,
                    name: "cql"
                }]
            }
        };
        testEpic(updateRoadAccidentLayers, 2, applyChanges(), actions => {
            expect(actions.length).toBe(2);
            expect(actions[0].type).toBe(CHANGE_LAYER_PARAMS);
            expect(actions[1].type).toBe(CHANGE_LAYER_PARAMS);
            const vpAction = actions[0].layer === 1 ? actions[0] : actions[1];
            expect(vpAction.params.VIEWPARAMS).toBe("dow_p:1;tpinc_p:1;fromdate_p:1492-10-12;todate_p:1789-07-14");
            const cqlAction = actions[0].layer === 2 ? actions[0] : actions[1];
            expect(cqlAction.params.CQL_FILTER).toBe("( DTINCID <= '1789-07-14' AND DTINCID >= '1492-10-12' ) AND (DOW='1') AND (TPINCID='1')");
            done();
        }, STATE);
    });
});
