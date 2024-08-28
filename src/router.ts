import { Router } from "express"
import {body, param} from 'express-validator'
import { getProducts, getProductById,createProduct } from "./handlers/product"
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

router.put('/', (req,res) => {
    res.send('Desde PUT')
})
router.patch('/', (req,res) => {
    res.send('Desde PATCH')
})
router.delete('/', (req,res) => {
    res.send('Desde DELETE')
})

export default router