# Historial de cambios

Novedades, mejoras y correcciones de Netto.

## Actualización actual

### Perfil del usuario

- Añadida la edición del nombre desde Configuración.
- Añadida una vista previa del saludo antes de guardar.
- Añadida la opción de mostrar el correo en lugar del nombre.
- El nombre inicial utiliza la parte del correo anterior a `@`.
- Los perfiles con el nombre genérico «Conductor» utilizan el nombre derivado del correo en la interfaz.
- El nombre elegido se guarda en los metadatos de autenticación de Supabase.
- Añadida la sincronización del nombre con `first_name` en el perfil.
- El saludo se actualiza después de guardar, sin cerrar sesión.
- La elección del usuario se conserva al recargar la aplicación.

### Sugerencias

- El formulario de sugerencias está disponible para usuarios autenticados.
- La lista de funciones sigue siendo pública.
- Los visitantes sin sesión pueden acceder a los enlaces para iniciar sesión o solicitar acceso.
- Los envíos se realizan mediante Supabase Edge Functions y Resend.
- El servidor comprueba la sesión antes de aceptar una sugerencia.
- El servidor valida que el mensaje tenga entre 10 y 150 caracteres.
- Los mensajes se envían al destinatario configurado en el servidor.
- El correo permite responder al usuario que envió la sugerencia.
- Los errores de envío se muestran en el formulario.
- El texto de la sugerencia se conserva cuando falla el envío.

### Solicitudes de acceso

- Sustituido el envío mediante n8n por Supabase Edge Functions y Resend.
- El formulario sigue disponible sin iniciar sesión.
- Añadida la protección contra bots con Cloudflare Turnstile.
- El servidor valida el token, el hostname y la acción del formulario antes de enviar el correo.
- El botón de envío permanece desactivado hasta completar la verificación.
- La verificación se reinicia después de cada intento.
- Añadida una confirmación al enviar la solicitud.
- Las solicitudes se reciben por correo para su revisión.

### Autenticación

- Corregida la redirección al login mientras se recuperaba la sesión.
- Las rutas protegidas esperan a que termine la carga inicial de autenticación.
- Corregido el comportamiento que llevaba del historial al login y después a la página principal.
- Mejorada la gestión de errores de conexión al iniciar sesión.
- El formulario permite volver a intentar el acceso después de un error.
- El estado de carga del login se restablece cuando falla la petición.

### Liquidaciones

- Añadido el redondeo de la liquidación a dos decimales.
- Verificados los cálculos de pagos con tarjeta y efectivo.
- Añadida cobertura para viajes con céntimos.

### Rendimiento

- Añadida la carga de páginas bajo demanda.
- Añadido un indicador de carga durante la descarga de páginas.
- Separado Supabase en un archivo de JavaScript independiente.
- Reducido el tamaño del archivo principal de JavaScript.
- Eliminada la advertencia de tamaño de los archivos en la compilación verificada durante esta actualización.

### Infraestructura

- Desplegada la aplicación en Vercel.
- Configuradas las rutas para permitir acceso directo y recarga.
- Configuradas las variables del frontend en Vercel.
- Configurados los secretos de correo en Supabase.
- Verificado el dominio `netto.polataxi.es` para enviar correos.
- Configurado Turnstile para la dirección publicada de Netto.
- Retirada la configuración antigua de n8n.

### Calidad y documentación

- Adaptado el flujo de integración continua a pnpm y Node.js 22.
- Corregida la configuración inicial de Vitest.
- Añadidas pruebas para cálculos de fechas y liquidaciones.
- Añadidas pruebas para rutas protegidas.
- Añadidas pruebas para el formulario de login.
- Añadidas pruebas para la recuperación de sesión y el cierre de sesión.
- Actualizado el README con la arquitectura y el despliegue actuales.
- Actualizadas las instrucciones de instalación y variables de entorno.
- Documentado que el historial y los envíos de correo requieren conexión.