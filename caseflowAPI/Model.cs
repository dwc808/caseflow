using caseFlow.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace caseFlow.Models
{
    public class Student
    {
        public int Id {get; set;}
        public string? Name {get; set;}
        public string? Teacher {get; set;}
    }

    public class Block
    {
        public int Id {get; set;}
        public string? Time {get; set;}
        public string? Grade {get; set;}
    }
}

public class caseFlowDb : IdentityDbContext<IdentityUser>
{
    public caseFlowDb(DbContextOptions options) : base(options) { }
    public DbSet<Student> Students {get; set; } = null!;
    public DbSet<Block> Blocks {get; set; } = null!;
}