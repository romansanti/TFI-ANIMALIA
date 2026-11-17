const db = require('../config/database');

exports.agregarRegistroSanitario = async (req, res) => {
  try {
    const { id_animal, id_veterinario, tipo_intervencion, detalle, proximo_vencimiento } = req.body;

    const queryText = `
      INSERT INTO REGISTRO_SANITARIO
        (id_animal, id_veterinario, tipo_intervencion, detalle, fecha, proximo_vencimiento)
      VALUES ($1, $2, $3, $4, NOW(), $5)
      RETURNING *;
    `;
    const values = [id_animal, id_veterinario, tipo_intervencion, detalle, proximo_vencimiento || null];
    const { rows } = await db.query(queryText, values);

    res.status(201).json({
      success: true,
      message: 'Registro sanitario cargado exitosamente',
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al agregar registro sanitario:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

exports.obtenerExpedientePorId = async (req, res) => {
  try {
    const { id } = req.params;

    const animalQuery = 'SELECT * FROM EXPEDIENTE_ANIMAL WHERE id_animal = $1;';
    const animalRes = await db.query(animalQuery, [id]);

    if (animalRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Expediente no encontrado' });
    }

    const registrosQuery = 'SELECT * FROM REGISTRO_SANITARIO WHERE id_animal = $1 ORDER BY fecha DESC;';
    const registrosRes = await db.query(registrosQuery, [id]);

    res.status(200).json({
      success: true,
      data: {
        animal: animalRes.rows[0],
        historial_medico: registrosRes.rows
      }
    });
  } catch (error) {
    console.error('Error al consultar expediente:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};