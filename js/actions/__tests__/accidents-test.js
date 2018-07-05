
const expect = require('expect');
const {
    APPLY_CHANGES,
    onApplyChanges,
    ON_CHANGE,
    onChange,
    RESET,
    reset
} = require('../accidents');

describe('accidents actions', () => {
    it('onApplyChanges', () => {
        const retval = onApplyChanges();
        expect(retval).toExist();
        expect(retval.type).toBe(APPLY_CHANGES);
    });
    it('onChange', () => {
        const retval = onChange("name", "value");
        expect(retval).toExist();
        expect(retval.type).toBe(ON_CHANGE);
        expect(retval.name).toBe("name");
        expect(retval.value).toBe("value");
    });
    it('reset', () => {
        const retval = reset();
        expect(retval).toExist();
        expect(retval.type).toBe(RESET);
        expect(retval.values.period).toExist();
        expect(retval.values.period.fromdate).toExist();
        expect(retval.values.period.todate).toExist();

        // all days of week by default
        expect(retval.values.dow).toExist();
        expect(retval.values.dow[0]).toBeFalsy();
        expect(retval.values.dow[1]).toBeTruthy();
        expect(retval.values.dow[2]).toBeTruthy();
        expect(retval.values.dow[3]).toBeTruthy();
        expect(retval.values.dow[4]).toBeTruthy();
        expect(retval.values.dow[5]).toBeTruthy();
        expect(retval.values.dow[6]).toBeTruthy();
        expect(retval.values.dow[7]).toBeTruthy();
        expect(retval.values.dow[8]).toBeFalsy();
        expect(retval.values.dow).toExist();

        // and all types by default
        expect(retval.values.type[0]).toBeFalsy();
        expect(retval.values.type[1]).toBeTruthy();
        expect(retval.values.type[2]).toBeTruthy();
        expect(retval.values.type[3]).toBeTruthy();
        expect(retval.values.type[4]).toBeFalsy();

    });
});
