const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1, category) {
  console.log('abuPage', category);
  const offset = helper.getOffset(page, config.listPerPage);
  let query = `select * from naturesPantry.products`;
  if (category) {
    query = query + ` WHERE category = '${category}'`
  }
  const rows = await db.query(
    query
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data, 
    meta
  }
}
async function create(check) {
  const result = await db.query(
    `INSERT INTO naturesPantry.products 
    (Name, imageurl, price, category, id, unit) 
    VALUES 
    ('${check.Name}', '${check.imageurl}', '${check.price}', '${check.category}', '${check.id}', '${check.unit}')`
  );

  let message = 'Error in creating programming language';

  if (result.affectedRows) {
    message = 'Programming language created successfully';
  }

  return { message };
}
async function remove(id) {
  const result = await db.query(
    `DELETE FROM naturesPantry.products WHERE id='${id}'`
  );

  let message = 'Error in deleting programming language';

  if (result.affectedRows) {
    message = 'Programming language deleted successfully';
  }

  return { message };
}
module.exports = {
  getMultiple,
  create,
  remove
}