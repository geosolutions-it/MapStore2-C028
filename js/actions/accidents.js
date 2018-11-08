const ON_CHANGE = "ACCIDENTS:ON_CHANGE";
const APPLY_CHANGES = "ACCIDENTS:APPLY_CHANGES";
const RESET = "ACCIDENTS:RESET";
const STANDARD_VALUES = {
    dow: [
        null,
        true,
        true,
        true,
        true,
        true,
        true,
        true
    ],
    type: [
        null,
        true,
        true,
        true
    ]
};
module.exports = {
    STANDARD_VALUES,
    APPLY_CHANGES,
    /**
     * Apply the changes to the map
     */
    applyChanges: () => ({ type: APPLY_CHANGES }),
    RESET,
    /**
     * Reset to initial state
     */
    reset: (values = STANDARD_VALUES) => ({type: RESET, values: {
        period: {
            fromdate: new Date(new Date().getFullYear(), 0, 1),
            todate: new Date(new Date().getFullYear(), 11, 31)
        },
        ...values
    }}),
    ON_CHANGE,
    /**
     * Apply one change to the form values
     */
    onChange: (name, value) => ({
        type: ON_CHANGE,
        name,
        value
    })
};
