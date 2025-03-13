import query from '../../db/index.js'

export const getStuffDb = async () => {
  const result = await query('SELECT * FROM mytable;')
  return result.rows
}

export const addStuffDb = async (myColumn, myOtherColumn) => {
  const result = await query(
    `
     INSERT INTO mytable
     (mycolumn, myothercolumn)
     VALUES ($1, $2)
     RETURNING *;
    `,
    [myColumn, myOtherColumn]
  )
  return result.rows[0]
}

export const updateStuffDb = async (id, myColumn, myOtherColumn) => {
  const result = await query(
    `
     UPDATE mytable SET
       mycolumn = $1,
       myothercolumn = $2
     WHERE myID = $3
     RETURNING *;
    `,
    [myColumn, myOtherColumn, id]
  )
  return result.rows[0]
}

export const deleteStuffDb = async id => {
  const result = await query(
    `
     DELETE FROM mytable
     WHERE myID = $1
     RETURNING *;
    `,
    [id]
  )
  return result.rows[0]
}
