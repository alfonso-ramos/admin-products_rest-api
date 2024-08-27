import server from './server'
import colors from 'colors'

const port = process.env.PORT || 9001
server.listen(port, () => {
    console.log('rest api en el puerto', colors.yellow(`${port}`))
})