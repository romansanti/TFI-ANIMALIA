const db = require('../config/database');

exports.obtenerPuntosZoonosis = async (req, res) => {
  try {
    const queryText = 'SELECT * FROM PUNTO_ZOONOSIS ORDER BY nombre_centro ASC;';
    const { rows } = await db.query(queryText);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error al consultar puntos de Zoonosis:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};