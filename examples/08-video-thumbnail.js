/**
 * Adding Thumbnail Suffix
 * 
 * Add /ik-thumbnail.jpg suffix to generate thumbnails from videos 
 * with image extensions
 */

function handler(url, urlPrefix, context) {
  const parsedUrl = new URL(url);
  
  if (parsedUrl.pathname.includes('/video/') && 
      parsedUrl.pathname.match(/\.(jpg|jpeg|png|webp)$/i)) {
    
    const pathWithoutExtension = parsedUrl.pathname.replace(/\.[^.]+$/, '');
    parsedUrl.pathname = `${pathWithoutExtension}.mp4/ik-thumbnail.jpg`;
    
    context.logger.info({ 
      originalPath: url, 
      modifiedPath: parsedUrl.toString() 
    }, 'Added thumbnail suffix');
  }
  
  return {
    url: parsedUrl.toString()
  };
}

module.exports.handler = handler;
