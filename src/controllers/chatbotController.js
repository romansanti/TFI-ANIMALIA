const protocolosPrimerosAuxilios = {
  atropello: {
    titulo: "Atropello / Traumatismo Grave",
    pasos: [
      "1. Aproxímese con precaución: el animal con dolor puede intentar morder por instinto.",
      "2. Cubra su cuerpo con una manta o prenda gruesa para mantener el calor corporal y contenerlo.",
      "3. Trasládelo sobre una superficie rígida (tabla o cartón firme) evitando doblar su columna.",
      "4. Acuda o contacte de inmediato a la veterinaria más cercana."
    ],
    prohibido: [
      "NO administrar medicamentos de uso humano (Ibuprofeno/Paracetamol son altamente tóxicos).",
      "NO ofrecer agua ni alimentos si el animal no se encuentra plenamente consciente."
    ]
  },
  intoxicacion: {
    titulo: "Sospecha de Intoxicación o Envenenamiento",
    pasos: [
      "1. Identifique si es posible el producto o tóxico ingerido (guarde la etiqueta o envase).",
      "2. Mantenga al animal en un ambiente ventilado, tranquilo y templado.",
      "3. Contacte de urgencia a un médico veterinario."
    ],
    prohibido: [
      "NO inducir el vómito sin indicación profesional expresa.",
      "NO suministrar leche, aceite de cocina ni remedios caseros."
    ]
  },
  ave_caida: {
    titulo: "Pichón / Ave Caída o Herida",
    pasos: [
      "1. Evalúe si tiene plumas completas: si es un volantón activo, sus padres suelen estar cerca alimentándolo.",
      "2. Si está herido o indefenso, colóquelo suavemente dentro de una caja de cartón con agujeros de ventilación.",
      "3. Mantenga la caja en un lugar oscuro, silencioso y a temperatura cálida.",
      "4. Reporte la alerta en la plataforma para derivación con fauna/rescatista."
    ],
    prohibido: [
      "NO forzar la ingesta de agua con jeringa por el pico (podría derivar a los pulmones y ahogarlo).",
      "NO manipular aves rapaces o silvestres sin guantes de protección adecuados."
    ]
  }
};

exports.consultarChatbot = async (req, res) => {
  try {
    const { tipo_cuadro } = req.body;

    const protocolo = protocolosPrimerosAuxilios[tipo_cuadro];

    if (!protocolo) {
      return res.status(200).json({
        success: true,
        respuesta: "Por favor seleccione una categoría válida de emergencia: 'atropello', 'intoxicacion' o 'ave_caida'."
      });
    }

    res.status(200).json({
      success: true,
      data: protocolo
    });
  } catch (error) {
    console.error('Error en consulta de chatbot:', error);
    res.status(500).json({ success: false, error: 'Error interno en el asistente virtual' });
  }
};