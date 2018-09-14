const ON_CHANGE = "SERVICES:ON_CHANGE";
const APPLY_CHANGES = "SERVICES:APPLY_CHANGES";
const RESET = "SERVICES:RESET";
const SERVICES_STANDARD_VALUES = {       
    serviceTypeList: 
    {
        "06": true,
        "07": true,
        "04": true,
        "11": true,
        "01": true,
        "09": true,
        "14": true,
        "02": true,
        "05": true,
        "13": true,
        "03": true,
        "10": true
    }        
};
module.exports = {
    SERVICES_STANDARD_VALUES,
    APPLY_CHANGES,
    /**
     * Apply the changes to the map
     */
    applyChanges: () => ({ type: APPLY_CHANGES }),
    RESET,
    /**
     * Reset to initial state
     */
    reset: (values = SERVICES_STANDARD_VALUES) => ({type: RESET, values: {       
        ...values
    }}),
    ON_CHANGE,
    /**
     * Apply one change to the form values
     */ 
    onChange: (name, value) => ({
        type: ON_CHANGE,
        name: name,
        value: value
    })
};
