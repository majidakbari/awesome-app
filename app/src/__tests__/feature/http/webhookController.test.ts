// @ts-ignore
import request from 'supertest'
import {Express} from 'express-serve-static-core'
import createServer from '../../../utils/createServer'
import * as crypto from 'crypto';

let server: Express
const secret = process.env.SIGNING_SECRET as string;

beforeAll(() => {
    server = createServer();
})

jest.setTimeout(1000000)

describe('api/webhook should work as expected.', () => {
    it('should return 422 for invalid input.', done => {
        const timestamp = new Date().getTime();
        const xTribeSignature = crypto.createHmac('sha256', secret).update(`${timestamp}:{}`).digest('hex');
        request(server)
            .post('/api/webhook')
            .set({'x-tribe-signature': xTribeSignature})
            .set({'x-tribe-request-timestamp': timestamp})
            .expect('Content-Type', /json/)
            .expect(422)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({
                    error: 'Client Error',
                    message: 'Unprocessable Entity.'
                })
                done()
            })
    })

    it('should return 200.', done => {
        const sampleData = {
            'networkId': 'CAxOmI7I7t',
            'context': 'NETWORK',
            'entityId': 'CAxOmI7I7t',
            'currentSettings': [],
            'type': 'SUBSCRIPTION',
            'data': {
                'time': '2021-12-20T02:32:06.721Z',
                'name': 'post.published',
                'noun': 'SPACE',
                'shortDescription': 'Create Space',
                'verb': 'CREATED',
                'actor': {
                    'roleId': 'Kni0OF7HtE',
                    'roleType': 'admin'
                },
                'object': {
                    'id': 'ky4X0Ci6q4M5'
                },
                'target': {
                    'networkId': 'CAxOmI7I7t'
                },
                'id': '8147a2af79248c3c8815ffeaa6777a7f'
            }
        };
        const timestamp = new Date().getTime();
        const xTribeSignature = crypto.createHmac('sha256', secret)
            .update(`${timestamp}:${JSON.stringify(sampleData)}`)
            .digest('hex');

        request(server)
            .post('/api/webhook')
            .set({'x-tribe-signature': xTribeSignature})
            .set({'x-tribe-request-timestamp': timestamp})
            .send(sampleData)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({
                    type: 'post.published',
                    status: 'SUCCEEDED',
                    data: sampleData.data
                })
                done()
            })
    })

    it('should return 400 when event type is not supported.', done => {
        const sampleData = {
            'networkId': 'CAxOmI7I7t',
            'context': 'NETWORK',
            'entityId': 'CAxOmI7I7t',
            'currentSettings': [],
            'type': 'SUBSCRIPTION',
            'data': {
                'time': '2021-12-20T02:32:06.721Z',
                'name': 'space.added',
                'noun': 'SPACE',
                'shortDescription': 'Create Space',
                'verb': 'CREATED',
                'actor': {
                    'id': 'olQ88vTqYp',
                    'roleId': 'Kni0OF7HtE',
                    'roleType': 'admin'
                },
                'object': {
                    'id': 'ky4X0Ci6q4M5'
                },
                'target': {
                    'networkId': 'CAxOmI7I7t'
                },
                'id': '8147a2af79248c3c8815ffeaa6777a7f'
            }
        };
        const timestamp = new Date().getTime();
        const xTribeSignature = crypto.createHmac('sha256', secret)
            .update(`${timestamp}:${JSON.stringify(sampleData)}`)
            .digest('hex');

        request(server)
            .post('/api/webhook')
            .set({'x-tribe-signature': xTribeSignature})
            .set({'x-tribe-request-timestamp': timestamp})
            .send(sampleData)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({
                    error: 'Client Error',
                    message: 'This event is not supported by the app.'
                })
                done()
            })
    })
})