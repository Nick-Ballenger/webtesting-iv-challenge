const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');


//basic env test
describe('server', () => {
    it('sets the environment to testing', () => {
      expect(process.env.DB_ENV).toBe('testing');
    });
  });

//get test
  describe('get/', ()=>{
    test('should return status 200',()=>{
      return  request(server).get('/').expect(200)
    })
    test('using async/await',async()=>{
        const res = await request(server).get('/')
        expect(res.status).toBe(200)
    })
})
//delete tests
describe('delete potter', () => {

    afterEach(async () => {
        await db('potter').truncate();
    });

    it('gives 200 when deleted', async () => {
        const add = {name: 'JimBob'}
        const addResponse = await request(server).post('/potterChar').send(add);

        if(addResponse.status === 201) {
            const body = {name: 'JimBob'}
            const response = await request(server).delete('/potterChar').send(body);

            expect(response.status).toBe(200);
            db('characters').truncate();
        }
    });

    it('gives 400 when body is not filled', async () => {
        const body = {}
        const response = await request(server).delete('/potterChar').send(body);

        expect(response.status).toBe(400);
        db('potter').truncate();
    });
});
