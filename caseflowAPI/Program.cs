using System;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using caseFlow.Models;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<caseFlowDb>();

builder.Services.AddAuthorization();

var connectionString = builder.Configuration.GetConnectionString("caseFlow") ?? "Data Source=caseFlow.db";

builder.Services.AddSqlite<caseFlowDb>(connectionString);

var app = builder.Build();  

app.MapIdentityApi<IdentityUser>();

/*current endpoints - will need to be divvied up into other files later */

//get list of students
app.MapGet("/students", async (caseFlowDb db) => await db.Students.ToListAsync());

//create a student
app.MapPost("/addstudent", async (caseFlowDb db, Student student) =>
{
    await db.Students.AddAsync(student);
    await db.SaveChangesAsync();
    return Results.Created($"/student/{student.Id}", student);
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

app.Run();

