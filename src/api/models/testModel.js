import query from '../../db/index.js'

export const getTestDb = async () => {
  const result = await query('SELECT \'It works!\' AS "Hooray, you did it!";')
  return result.rows[0]
}
