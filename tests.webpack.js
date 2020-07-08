var context = require.context('./js', true, /accidents-test\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
