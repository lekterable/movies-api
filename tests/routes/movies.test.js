const request = require('supertest')
const app = require('../../app')
const database = require('../../db')

describe("Test '/movies' path", () => {
  beforeAll(async () => {
    await database.connect('movies-test')
    await database.clean()
  })
  afterEach(async () => {
    await database.clean()
  })
  afterAll(async () => await database.disconnect())
  describe('GET', () => {
    it('Should respond with a 200 status', async () => {
      const result = await request(app).get('/movies')

      expect(result.statusCode).toBe(200)
    })
    it('Should respond with a success equal to true', async () => {
      const result = await request(app).get('/movies')

      expect(result.body.success).toBe(true)
    })
    it('Should respond with a data', async () => {
      const result = await request(app).get('/movies')

      expect(result.body.message).toEqual(expect.anything())
    })
    it('Should respond with a 200 status if title provided', async () => {
      const result = await request(app).get('/movies?title=Home+Alone')

      expect(result.statusCode).toBe(200)
    })
    it('Should respond with a success equal to true if title provided', async () => {
      const result = await request(app).get('/movies?title=Home+Alone')

      expect(result.body.success).toBe(true)
    })
    it('Should respond with a data if title provided', async () => {
      const result = await request(app).get('/movies?title=Home+Alone')

      expect(result.body.message).toEqual(expect.anything())
    })
    it("Should respond with a 200 status if title provided but movie doesn't exist", async () => {
      await request(app)
        .post('/movies')
        .send({ title: 'ihopethisdoesntexist:)' })

      const result = await request(app).get('/movies?title=Home+Alone')

      expect(result.statusCode).toBe(200)
    })
    it("Should respond with a success equal to true if title provided but movie doesn't exist", async () => {
      await request(app)
        .post('/movies')
        .send({ title: 'ihopethisdoesntexist:)' })

      const result = await request(app).get('/movies?title=Home+Alone')

      expect(result.body.success).toBe(true)
    })
    it("Should respond with a data if title provided but movie doesn't exist", async () => {
      await request(app)
        .post('/movies')
        .send({ title: 'ihopethisdoesntexist:)' })

      const result = await request(app).get('/movies?title=Home+Alone')

      expect(result.body.message).toEqual(expect.anything())
    })
    it("Should respond with an empty array if title provided but movie doesn't exist", async () => {
      await request(app)
        .post('/movies')
        .send({ title: 'ihopethisdoesntexist:)' })

      const result = await request(app).get('/movies?title=Home+Alone')

      expect(result.body.message.length).toBe(0)
    })
    it('Should respond with a 200 status if title provided and movie exists', async () => {
      await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })

      const result = await request(app).get('/movies?title=Home+Alone')

      expect(result.statusCode).toBe(200)
    })
    it('Should respond with a success equal to true if title provided and movie exists', async () => {
      await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })

      const result = await request(app).get('/movies?title=Home+Alone')

      expect(result.body.success).toBe(true)
    })
    it('Should respond with a correct movie if title provided and movie exists', async () => {
      await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })

      const result = await request(app).get('/movies?title=Home+Alone')
      expect(result.body.message[0].Title).toBe('Home Alone')
    })
  })
  describe('POST', () => {
    it('Should respond with a 400 status', async () => {
      const result = await request(app).post('/movies')

      expect(result.statusCode).toBe(400)
    })
    it('Should respond with a success equal to false', async () => {
      const result = await request(app).post('/movies')

      expect(result.body.success).toEqual(false)
    })
    it("Should respond with a 'No title provided' message", async () => {
      const result = await request(app).post('/movies')

      expect(result.body.message).toBe('No title provided')
    })
    it("Should respond with a 400 status if title provided but movie doesn't exist", async () => {
      const result = await request(app)
        .post('/movies')
        .send({ title: 'ihopethisdoesntexist:)' })

      expect(result.statusCode).toBe(400)
    })
    it("Should respond with a success equal to false if title provided but movie doesn't exist", async () => {
      const result = await request(app)
        .post('/movies')
        .send({ title: 'ihopethisdoesntexist:)' })

      expect(result.body.success).toBe(false)
    })
    it("Should respond with a 'Movie not found' message if title provided but movie doesn't exist", async () => {
      const result = await request(app)
        .post('/movies')
        .send({ title: 'ihopethisdoesntexist:)' })

      expect(result.body.message).toBe('Movie not found')
    })
    it('Should respond with a success equal to true if title provided and movie exists', async () => {
      const result = await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })

      expect(result.body.success).toBe(true)
    })
    it('Should respond with a 201 status if title provided and movie exists', async () => {
      const result = await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })

      expect(result.statusCode).toBe(201)
    })
    it('Should respond with a data if title provided and movie exists', async () => {
      const result = await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })

      expect(result.body.message).toEqual(expect.anything())
    })
    it('Should respond with a correct movie if title provided and movie exists', async () => {
      const result = await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })

      expect(result.body.message.Title).toBe('Home Alone')
    })
  })
})
