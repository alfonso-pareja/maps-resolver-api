export function extractCoordinatesFromURL(url) {
  const patterns = [
    /@(-?\d+\.\d+),(-?\d+\.\d+)/,                      // @lat,lng
    /q=(-?\d+\.\d+),(-?\d+\.\d+)/,                     // ?q=lat,lng
    /search\/(-?\d+\.\d+),\+?(-?\d+\.\d+)/             // /search/lat,+lng
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return {
        lat: match[1],
        lng: match[2],
      };
    }
  }

  return null;
}
