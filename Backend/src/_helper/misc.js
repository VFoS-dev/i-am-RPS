function fn() { }

function toBoolean(value) {
    if (typeof value == 'string') {
        return value.toLowerCase() !== 'false'
    }
    return !!value
}

module.exports = {
    fn,
    toBoolean
};