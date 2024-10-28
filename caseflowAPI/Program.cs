using System;
using System.Security.Claims;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using caseFlow.Models;
using Microsoft.VisualBasic;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                        policy  =>
                        {
                            policy.WithOrigins("http://localhost:5173")
                                .AllowAnyHeader();
                        });
});

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<caseFlowDb>();

builder.Services.AddAuthorization();

var connectionString = builder.Configuration.GetConnectionString("caseFlow") ?? "Data Source=caseFlow.db";

builder.Services.AddSqlite<caseFlowDb>(connectionString);

var app = builder.Build();  

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
}).RequireAuthorization();

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

//get a student by id
app.MapGet("/student/{id}", async (caseFlowDb db, int id) => await db.Students.FindAsync(id));

//update a student
app.MapPut("/student/{id}", async (caseFlowDb db, Student updatestudent, int id) =>
{
    var student = await db.Students.FindAsync(id);
    if (student is null) return Results.NotFound();
    student.Name = updatestudent.Name;
    student.Teacher = updatestudent.Teacher;
    await db.SaveChangesAsync();
    return Results.NoContent();
})
.RequireAuthorization();

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

app.UseCors(MyAllowSpecificOrigins);

app.Run();

