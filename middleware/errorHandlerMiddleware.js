import { StatusCodes } from "http-status-codes"

const errorHandlerMiddleware = (err, req, res, next) => {
   console.log(err)
   console.log("err.status code is " + err.statusCode)
   const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
   console.log("status code is " + statusCode)
   const msg = err.message || "something went wrong, try again later"
   res.status(statusCode).json({ msg })
}

export default errorHandlerMiddleware