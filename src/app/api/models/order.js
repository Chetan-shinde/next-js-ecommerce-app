export const createOrderMaster = async (order_master_insert_data, db) => {
  const [order_master] = await db("order_master").insert(
    order_master_insert_data,
    ["om_id"]
  );

  return order_master.om_id;
};

export const createOrderItems = async (order_item_insert_data, db) => {
  const [order_item] = await db("order_items").insert(order_item_insert_data, [
    "oi_id",
  ]);
  return order_item.oi_id;
};

export const getOrderDataByID = async (item_id, om_id, db) => {
  const query = db
    .select(
      "om.om_cust_id",
      "om.om_order_total",
      "oi.oi_id",
      "oi.oi_prod_id",
      "oi.oi_total",
      "om.om_payment_status",
      "om.om_id",
      "p.prod_name"
    )
    .table("order_items as oi")
    .join("order_master as om", "om.om_id", "=", "oi.oi_om_id")
    .join("products as p", "p.prod_id", "=", "oi.oi_prod_id")
    .whereIn("oi_id", item_id)
    .where("om_id", om_id);

  const data = await query;

  return data;
};
