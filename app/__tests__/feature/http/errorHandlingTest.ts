import request from 'supertest'
import {Express} from 'express-serve-static-core'

import createServer from '../../../src/utils/server'

let server: Express

beforeAll(async () => {
    server = createServer();
})

describe('GET /api/hello', () => {
    it('should return 200 & valid response', done => {
        request(server)
            .get(`/api/hello`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({'message': 'Hello world'})
                done()
            })
    })
})