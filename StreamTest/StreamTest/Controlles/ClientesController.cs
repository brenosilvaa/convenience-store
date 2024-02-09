using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using StreamTest.Enums;
using StreamTest.Models;
using StreamTest.Results;

namespace StreamTest.Controlles;

[Route("[controller]")]
[ApiController]
public class ClientesController : ControllerBase
{
    private static ConcurrentBag<StreamWriter> _clients;

    static ClientesController()
    {
        _clients = new ConcurrentBag<StreamWriter>();

        // Task.Run(async () =>
        // {
        //     while (true)
        //     {
        //         var cliente = new Cliente
        //         {
        //             Id = 1,
        //             Nome = "Hahaha",
        //             Agora = DateTime.Now
        //         };
        //         await EnviarEvento(cliente, EventoEnum.Insert);
        //         await Task.Delay(5000);
        //     }
        // });
    }

    [HttpPost]
    public IActionResult Post(Cliente cliente)
    {
        //Fazer o Insert
        EnviarEvento(cliente, EventoEnum.Insert);

        return Ok();
    }

    [HttpPut]
    public IActionResult Put(Cliente cliente)
    {
        //Fazer o Update
        EnviarEvento(cliente, EventoEnum.Update);

        return Ok();
    }

    private static async Task EnviarEvento(object dados, EventoEnum evento)
    {
        foreach (var client in _clients)
        {
            string jsonEvento = string.Format("{0}\n", JsonSerializer.Serialize(new { dados, evento }));
            await client.WriteAsync(jsonEvento);
            await client.FlushAsync();
        }
    }

    private static async Task EnviarVideo(byte[] bytes)
    {
        foreach (var client in _clients)
        {
            var ms = new MemoryStream();
            ms.Write(bytes);

            var base64 = Convert.ToBase64String(bytes);
            // string jsonEvento = string.Format("{0}\n", JsonSerializer.Serialize(new { dados, evento }));
            await client.WriteAsync(base64);
            await client.FlushAsync();
        }
    }

    [HttpGet]
    [Route("stream")]
    public IActionResult Stream()
    {
        return new PushStreamResult(OnStreamAvailable, "video/event-stream", HttpContext.RequestAborted);
        // return new PushStreamResult(OnStreamAvailable, "text/event-stream", HttpContext.RequestAborted);
    }

    private void OnStreamAvailable(Stream stream, CancellationToken requestAborted)
    {
        var wait = requestAborted.WaitHandle;
        var client = new StreamWriter(stream);
        _clients.Add(client);

        wait.WaitOne();

        StreamWriter ignore;
        _clients.TryTake(out ignore);
    }

    [HttpPost("input")]
    public IActionResult Input([FromForm] IFormFile file)
    {
        var ms = new MemoryStream();
        file.CopyTo(ms);
        

        EnviarVideo(ms.ToArray());

        return Ok();
    }
}