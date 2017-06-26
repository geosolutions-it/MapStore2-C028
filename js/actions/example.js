const EXAMPLE = 'EXAMPLE';
const EXAMPLE_ASYNC = 'EXAMPLE_ASYNC';
const EXAMPLE_FLOW = 'EXAMPLE_FLOW';

const example = (arg) => {
    return {
        type: EXAMPLE,
        payload: arg
    };
};

const exampleAsync = (arg) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(example(arg));
        }, 1000);
    };
};

const exampleFlow = (arg) => {
    return {
        type: EXAMPLE_FLOW,
        ip: arg
    };
};

module.exports = {
    EXAMPLE, EXAMPLE_ASYNC, EXAMPLE_FLOW, example, exampleAsync, exampleFlow
};
