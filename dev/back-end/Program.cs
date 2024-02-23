using System.Reflection;
using ConvenienceStore.Infra.IoC;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
    options.CustomSchemaIds(currentClass =>
    {
        var returnedValue = currentClass.Name;

        if (returnedValue.EndsWith("VM"))
            returnedValue = returnedValue.Replace("VM", string.Empty);

        return returnedValue;
    });
});

builder.Services.AddControllers();

builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseInfrastructure();

app.MapControllers();

app.Run();