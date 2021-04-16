/**
 * @global db
 */
const { fetchBase64 } = require('src/utils');


class DatabaseService {
  /**
   * @param {object} [where]
   *
   * @return {Promise<object[]>}
   */
  async getSights(where = { }) {
    return await db
      .select('*')
      .from('sights')
      .where(where)
      .catch(() => []);
  }

  /**
   * @param {object} [where]
   *
   * @return {Promise<object[]>}
   */
  async getImages(where = { }) {
    return await db
      .select('*')
      .from('images')
      .where(where)
      .then((images) => {
        /** Fetch image data */
        return Promise.all(images.map(async (image) => {
          image.base64 = await fetchBase64(image.url);

          return image;
        }));
      })
      .catch(() => []);
  }
}

module.exports = new DatabaseService();