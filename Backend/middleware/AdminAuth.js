// /**
//  * Simple Bearer-token admin guard.
//  * Set ADMIN_SECRET in .env — pass it as:
//  *   Authorization: Bearer <your_secret>
//  */
// const AdminAuth = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized — Bearer token required",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   if (token !== process.env.ADMIN_SECRET) {
//     return res.status(403).json({
//       success: false,
//       message: "Forbidden — Invalid admin token",
//     });
//   }

//   next();
// };

// export default AdminAuth;























/**
 * Simple Bearer-token admin guard.
 * Set ADMIN_SECRET in .env — pass it as:
 *   Authorization: Bearer <your_secret>
 */
const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized — Bearer token required",
    });
  }

  const token = authHeader.split(" ")[1];

  if (token !== process.env.ADMIN_SECRET) {
    return res.status(403).json({
      success: false,
      message: "Forbidden — Invalid admin token",
    });
  }

  next();
};

export default adminAuth;