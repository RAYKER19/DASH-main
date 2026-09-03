
INSERT INTO categorias (nombre, descripcion)
VALUES
	('VENTAS', 'Consultas y oportunidades comerciales'),
	('SOPORTE', 'Ayuda técnica y resolución de incidencias'),
	('RECLAMO', 'Quejas o incidencias reportadas por clientes'),
	('CONSULTA', 'Solicitudes generales de información'),
	('FELICITACION', 'Reconocimientos positivos al servicio'),
	('OTROS', 'Comentarios que no encajan en otra categoría')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO clientes (nombre, email, empresa)
SELECT datos.nombre, datos.email, datos.empresa
FROM (VALUES
	('Ana Gómez', 'ana@apex.com', 'Apex Soluciones'),
	('Mateo Ruiz', 'mateo@logiscenter.com', 'LogisCenter'),
	('Sofía Torres', 'sofia@nexa.com', 'Nexa Retail'),
	('Diego Pérez', 'diego@bluewave.com', 'BlueWave'),
	('Carmen Ríos', 'carmen@mediclinic.com', 'MediClinic')
) AS datos(nombre, email, empresa)
WHERE NOT EXISTS (SELECT 1 FROM clientes WHERE clientes.email = datos.email);

INSERT INTO comentarios (cliente_id, contenido, canal, estado, categoria, procesado)
SELECT clientes.id, datos.contenido, datos.canal, 'resuelto', datos.categoria, TRUE
FROM (VALUES
	('ana@apex.com', 'El servicio fue rápido y amable.', 'email', 'FELICITACION'),
	('mateo@logiscenter.com', 'Necesito una actualización del proceso de soporte.', 'chat', 'CONSULTA'),
	('sofia@nexa.com', 'El pedido llegó con retraso y la atención fue lenta.', 'whatsapp', 'RECLAMO'),
	('diego@bluewave.com', 'Muy buena atención comercial y opciones claras.', 'web', 'VENTAS'),
	('carmen@mediclinic.com', 'El equipo solucionó mi incidencia rápidamente.', 'portal', 'SOPORTE')
) AS datos(email, contenido, canal, categoria)
JOIN clientes ON clientes.email = datos.email
WHERE NOT EXISTS (SELECT 1 FROM comentarios WHERE comentarios.contenido = datos.contenido);

INSERT INTO tiempos_atencion (cliente_id, comentario_id, tiempo_minutos, operador)
SELECT comentarios.cliente_id, comentarios.id, datos.minutos, 'Seed'
FROM (VALUES
	('El servicio fue rápido y amable.', 12.0),
	('Necesito una actualización del proceso de soporte.', 21.0),
	('El pedido llegó con retraso y la atención fue lenta.', 34.0),
	('Muy buena atención comercial y opciones claras.', 15.0),
	('El equipo solucionó mi incidencia rápidamente.', 10.0)
) AS datos(contenido, minutos)
JOIN comentarios ON comentarios.contenido = datos.contenido
WHERE NOT EXISTS (SELECT 1 FROM tiempos_atencion WHERE tiempos_atencion.comentario_id = comentarios.id);

INSERT INTO analisis_nlp (comentario_id, idioma, cantidad_palabras, palabras_limpias, palabras_frecuentes, categoria_detectada, confianza)
SELECT comentarios.id, 'es', datos.cantidad, datos.palabras, datos.frecuentes, comentarios.categoria, 0.95
FROM (VALUES
	('El servicio fue rápido y amable.', 6, '["servicio", "rápido", "amable"]'::jsonb, '["servicio", "rápido", "amable"]'::jsonb),
	('Necesito una actualización del proceso de soporte.', 8, '["necesito", "actualización", "proceso", "soporte"]'::jsonb, '["soporte", "proceso"]'::jsonb),
	('El pedido llegó con retraso y la atención fue lenta.', 9, '["pedido", "llegó", "retraso", "atención", "lenta"]'::jsonb, '["atención", "retraso"]'::jsonb),
	('Muy buena atención comercial y opciones claras.', 7, '["buena", "atención", "comercial", "opciones", "claras"]'::jsonb, '["atención", "comercial"]'::jsonb),
	('El equipo solucionó mi incidencia rápidamente.', 7, '["equipo", "solucionó", "incidencia", "rápidamente"]'::jsonb, '["equipo", "incidencia"]'::jsonb)
) AS datos(contenido, cantidad, palabras, frecuentes)
JOIN comentarios ON comentarios.contenido = datos.contenido
WHERE NOT EXISTS (SELECT 1 FROM analisis_nlp WHERE analisis_nlp.comentario_id = comentarios.id);
