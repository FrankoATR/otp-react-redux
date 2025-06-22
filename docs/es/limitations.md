# Limitaciones técnicas del sistema

A pesar de que el sistema **Urbano Libre** implementa con éxito la integración de alertas climáticas sobre rutas generadas por OTP, existen algunas limitaciones inherentes al entorno tecnológico y la disponibilidad de datos.

!!! warning "Precisión geográfica"
    La API de Open-Meteo requiere **coordenadas exactas** para devolver datos útiles. Si algún nodo generado por OTP no tiene coordenadas válidas, no se podrá obtener información del clima confiable en ese punto.

!!! note "Frecuencia de muestreo"
    El número de consultas a Open-Meteo depende de los **nodos** generados por OTP. En rutas muy largas se pierde precisión entre puntos; en rutas muy cortas puede omitirse información por falta de separación mínima.

!!! danger "Servicios externos"
    Si la API de Open-Meteo está caída o hay error en OTP, **no se podrán mostrar rutas ni clima**. El sistema depende completamente de la **conectividad** y del buen funcionamiento de ambos servicios.

!!! info "Solo condiciones climáticas"
    El sistema **no considera** elevación, iluminación, tráfico, ni el estado físico de las rutas. Solo utiliza el clima como variable de alerta.

!!! example "Limitaciones culturales y geográficas"
    La herramienta requiere datos GTFS. En zonas donde estos no están disponibles, será necesario generarlos manualmente. Hasta ahora solo se ha probado con datos del área de **Michigan (EE.UU.)**.
