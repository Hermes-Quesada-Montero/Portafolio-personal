using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTodo", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// ¡ESTE ORDEN ES CRÍTICO!
app.UseCors("PermitirTodo"); // Debe ir después de Build() y antes de MapControllers()

app.UseAuthorization();
app.MapControllers();
app.MapGet("/", () => "¡API de Hermes conectada y lista!");

app.Run();