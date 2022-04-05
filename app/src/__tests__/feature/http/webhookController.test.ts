// @ts-ignore
import request from 'supertest'
import {Express} from 'express-serve-static-core'
import createServer from '../../../utils/createServer'

let server: Express

const sampleData = {
    "networkId": "CAxOmI7I7t",
    "context": "NETWORK",
    "entityId": "CAxOmI7I7t",
    "currentSettings": [],
    "type": "SUBSCRIPTION",
    "data": {
        "time": "2021-12-20T02:32:06.721Z",
        "name": "space.created",
        "noun": "SPACE",
        "shortDescription": "Create Space",
        "verb": "CREATED",
        "actor": {
            "id": "olQ88vTqYp",
            "roleId": "Kni0OF7HtE",
            "roleType": "admin"
        },
        "object": {
            "id": "ky4X0Ci6q4M5"
        },
        "target": {
            "networkId": "CAxOmI7I7t"
        },
        "id": "8147a2af79248c3c8815ffeaa6777a7f"
    }
};

const oldEnv = process.env;

beforeEach(() => {
    jest.resetModules()
    process.env = {...oldEnv};
});

beforeAll(() => {
    server = createServer();
})

afterAll(() => {
    process.env = oldEnv;
});

describe('api/webhook should work as expected.', () => {
    it('should return 422 for invalid input.', done => {
        request(server)
            .post(`/api/webhook`)
            .expect('Content-Type', /json/)
            .expect(422)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({
                    error: "Client Error",
                    message: "Unprocessable Entity."
                })
                done()
            })
    })

    it('should dispatch an event into the broker.', done => {
        request(server)
            .post(`/api/webhook`)
            .send(sampleData)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({
                    type: sampleData.type,
                    status: "SUCCEEDED",
                    data: sampleData.data
                })
                done()
            })
    })

    it('should return 503 when broker is not available.', done => {
        process.env.RABBITMQ_HOST = "http://localhost/foo"
        request(server)
            .post(`/api/webhook`)
            .send(sampleData)
            .expect('Content-Type', /json/)
            .expect(503)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({
                    error: "Server Error",
                    message: "Something went wrong when trying to connect to the broker."
                })
                done()
            })
    })
})