import request from "supertest";
import server from "../../server";

describe('POST /api/products', () => {
    test('should display validation errors', async() => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    test('the price should be greater than', async() => {
        const response = await request(server).post('/api/products').send({
            name : "Mouse - test",
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
    });

    test('should validate that the price is a number', async() => {
        const response = await request(server).post('/api/products').send({
            name : "Mouse - test",
            price: 'hola'
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)
    });

    test('Should create a new product', async() => {
        const response = await request(server).post('/api/products').send({
            name : "Mouse - test",
            price: 15
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
    });

});

describe('GET /api/products', () => {
    test('GET a JSON response with products', async () => { 
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.body).not.toHaveProperty('errors')
        expect(response.status).not.toBe(404)
    })
});

describe('GET /api/produts/:id', () => {
    test('should return a 404 response for a non-existent product', async() => {
        const productId = 2000
        const response = await request(server).get(`/api/products${productId}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
    })
});