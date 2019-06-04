export default {
  collection(data, req) {
    data.rows = data.rows.map(row => this.item(row, req));
    return data;
  },
  item(row, req) {
    const { description_length } = req.query;
    if (description_length) {
      row.description = `${row.description.substring(0, Number(description_length))}...`;
    }

    return {
      product_id: row.product_id,
      description: row.description,
      name: row.name,
      price: Number(row.price),
      discounted_price: row.discounted_price,
      image: row.image,
      image_2: row.image_2,
      thumbnail: row.thumbnail,
      display: row.display,
    };
  }
};
