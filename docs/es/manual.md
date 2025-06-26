# Manual de usuario

Esta sección está dirigida a **personas no técnicas** que desean comprender cómo utilizar **Urbano Libre** para consultar rutas con condiciones climáticas en tiempo real o histórico.

## ¿Qué puedes hacer?

- Consultar el clima a lo largo del trayecto.  
- Elegir la fecha y la hora que desees analizar.  
- Visualizar alertas con el estado del clima.

---

## Ejemplos de uso en computadora

### 1. Generar una ruta paso a paso

Al abrir la aplicación encontrarás un **panel** en el lado izquierdo y, a la derecha, un **mapa interactivo** que ocupa la mayor parte de la pantalla.

![Pantalla inicial](../assets/first-view.jpg)

!!! tip "Explorar el mapa"
    Mantén presionado el botón izquierdo (o derecho) del ratón y arrastra para mover el mapa.

- **Punto de origen**  
Haz clic derecho sobre la ubicación deseada en el mapa y selecciona **“From here”**.

![Ingreso de localización](../assets/location-map-input.jpg)

- **Punto de destino**  
Repite el proceso, pero elige **“To here”**.

!!! info "Entrada manual"
    Si lo prefieres, en la esquina superior izquierda hay un formulario para ingresar **coordenadas** directamente.  
    ![Ingreso de coordenadas](../assets/cordinate-input.jpg)

Después de definir origen y destino se mostrarán **tarjetas** con información del clima en cada lugar.

![Mapa con tarjetas](../assets/card-map-1.jpg)

En el panel izquierdo selecciona el **modo de transporte** que quieres analizar.

![Opciones de itinerario](../assets/itinerary-options.jpg)

Elige el itinerario que más te interese.

![Selección de itinerario](../assets/itinerary-selection.jpg)

!!! warning
    No siempre se muestran todos los itinerarios disponibles; depende de la configuración del planificador.

Se despliega el detalle de la ruta y, si el modo es **bicicleta** o **caminata**, aparece un mensaje recomendándote si es seguro utilizarla según el clima.

![Itinerario seleccionado](../assets/itinerary-selected.jpg)

Con un itinerario activo se generan **más tarjetas** a lo largo del trayecto.

![Mapa con tarjetas](../assets/card-map-2.jpg)

---

### 2. Cambiar la fecha y la hora

Pulsa el **botón 📅** situado en la parte superior derecha.

![Botón de fecha y hora](../assets/datetime-button.jpg)

Selecciona el día y la hora para conocer el clima en ese momento.  
Puedes planificar **hasta 14 días en el futuro** o consultar días anteriores.

![Formulario de fecha y hora](../assets/datetime-form.jpg)

---

### 3. Información de la tarjeta

Cada tarjeta tiene **tres estados** posibles:

| Estado | Ejemplo |
|--------|---------|
| Información encontrada | ![Tarjeta info](../assets/card-info-1.jpg) |
| Buscando datos | ![Tarjeta buscando](../assets/card-searching.jpg) |
| Sin datos | ![Tarjeta sin datos](../assets/card-no-data.jpg) |

Detalle de campos:

1. **Clima general** — Puede mostrar:  
   ☀️ Clear sky / 🌤 Partly cloudy / ☁️ Overcast / 🌫 Fog / 🌦 Drizzle / 🌧 Rain / ❄️ Snow / ⛈ Thunderstorm / 🔍 Unknown
2. **Temperatura** (°C).
3. **Velocidad del viento** (km/h).
4. **Dirección del viento** (grados).

---

## Preguntas frecuentes

**¿Qué pasa si no hay información del clima?**  
Probablemente estés consultando más allá de los **14 días permitidos** o la API de Open‑Meteo no dispone de datos para esa zona.

**¿Por qué no veo marcadores?**  
Verifica tu conexión a internet. Si persiste, espera a que el servicio de Open‑Meteo restablezca la respuesta.