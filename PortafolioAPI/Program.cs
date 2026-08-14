using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Conexión a la base de datos
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// =========================================================
// EL ESCUDO ANTI-CORS DEFINITIVO
// =========================================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// =========================================================
// ACTIVACIÓN (Debe ir exactamente en esta línea)
// =========================================================
app.UseCors("CorsPolicy"); 

app.UseAuthorization();
app.MapControllers();

app.MapGet("/", () => "¡API de Hermes conectada y lista!");

app.Run();