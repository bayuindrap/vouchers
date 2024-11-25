import request from 'supertest';
import app from '../index.js';

describe('Server Test', () => {
  it('should be running on specified port', async () => {
    const response = await request(app).get('/');
    expect(response.status).not.toBe(404);
  });
});
    