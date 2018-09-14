const {defaultProps} = require('recompose');

const CheckList = require('./ServiceCheckList');

module.exports = defaultProps({
    items: [{ title: "services.serviceRoottype.instruction", name:"06"},
            { title: "services.serviceRoottype.sanity", name:"07"},
            { title: "services.serviceRoottype.religion", name:"04"},
            { title: "services.serviceRoottype.financial", name:"11"},
            { title: "services.serviceRoottype.amministration", name:"01"},
            { title: "services.serviceRoottype.sport", name:"09"},
            { title: "services.serviceRoottype.social", name:"14"},
            { title: "services.serviceRoottype.justice", name:"02"},
            { title: "services.serviceRoottype.culture", name:"05"},
            { title: "services.serviceRoottype.info", name:"13"},
            { title: "services.serviceRoottype.security", name:"03"},
            { title: "services.serviceRoottype.commerce", name:"10"}]
})(CheckList);