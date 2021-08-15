const errorHandlers = (error, req, res, next) => {
    if (error) {
        res.status(error.status).send({ message: error.message })
    }
    next()
}

export default errorHandlers