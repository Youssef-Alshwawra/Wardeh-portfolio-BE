const responseHandler = (response, statusCode, success = true, message, data = null, ) => {
    return response.status(statusCode).json({
        success,
        message,
        data: data,
        timestamp: new Date(),
    });
}

export default responseHandler;