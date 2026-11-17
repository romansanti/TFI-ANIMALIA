const db = require('../config/database');

exports.obtenerCatalogoAdopcion = async (req, res) => {
  try {
    const { tamano, especie, sexo } = req.query;

    let queryText = "SELECT * FROM EXPEDIENTE_ANIMAL WHERE estado_adopcion = 'Disponible'";
    const params = [];

    if (tamano) {
      params.push(tamano);
      queryText += ` AND tamano = $${params.length}`;
    }
    if (especie) {
      params.push(especie);
      queryText += ` AND especie = $${params.length}`;
    }
    if (sexo) {
      params.push(sexo);
      queryText += ` AND sexo = $${params.length}`;
    }

    queryText += ' ORDER BY id_animal DESC;';

    const { rows } = await db.query(queryText, params);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error al consultar catálogo:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};