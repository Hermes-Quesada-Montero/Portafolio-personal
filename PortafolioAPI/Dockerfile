# 1. Usar la imagen oficial de .NET para compilar tu código (Uso .NET 9 basado en tu entorno)
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# 2. Copiar los archivos y restaurar dependencias
COPY ["PortafolioAPI.csproj", "./"]
RUN dotnet restore "PortafolioAPI.csproj"

# 3. Copiar el resto y publicar la versión de producción
COPY . .
RUN dotnet publish "PortafolioAPI.csproj" -c Release -o /app/publish

# 4. Crear la imagen final super ligera para que Render la corra
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# 5. Render usa el puerto 8080 por defecto
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# 6. Encender la aplicación
ENTRYPOINT ["dotnet", "PortafolioAPI.dll"]
