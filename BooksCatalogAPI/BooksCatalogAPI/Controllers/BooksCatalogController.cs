using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using BooksCatalogAPI.Helpers;
using BooksCatalogAPI.Infra;
using BooksCatalogAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
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
        }

        [HttpPost("addbook", Name = "AddBook")]
        public ActionResult<Book> AddBook()
        {
            var coverImageName = SaveImageToCloudAsync(Request.Form.Files[0]).GetAwaiter().GetResult();

            var book = new Book()
            {
                Title = Request.Form["title"],
                SubTitle = Request.Form["subTitle"],
                Author = Request.Form["author"],
                Description = Request.Form["description"],
                Price = Double.Parse(Request.Form["price"]),
                Quantity = Int32.Parse(Request.Form["quantity"]),
                Language = Request.Form["language"],
                CoverImageUrl = coverImageName,
                CreatedDate = DateTime.Now.Date,
                UpdatedDate = DateTime.Now.Date,
                isFree = Boolean.Parse(Request.Form["isFree"]),
                isAvailable = true,
                Status = "Active",
                BookLocationPath = Request.Form["bookLocationPath"]
            };

            //var book = new Book()
            //{
            //    Title = "MyBooks"
            //};
            dbContext.BooksCatalog.InsertOne(book);  // saving to mongo            
            return book;
        }

        [HttpPost("updatebook", Name = "UpdateBook")]
        public ActionResult<Book> UpdateBook()
        {
            var coverImageName = string.Empty;
            if (Request.Form.Files.Count > 0)
            {
                coverImageName = SaveImageToCloudAsync(Request.Form.Files[0]).GetAwaiter().GetResult();
            }
            else
            {
                coverImageName = Request.Form["coverImageUrl"];
            }

            FilterDefinition<Book> filter = "{ Id:"+ Request.Form["id"] + " }";

           // UpdateDefinition<Book> update = "{ $set: { x: 1 } }";


          // var update = Builders<Book>.Update.Set(x => x.Title ,Request.Form["title"]);

            var bookId = Request.Form["id"];

            var book = new Book()
            {
                Title = Request.Form["title"],
                SubTitle = Request.Form["subTitle"],
                Author = Request.Form["author"],
                Description = Request.Form["description"],
                Price = Double.Parse(Request.Form["price"]),
                Quantity = Int32.Parse(Request.Form["quantity"]),
                Language = Request.Form["language"],
                CoverImageUrl = coverImageName,               
                UpdatedDate = DateTime.Now,
                isFree = Boolean.Parse(Request.Form["isFree"]),
                isAvailable = true,
                Status = Request.Form["status"],
                BookLocationPath = Request.Form["bookLocationPath"]
            };
            // dbContext.BooksCatalog.UpdateOne(filter, update);  // saving to mongo     
            //dbContext.BooksCatalog.ReplaceOne(x=>x.Id== bookId,book);
            dbContext.BooksCatalog.DeleteOne(x => x.Id == bookId);
            dbContext.BooksCatalog.InsertOne(book);
            //var result = dbContext.BooksCatalog.ReplaceOne(x => x.Id == bookId, book);
            return book;
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetBookById")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<Book>> GetBookById(string id)
        {

            var builder = Builders<Book>.Filter;

            var filter = builder.Eq("Id", id);

            var result = await dbContext.BooksCatalog.FindAsync(filter);

            var item = result.FirstOrDefault();

            if (item == null)

            {

                return NotFound(); //Not found , Status code 404

            }

            else

            {

                return Ok(item); //Found , status code 200

            }

        }

        [AllowAnonymous]
        [HttpDelete("DeleteBook/{id}", Name = "DeleteById")]
        public DeleteResult DeleteById(string id)
        {

            var result = this.dbContext.BooksCatalog.DeleteOne(book => book.Id == id);
            return result;           
        }

        //[AllowAnonymous]
        //[HttpGet("Search/{keyword}", Name = "SearchBooks")]
        //public async Task<ActionResult<List<Book>>> SearchBooks(string keyword)
        //{
        //    try
        //    {
        //        IMongoCollection<Book> collection = this.dbContext.BooksCatalog as IMongoCollection<Book>;
        //        var result = await collection.FindAsync(
        //            book => book.Title.ToLower().Contains(keyword.ToLower())
        //            || book.SubTitle.ToLower().Contains(keyword.ToLower())
        //            || book.Author.ToLower().Contains(keyword.ToLower())
        //            || book.Language.ToLower().Contains(keyword.ToLower())
        //            );
        //        return result.ToList();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}


        [NonAction]
        private async Task<string> SaveImageToCloudAsync(IFormFile image)
        {
            var imageName = $"{Guid.NewGuid()}_{Request.Form.Files[0].FileName}";
            var tempFile = Path.GetTempFileName();
            using (FileStream fs = new FileStream(tempFile, FileMode.Create))
            {
                await image.CopyToAsync(fs);
            }

            var imageFile = Path.Combine(Path.GetDirectoryName(tempFile), imageName);
            System.IO.File.Move(tempFile, imageFile);
            StorageAccountHelper storageHelper = new StorageAccountHelper();
            storageHelper.StorageConnectionString = config.GetConnectionString("StorageConnection");
            var fileUri = await storageHelper.UploadFileToBlobAsync(imageFile, "ebooksgalleryimages");

            System.IO.File.Delete(imageFile);

            //fileUri = fileUri + "?sv=2019-02-02&ss=bfq&srt=sco&sp=rwdlacup&se=2019-11-15T15:22:16Z&st=2019-11-06T07:22:16Z&spr=https&sig=Bshl%2Bplh44Wu3w4e8XIGemZgLhamR%2FrFXdDvIqJdkbg%3D";
            return fileUri;
        }
    }
}