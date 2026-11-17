const db = require('../config/database');

// HU-01: Crear reporte rápido con GPS
exports.crearAlerta = async (req, res) => {
  try {
    const { id_usuario_reporta, latitud, longitud, direccion, tipo_fauna, descripcion, url_foto } = req.body;

    const queryText = `
      INSERT INTO ALERTA_RESCATE 
        (id_usuario_reporta, latitud, longitud, direccion, tipo_fauna, descripcion, estado, fecha_hora)
      VALUES (?, ?, ?, ?, ?, ?, 'Reportada', NOW());
    `;
    const values = [id_usuario_reporta || null, latitud, longitud, direccion, tipo_fauna, descripcion];
    
    const [result] = await db.query(queryText, values);

    if (url_foto) {
      await db.query(
        'INSERT INTO FOTO_ALERTA (id_alerta, url_foto) VALUES (?, ?)',
        [result.insertId, url_foto]
      );
    }

    res.status(201).json({
      success: true,
      message: 'Alerta de emergencia registrada correctamente',
      id_alerta: result.insertId
    });
  } catch (error) {
    console.error('Error al crear alerta:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

// HU-02: Cambiar estado por rescatista
exports.cambiarEstadoAlerta = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_rescatista, nuevo_estado } = req.body;

    if (!['En camino', 'Rescatada', 'Derivada'].includes(nuevo_estado)) {
      return res.status(400).json({ success: false, message: 'Estado no válido' });
    }

    const queryText = `
      UPDATE ALERTA_RESCATE
      SET estado = ?, id_rescatista_asignado = ?
      WHERE id_alerta = ?;
    `;
    const [result] = await db.query(queryText, [nuevo_estado, id_rescatista, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Alerta no encontrada' });
    }

    res.status(200).json({
      success: true,
      message: `Estado actualizado a '${nuevo_estado}'`
    });
  } catch (error) {
    console.error('Error al actualizar estado de alerta:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

// Listar alertas activas
exports.obtenerAlertas = async (req, res) => {
  try {
    const queryText = `
      SELECT a.*, f.url_foto 
      FROM ALERTA_RESCATE a
      LEFT JOIN FOTO_ALERTA f ON a.id_alerta = f.id_alerta
      ORDER BY a.fecha_hora DESC;
    `;
    const [rows] = await db.query(queryText);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error al obtener alertas:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};