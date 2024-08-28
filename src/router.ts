import { Router } from "express"
import {body, param} from 'express-validator'
import { getProducts, getProductById, createProduct, updateProduct, updateAvailability, deleteProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"
const router = Router()

// routing
router.get('/', getProducts)
router.get('/:id',

    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById)

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

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability

)
router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router