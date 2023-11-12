export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies
  next()
}
