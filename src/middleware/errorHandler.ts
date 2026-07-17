import { type ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let errorMessage = 'Internal server error';
    let statusCode = 500;

    if (err instanceof Error) {
    // checks if cause property exists, is an object, and has a 'status' property
        if (err.cause && typeof err.cause === 'object' && 'status' in err.cause) {
            statusCode = err.cause.status as number;
        }
        errorMessage = err.message;
    }
     if (err && typeof err === 'object' && 'code' in err && err.code === 11000) {

        const keyValue = 'keyValue' in err ? err.keyValue : {};
        const field = Object.keys(keyValue)[0];

        if (field) {
        const value = req.body[field];
            res.status(409).json({ message: `${field} '${value}' already exists`});
        } else {
             res.status(409).json({ message: 'Duplicate value already exists' });
        }
            } else {
        res.status(statusCode).json({ error: errorMessage })
    }
};

export default errorHandler;