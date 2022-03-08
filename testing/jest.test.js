const supertest = require('supertest');
const index = require('../Server/index.js');
const app = index.app;
const request = supertest(app);

describe('Questions', () => {

    //Upon test completion close the connection to the server itself
    afterAll((done) => {
      // let server = app.listen(3000);
      app.close() //app.close isnt a function
      done()
    })

    it('should respond with 200 status code', async done => {
      //should recieve questions for a product id from the db
      const response = await request.get('/qa/questions/1')
      //server should respond to client with data and status code 200
      expect(response.status).toBe(200)
      //Upon test completion close the connection to the server itself
      done();
    })

  //Test2

})