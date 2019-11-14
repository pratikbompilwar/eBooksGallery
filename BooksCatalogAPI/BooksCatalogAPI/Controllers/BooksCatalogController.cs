using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BooksCatalogAPI.Infra;
using BooksCatalogAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace BooksCatalogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class BooksCatalogController : ControllerBase
    {

        private BookContext dbContext;
        IConfiguration config;
        public BooksCatalogController(BookContext db, IConfiguration configuration)
        {
            this.dbContext = db;
            this.config = configuration;
        }

        [AllowAnonymous]
        [HttpGet("", Name = "GetBooks")]
        public async Task<ActionResult<List<Book>>> GetBooks()
        {
            var result = await this.dbContext.BooksCatalog.FindAsync<Book>(FilterDefinition<Book>.Empty);
            return result.ToList();
            //var result = (await this.dbContext.BooksCatalog.FindAsync<Book>(FilterDefinition<Book>.Empty)).ToList();
            //return result;
        }

        [HttpPost("book", Name = "AddBook")]
        public ActionResult<Book> AddBook()
        {            

            var book = new Book()
            {
                Title = "MyBook"                
            };
            dbContext.BooksCatalog.InsertOne(book);  // saving to mongo            
            return book;
        }
    }
}