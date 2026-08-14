using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Habilitar los controladores
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTodo", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("PermitirTodo");

// 2. Activar las rutas de los controladores
app.MapControllers();

app.MapGet("/", () => "¡API de Hermes conectada y lista!");

app.Run();