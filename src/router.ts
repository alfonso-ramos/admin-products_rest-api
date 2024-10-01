import { Router } from "express"
import { body, param } from 'express-validator'
import { getProducts, getProductById, createProduct, updateProduct, updateAvailability, deleteProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()
/**
 *@swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: Phone case
 *                  price:
 *                      type: float
 *                      description: The product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 */

// Routing
router.get('/', getProducts)
/**
 *  @swagger
 *  /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successfil response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                               $ref: '#/components/schemas/Product'
 *
 *
 *
 */
router.get('/:id',

    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
)
/**
 *  @swagger
 *  /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a of product base on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product not found
 *              400:
 *                  description: Bad request - invalid ID
 *
 *
 */

router.post('/',
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    handleInputErrors,

    createProduct
)

/**
 *  @swagger
 *  /api/products:
 *      post:
 *          summary: Create a new product
 *          tags:
 *              - Products
 *          description: Return a new record in the DB
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "PC ATX case"
 *                              price:
 *                                  type: number
 *                                  example: "99"
 *          responses:
 *              201:
 *                  description: Product updated successfuly
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - invalid input data
 *
 */

router.put('/:id',
    param('id').isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)
/**
 *  @swagger
 *  /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "PC ATX case"
 *                              price:
 *                                  type: number
 *                                  example: "99"
 *                              availability:
 *                                  type: boolean
 *                                  examaple: true
 *          responses:
 *              200:
 *                  description: Product updated successfuly
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - invalid Id or invalid input data
 *              404:
 *                  description: Product not found
 *
 */

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)
/**
 *  @swagger
 *  /api/products/{id}:
 *      patch:
 *          summary: Updates a product availability
 *          tags:
 *              - Products
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Product updated successfuly
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - invalid ID
 *              404:
 *                  description: Product not Found
 *
 */
router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)
/**
 *  @swagger
 *  /api/products/{id}:
 *      delete:
 *          summary: Delete a product by id
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Product updated successfuly
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: Product Deleted
 *              400:
 *                  description: Bad request - invalid ID
 *              404:
 *                  description: Product not Found
 *
 */

export default router