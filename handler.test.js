const { handler } = require('./handler');

describe('URL Endpoint Function Handler', () => {
  // Mock context object for testing
  const mockContext = {
    host: 'ik.imagekit.io',
    clientNumber: 'test-client-123',
    isDebug: false,
    logger: {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn()
    }
  };

  it('should return the original URL unchanged', () => {
    const url = 'https://ik.imagekit.io/demo/image.jpg';
    const urlPrefix = 'demo';
    
    const result = handler(url, urlPrefix, mockContext);
    
    expect(result.url).toBe(url);
    expect(result.signURL).toBe(false);
  });
});
