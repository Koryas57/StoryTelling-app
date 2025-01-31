const withNavigationBarColor = require('./withNavigationBar');

module.exports = ({ config }) => {
    return {
        ...config,
        plugins: [
            ...(config.plugins || []),
            withNavigationBarColor,
        ],
    };
};
