module.exports = (err, req, res, next) => {
    console.log(err.name)
    let status, message
    switch (err.name) {
        case `isDeployed`:
            status = 403
            message = `Pokemon still in expedition`
            break

        case `SequelizeUniqueConstraintError`:
        case `SequelizeValidationError`:
            status = 400
            message = err.message
            break

        case `EmailPasswordRequired`:
            status = 400
            message = `Email/Password is required`
            break;

        case `InvalidEmailPassword`:
            status = 401
            message = `Invalid Email/Password`
            break;

        case `JsonWebTokenError`:
        case `InvalidToken`:
            status = 401
            message = `Wrong login credential`
            break;

        case `Unauthenticated`:
            status = 401
            message = `You don't have access to this page`
        break;

        case `NotFound`:
            status = 404,
            message = `Data not found`
            break;

        default:
            status = 500,
            message = 'Internal server error'
            break;
    }
    res.status(status).json({ message })
}