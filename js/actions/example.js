const EXAMPLE = 'EXAMPLE';
const EXAMPLE_ASYNC = 'EXAMPLE_ASYNC';
const EXAMPLE_COMPLEX = 'EXAMPLE_COMPLEX';
const CHANGE_IP = 'CHANGE_IP';

const example = (arg) => ({
    type: EXAMPLE,
    payload: arg
});

const exampleAsync = (arg) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(example(arg));
        }, 1000);
    };
};

const exampleComplex = (arg) => ({
    type: EXAMPLE_COMPLEX,
    ip: arg
});

const changeIP = (ip) => {
    return {
        type: 'CHANGE_IP',
        ip
    };
};

module.exports = {
    EXAMPLE, EXAMPLE_ASYNC, EXAMPLE_COMPLEX, CHANGE_IP, example, exampleAsync, exampleComplex, changeIP
};
