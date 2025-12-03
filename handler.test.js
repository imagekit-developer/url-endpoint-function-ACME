const handler = require('./handler');

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

  describe('Default behavior (no-op)', () => {
    it('should return the original URL unchanged', () => {
      const url = 'https://ik.imagekit.io/demo/image.jpg';
      const urlPrefix = 'demo';
      
      const result = handler(url, urlPrefix, mockContext);
      
      expect(result).toHaveProperty('url');
      expect(result.url).toBe(url);
    });

    it('should set signURL to false by default', () => {
      const url = 'https://ik.imagekit.io/demo/image.jpg';
      const urlPrefix = 'demo';
      
      const result = handler(url, urlPrefix, mockContext);
      
      expect(result).toHaveProperty('signURL');
      expect(result.signURL).toBe(false);
    });

    it('should handle URLs with query parameters', () => {
      const url = 'https://ik.imagekit.io/demo/image.jpg?quality=80&format=webp';
      const urlPrefix = 'demo';
      
      const result = handler(url, urlPrefix, mockContext);
      
      expect(result.url).toBe(url);
      expect(result.signURL).toBe(false);
    });

    it('should handle URLs with transformation parameters', () => {
      const url = 'https://ik.imagekit.io/demo/w_100/h_200/image.jpg';
      const urlPrefix = 'demo';
      
      const result = handler(url, urlPrefix, mockContext);
      
      expect(result.url).toBe(url);
      expect(result.signURL).toBe(false);
    });

    it('should work with different urlPrefix values', () => {
      const url = 'https://ik.imagekit.io/demo/image.jpg';
      const prefixes = ['img', 's3-bucket', 'web-folder', 'custom-prefix'];
      
      prefixes.forEach(prefix => {
        const result = handler(url, prefix, mockContext);
        expect(result.url).toBe(url);
        expect(result.signURL).toBe(false);
      });
    });

    it('should work with different context values', () => {
      const url = 'https://ik.imagekit.io/demo/image.jpg';
      const urlPrefix = 'demo';
      
      const contexts = [
        { ...mockContext, isDebug: true },
        { ...mockContext, host: 'different-host.com' },
        { ...mockContext, clientNumber: 'client-456' }
      ];
      
      contexts.forEach(ctx => {
        const result = handler(url, urlPrefix, ctx);
        expect(result.url).toBe(url);
        expect(result.signURL).toBe(false);
      });
    });
  });

  describe('Return value structure', () => {
    it('should return an object with url property', () => {
      const url = 'https://ik.imagekit.io/demo/image.jpg';
      const result = handler(url, 'demo', mockContext);
      
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('url');
      expect(typeof result.url).toBe('string');
    });

    it('should return an object with signURL property', () => {
      const url = 'https://ik.imagekit.io/demo/image.jpg';
      const result = handler(url, 'demo', mockContext);
      
      expect(result).toHaveProperty('signURL');
      expect(typeof result.signURL).toBe('boolean');
    });

    it('should not return status property (normal result type)', () => {
      const url = 'https://ik.imagekit.io/demo/image.jpg';
      const result = handler(url, 'demo', mockContext);
      
      expect(result).not.toHaveProperty('status');
      expect(result).not.toHaveProperty('body');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty query strings', () => {
      const url = 'https://ik.imagekit.io/demo/image.jpg?';
      const result = handler(url, 'demo', mockContext);
      
      expect(result.url).toBe(url);
    });

    it('should handle URLs with fragments', () => {
      const url = 'https://ik.imagekit.io/demo/image.jpg#section';
      const result = handler(url, 'demo', mockContext);
      
      expect(result.url).toBe(url);
    });

    it('should handle complex paths', () => {
      const url = 'https://ik.imagekit.io/demo/folder/subfolder/image.jpg';
      const result = handler(url, 'demo', mockContext);
      
      expect(result.url).toBe(url);
    });

    it('should handle URLs with special characters', () => {
      const url = 'https://ik.imagekit.io/demo/image%20with%20spaces.jpg';
      const result = handler(url, 'demo', mockContext);
      
      expect(result.url).toBe(url);
    });
  });
});
