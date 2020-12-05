const addBaseHeader = async (req, res, next) => {
    res.locals.header = 'Indicator Games'
    next()
}

module.exports = { addBaseHeader}