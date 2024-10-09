using System;
using System.Linq;

using var db = new CaseflowContext();

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapPost("/createstudent", (Student studentInfo) =>
{
    db.Add(new Student {Name = studentInfo.Name, Teacher = studentInfo.Teacher} );
    db.SaveChanges();
    return TypedResults.Created("New Student Added");
});  

app.MapPost("/createblock", (Block blockInfo) =>
{
    db.Add(new Block {Time = blockInfo.Time, Grade = blockInfo.Grade} );
    db.SaveChanges();
    return TypedResults.Created("New Block Added");
});  


app.Run();

