const asyncHandler = (method) => {
    return (req, res, next) => {
        method(req, res, next).catch(next);
    }
}

asyncHandler(f1); // ()

function f1 () {
    return 'hla hla'
}
