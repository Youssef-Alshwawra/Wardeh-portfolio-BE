const asyncHandler = (method) => {
    return (req, res, next) => {
        method(req, res, next).catch(next);
    }
}

export default asyncHandler;