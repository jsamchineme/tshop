export default {
  collection(data) {
    data.rows = data.rows.map(row => this.item(row));
    return data;
  },
  item(row) {
    return {
      attribute_value_id: row.attribute_value_id,
      attribute_name: row.attribute.name,
      attribute_value: row.value,
    };
  }
};
