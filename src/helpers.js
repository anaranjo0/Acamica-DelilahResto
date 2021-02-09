const sequelize = require("./database/dbConnection");

//preprocesa la orden y devuelve el total, el detalle y el medio de pago
async function orderProcessing(requestBody) {
  const itemsOrdered = requestBody;
  const itemsMatched = [];
  var total = 0;
  var detail = "";
  var paymentMethod = itemsOrdered[itemsOrdered.length - 1];
  for (i = 0; i < itemsOrdered.length - 1; i++) {
    itemsMatched.push(...(await dbMatch("items", "id", itemsOrdered[i].id)));
    total += itemsMatched[i].price * itemsOrdered[i].qty;
    detail += `${itemsMatched[i].description} x ${itemsOrdered[i].qty} `;
  }
  return {total, detail, paymentMethod}
}

//consultas a la base de datos
async function dbMatch(table, field, value) {
  const query ="SELECT * FROM " + `${table}` + " WHERE " + `${table}.${field}=`+`'${value}';`; 
  const [result] = await sequelize.query(query, { raw: true });
  return result;
}

module.exports = { dbMatch, orderProcessing };
