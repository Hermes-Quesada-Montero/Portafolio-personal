using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Conexión a la base de datos
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

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
// NUEVO: CREAR LAS TABLAS EN SUPABASE AUTOMÁTICAMENTE
// =========================================================
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        // Esto ejecuta las migraciones y crea las tablas que faltan
        context.Database.Migrate(); 
    }
    catch (Exception ex)
    {
        Console.WriteLine("Ocurrió un error al migrar la base de datos: " + ex.Message);
    }
}

// Activación del CORS
app.UseCors("CorsPolicy"); 

app.UseAuthorization();
app.MapControllers();

app.MapGet("/", () => "¡API conectada, lista y con base de datos migrada!");

app.Run();