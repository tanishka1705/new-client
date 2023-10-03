import AppError from "./appError"

const catchAsync = fn => {
    return (req, res, next) => fn(req, res, next).catch(err => {
        console.log(err);
        console.log('Name: ' + err.name);
        if (err.name === 'CastError') return next(new AppError(`Invalid ${err.kind}! Please provide valid Id`))
        else if (err.name === 'ValidationError') return next(new AppError(`${err._message}, All fields are required!`))
        else if (err.name === 'MongoServerError') return next(new AppError(`Duplicate Keys`))
        else return next()
    })
}

export default catchAsync