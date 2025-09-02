// src/api/cataas.js

const CATAAS_BASE_URL = 'https://cataas.com/cat';

/**
 * Fetches a specified number of unique cat images from Cataas.
 * Cataas sometimes returns the same image repeatedly. We'll try to get diverse ones
 * by appending a unique timestamp and adding width/height parameters.
 *
 * @param {number} count The number of cat images to fetch.
 * @returns {Promise<Array<{id: string, url: string}>>} An array of cat objects.
 */
export async function fetchCats(count = 10) {
  const cats = [];
  const fetchedIds = new Set(); // To track unique IDs

  for (let i = 0; i < count; i++) {
    try {
      // Use timestamp for unique URL to bypass caching and potentially get different images
      const uniqueUrl = `${CATAAS_BASE_URL}?width=400&height=400&_=${Date.now() + i}`;

      // Generate a unique ID for each cat within our app,
      // as Cataas doesn't provide stable IDs for random images.
      const catId = `cat-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

      if (!fetchedIds.has(catId)) { // Ensure our generated ID is unique
        cats.push({ id: catId, url: uniqueUrl });
        fetchedIds.add(catId);
      } else {
        // If, by very slim chance, a generated ID duplicates, try again.
        i--;
      }
    } catch (error) {
      console.error(`Error fetching cat image for iteration ${i}:`, error);
      // If fetching an image fails, decrement i to retry this spot in the list.
      i--;
    }
    // Add a small delay between requests to avoid hitting rate limits or
    // making requests too quickly if the server is sensitive.
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return cats;
}