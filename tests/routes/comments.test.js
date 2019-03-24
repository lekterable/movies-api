const request = require('supertest')
const app = require('../../app')
const database = require('../../db')

describe("Test '/comments' path", () => {
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
      const result = await request(app).get('/comments')

      expect(result.statusCode).toBe(200)
    })
    it('Should respond with a success equal to true', async () => {
      const result = await request(app).get('/comments')

      expect(result.body.success).toBe(true)
    })
    it('Should respond with data', async () => {
      const result = await request(app).get('/comments')

      expect(result.body.message).toEqual(expect.anything())
    })
    it('Should respond with a 200 status if movie id provided', async () => {
      const result = await request(app).get('/comments?movie_id=1')

      expect(result.statusCode).toBe(200)
    })
    it('Should respond with a success equal to true if movie id provided', async () => {
      const result = await request(app).get('/comments?movie_id=1')

      expect(result.body.success).toBe(true)
    })
    it('Should respond with data if movie id provided', async () => {
      const result = await request(app).get('/comments?movie_id=1')

      expect(result.body.message).toEqual(expect.anything())
    })
    it("Should respond with a 200 status if movie id provided but movie doesn't exist", async () => {
      await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })

      const result = await request(app).get('/comments?movie_id=1')

      expect(result.statusCode).toEqual(200)
    })
    it("Should respond with a success equal to true if movie id provided but movie doesn't exist", async () => {
      await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })

      const result = await request(app).get('/comments?movie_id=1')

      expect(result.body.success).toEqual(true)
    })
    it("Should respond with data if movie id provided but movie doesn't exist", async () => {
      await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })

      const result = await request(app).get('/comments?movie_id=1')

      expect(result.body.message).toEqual(expect.anything())
    })
    it('Should respond with a 200 status if movie id provided and movie exists without comments', async () => {
      await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })

      const result = await request(app).get('/comments?movie_id=1')

      expect(result.statusCode).toEqual(200)
    })
    it('Should respond with a success equal to true if movie id provided and movie exists without comments', async () => {
      await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })

      const result = await request(app).get('/comments?movie_id=1')

      expect(result.body.success).toEqual(true)
    })
    it('Should respond with data if movie id provided and movie exists without comments', async () => {
      await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })

      const result = await request(app).get('/comments?movie_id=1')

      expect(result.body.message).toEqual(expect.anything())
    })
    it('Should respond with a 200 status if movie id provided and movie exists with comments', async () => {
      const movieId = await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })
        .then(res => res.body.message._id)
      await request(app)
        .post('/comments')
        .send({ movie_id: movieId, body: 'test' })

      const result = await request(app).get(`/comments?movie_id=${movieId}`)

      expect(result.statusCode).toEqual(200)
    })
    it('Should respond with a success equal to true if movie id provided and movie exists with comments', async () => {
      const movieId = await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })
        .then(res => res.body.message._id)
      await request(app)
        .post('/comments')
        .send({ movie_id: movieId, body: 'test' })

      const result = await request(app).get(`/comments?movie_id=${movieId}`)

      expect(result.body.success).toEqual(true)
    })
    it('Should respond with data if movie id provided and movie exists with comments', async () => {
      const movieId = await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })
        .then(res => res.body.message._id)
      await request(app)
        .post('/comments')
        .send({ movie_id: movieId, body: 'test' })

      const result = await request(app).get(`/comments?movie_id=${movieId}`)

      expect(result.body.message).toEqual(expect.anything())
    })
    it('Should respond with correct comments if movie id provided and movie exists with comments', async () => {
      const movieId = await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })
        .then(res => res.body.message._id)

      await request(app)
        .post('/comments')
        .send({ movie_id: movieId, body: 'test' })

      const result = await request(app).get(`/comments?movie_id=${movieId}`)

      expect(result.body.message[0].movie_id).toEqual(movieId)
    })
  })
  describe('POST', () => {
    it('Should respond with a 400 status', async () => {
      const result = await request(app).post('/comments')

      expect(result.statusCode).toBe(400)
    })
    it('Should respond with a success equal to false', async () => {
      const result = await request(app).post('/comments')

      expect(result.body.success).toBe(false)
    })
    it("Should respond with a 'No movie id provided' message", async () => {
      const result = await request(app).post('/comments')

      expect(result.body.message).toBe('No movie id provided')
    })
    it('Should respond with a 400 status if movie id provided', async () => {
      const result = await request(app)
        .post('/comments')
        .send({ movie_id: '0' })

      expect(result.statusCode).toBe(400)
    })
    it('Should respond with a success equal to false if movie id provided', async () => {
      const result = await request(app)
        .post('/comments')
        .send({ movie_id: '0' })

      expect(result.body.success).toBe(false)
    })
    it("Should respond with a 'No comment body provided' message if movie id provided", async () => {
      const result = await request(app)
        .post('/comments')
        .send({ movie_id: '0' })

      expect(result.body.message).toBe('No comment body provided')
    })
    it("Should respond with a 400 status if movie id and comment body provided but movie doesn't exist", async () => {
      const result = await request(app)
        .post('/comments')
        .send({ movie_id: '0', body: 'test' })

      expect(result.statusCode).toBe(400)
    })
    it("Should respond with a success equal to false if movie id and comment body provided but movie doesn't exist", async () => {
      const result = await request(app)
        .post('/comments')
        .send({ movie_id: '0', body: 'test' })

      expect(result.body.success).toBe(false)
    })
    it("Should respond with a 'Invalid movie id provided' message if movie id and comment body provided but movie doesn't exist", async () => {
      const result = await request(app)
        .post('/comments')
        .send({ movie_id: '0', body: 'test' })

      expect(result.body.message).toBe('Invalid movie id provided')
    })
    it('Should respond with a 201 status if movie id and comment body provided and movie exists', async () => {
      const movieId = await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })
        .then(res => res.body.message._id)

      const result = await request(app)
        .post('/comments')
        .send({ movie_id: movieId, body: 'test' })

      expect(result.statusCode).toBe(201)
    })
    it('Should respond with a success equal to true if movie id and comment body provided and movie exists', async () => {
      const movieId = await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })
        .then(res => res.body.message._id)

      const result = await request(app)
        .post('/comments')
        .send({ movie_id: movieId, body: 'test' })

      expect(result.body.success).toBe(true)
    })
    it('Should respond with a correct comment if movie id and comment body provided and movie exists', async () => {
      const movieId = await request(app)
        .post('/movies')
        .send({ title: 'Home Alone' })
        .then(res => res.body.message._id)

      const result = await request(app)
        .post('/comments')
        .send({ movie_id: movieId, body: 'test' })

      expect(result.body.message.movie_id).toBe(movieId)
    })
  })
})
