/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     AuthBody:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address.
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           description: User's password (min 6 characters).
 *           example: "securePassword123"
 *
 *     SignupSuccessResponse:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user.
 *           example: "registered@example.com"
 *
 *     SigninSuccessResponse:
 *       type: object
 *       required:
 *         - token
 *         - user
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token used for authenticated requests.
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: "logged_in@example.com"
 *     
 *     ValidationErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: "Validation error"
 * 
 *     UnauthorizedErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 401
 *         message:
 *           type: string
 * 
 *     ConflictErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 409
 *         message:
 *           type: string
 *           example: "Email already in use"
 * 
 *     ServerErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 500
 *         message:
 *           type: string
 *           example: "Internal Server Error"
 */
