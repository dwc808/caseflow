using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

public class CaseflowContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Block> Blocks { get; set; }
    public DbSet<Student> Students { get; set; }

    public string DbPath { get; }

    public CaseflowContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "caseflow.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}

public class User
{
    public int UserId {get; set;}
    public string Email {get; set;}
    public string HashedPassword {get; set;}
}

public class Student
{
    public int StudentId {get; set;}
    public string Name {get; set;}
    public string Teacher {get; set;}
}

public class Block
{
    public int BlockId {get; set;}
    public string Time {get; set;}
    public string Grade {get; set;}
}