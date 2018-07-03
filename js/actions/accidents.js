const ON_CHANGE = "ACCIDENTS:ON_CHANGE";
const APPLY_CHANGES = "ACCIDENTS:APPLY_CHANGES";

module.exports = {
    APPLY_CHANGES,
    onApplyChanges: () => ({ type: APPLY_CHANGES }),
    ON_CHANGE,
    onChange: (name, value) => ({
        type: ON_CHANGE,
        name,
        value
    })
};
