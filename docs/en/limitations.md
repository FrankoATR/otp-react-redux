# System Technical Limitations

Although **Urbano Libre** effectively integrates weather alerts into OTP-generated routes, there are several limitations arising from both the system's architecture and external dependencies.

!!! warning "Geographic accuracy"
    Open-Meteo requires **exact coordinates** to return meaningful data. If any OTP-generated node lacks valid coordinates, reliable weather information will not be available at that point.

!!! note "Sampling density"
    The number of requests to Open-Meteo depends on the number of **nodes** from OTP. Long routes may suffer from sparse sampling, while short ones might skip relevant data due to insufficient distance.

!!! danger "External dependencies"
    If the Open-Meteo API is down or OTP is not running properly, **no route or weather data will be shown**. The system depends entirely on **network connectivity** and both external services.

!!! info "Only weather conditions"
    The system **does not account** for elevation, lighting, sidewalk conditions, or traffic risks. Only weather alerts are provided as environmental guidance.

!!! example "Cultural and geographic constraints"
    The tool requires GTFS data. In regions where GTFS is unavailable, local transport feeds must be manually created. So far, it has only been tested using data from **Michigan, USA**.
