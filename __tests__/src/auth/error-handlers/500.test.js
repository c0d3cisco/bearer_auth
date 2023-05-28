'use strict';

const errorHandler = require('../../../../src/error-handlers/500.js');

describe('Error Handler Middleware', () => {
  let mockError;
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockError = new Error('Mock Error');
    mockRequest = {};
    mockResponse = {
      statusCode: 0,
      statusMessage: '',
      headers: {},
      data: '',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      setHeader: function (name, value) {
        this.headers[name] = value;
      },
      write: function (data) {
        this.data = data;
      },
      end: function () {},
    };
    mockNext = jest.fn();
  });

  test('should set status code, status message, content type, and response body', () => {
    errorHandler(mockError, mockRequest, mockResponse, mockNext);

    expect(mockResponse.statusCode).toBe(500);
    expect(mockResponse.statusMessage).toBe('Server Error');
    expect(mockResponse.headers['Content-Type']).toBe('application/json');
    expect(mockResponse.data).toBe(JSON.stringify({ error: 'Mock Error' }));
  });
});
