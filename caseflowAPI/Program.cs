using System;
using System.Security.Claims;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using caseFlow.Models;
using Microsoft.VisualBasic;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Microsoft.AspNetCore.Mvc;
using NetMQ.Sockets;
using NetMQ;
using System.Text.Json;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                        policy  =>
                        {
                            policy.WithOrigins("http://localhost:5173",
                                                "http://localhost:5173/")
                                .AllowAnyHeader()
                                .AllowCredentials()
                                .AllowAnyMethod();
                        });
});


builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<caseFlowDb>();



builder.Services.AddAuthorization();

var connectionString = builder.Configuration.GetConnectionString("caseFlow") ?? "Data Source=caseFlow.db";

builder.Services.AddSqlite<caseFlowDb>(connectionString);

var app = builder.Build();  

app.UseCors(MyAllowSpecificOrigins);

app.MapIdentityApi<IdentityUser>();



/*current endpoints - will need to be divvied up into other files later */
app.MapGet("/currentuser", (HttpContext httpContext) =>
{
    var user = httpContext.User;
    if (user.Identity?.IsAuthenticated == true)
    {
        var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userName = user.Identity.Name;
        return Results.Ok(new { UserId = userId, UserName = userName });
    }
    return Results.Unauthorized();
});

//get list of students
app.MapGet("/students", async (caseFlowDb db) => await db.Students.ToListAsync());

//get list of blocks
app.MapGet("/blocks", async (caseFlowDb db) => await db.Blocks.ToListAsync());

//create a student
app.MapPost("/addstudent", async (caseFlowDb db, Student student) =>
{
    await db.Students.AddAsync(student);
    await db.SaveChangesAsync();
    return Results.Created($"/student/{student.Id}", student);
});

//create a block
app.MapPost("/addblock", async (caseFlowDb db, Block block) =>
{
    await db.Blocks.AddAsync(block);
    await db.SaveChangesAsync();
    return Results.Created($"/block/{block.Id}", block);
});

//connect a student and block
app.MapPost("/schedulestudents/{bid}", async (caseFlowDb db, Student student, int bid) =>
{
    var stu = await db.Students.FindAsync(student.Id);
    var blk = await db.Blocks.FindAsync(bid);

    if (stu != null && blk != null)
    {
        stu.Blocks.Add(blk);
        await db.SaveChangesAsync();
    }
});

//connect a student and block
app.MapPost("/scheduleastudent/{sid}", async (caseFlowDb db, Block block, int sid) =>
{
    var blk = await db.Blocks.FindAsync(block.Id);
    var stu = await db.Students.FindAsync(sid);

    if (stu != null && blk != null)
    {
        blk.Students.Add(stu);
        await db.SaveChangesAsync();
    }
});

//get a student by id
app.MapGet("/student/{id}", async (caseFlowDb db, int id) => await db.Students.FindAsync(id));

//get a block by id
app.MapGet("/block/{id}", async (caseFlowDb db, int id) => await db.Blocks.FindAsync(id));

//update a student
app.MapPut("/student/{id}", async (caseFlowDb db, Student updatestudent, int id) =>
{
    var student = await db.Students.FindAsync(id);
    if (student is null) return Results.NotFound();
    student.Name = updatestudent.Name;
    student.Teacher = updatestudent.Teacher;
    await db.SaveChangesAsync();
    return Results.NoContent();
});


//delete a student
app.MapDelete("/student/{id}", async (caseFlowDb db, int id) =>
{
    var student = await db.Students.FindAsync(id);
    if (student is null)
    {
        return Results.NotFound();
    };
    db.Students.Remove(student);
    await db.SaveChangesAsync();
    return Results.Ok();
});

///////////Routes for reaching out to microservices via ZeroMQ////////////

//generate a graph


//run the schedule assistant


//report outcomes
app.MapPost("/outcomes", ([FromBody]Object request) =>
{
    string req = JsonSerializer.Serialize(request);
    Console.WriteLine(request);
    using (var client = new RequestSocket())
    {
        client.Connect("tcp://localhost:5558");
        client.SendFrame(req);
        var msg = client.ReceiveFrameString();
        return msg;
    }
});

//get outcomes
app.MapGet("/outcomes", () =>
{
    Dictionary<string, string> req = 
    new Dictionary<string, string>();

    req.Add("Get", "2024");

    string request = JsonSerializer.Serialize(req);
    
    using (var client = new RequestSocket())
    {
        client.Connect("tcp://localhost:5558");
        client.SendFrame(request);
        var msg = client.ReceiveFrameString();
        return msg;
    }
});

//generate lesson plan



app.Run();

