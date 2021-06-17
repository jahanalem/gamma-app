enum Successful {
    OK = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
}

enum ClientError {
    // Client Error
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    LengthRequired = 411,
    UnprocessableEntity = 422,
}

enum ServerError {
    // Server Error
    InternalServerError = 500,
    NotImplemented = 501,
    ServiceUnavailable = 503,
}

export const HTTPStatusCodes = { Successful, ClientError, ServerError };