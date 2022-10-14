const request = require('supertest')
const app = require('../app')
const User = require('../src/models/users')

const sampleUser = {
    name:'Sample User',
    email: 'sample.user@gmail.com',
    password: 'pass@1234',
    age: '24'
}

beforeEach( async () =>{
    await User.deleteMany()
    await new User(sampleUser).save()
})

test('Save User', async() =>{
    await request(app).post('/users').send({
        name:'Asheesh',
        email: 'asheesh0123@gmail.com',
        password: 'pass@1234',
        age: '23'
    }).expect(201)
})