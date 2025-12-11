/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's unique email address.
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           description: User's password (min 6 characters).
 *           example: "securepassword123"
 *     UserResponse:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the newly registered user.
 *           example: "registered@example.com"
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Server error"
 */