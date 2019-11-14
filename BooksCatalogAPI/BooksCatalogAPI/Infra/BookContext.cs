using BooksCatalogAPI.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;

namespace BooksCatalogAPI.Infra
{
    public class BookContext
    {
        private IConfiguration configuration;
        private IMongoDatabase database;

        public BookContext(IConfiguration configuration)
        {
            this.configuration = configuration;
            var connectionString = configuration.GetValue<string>("MongoSettings:ConnectionString");

            // MongoClientSettings settings = MongoClientSettings.FromConnectionString(connectionString);
            MongoClientSettings settings = MongoClientSettings.FromUrl(
                  new MongoUrl(connectionString)
                );
            settings.SslSettings =
              new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };

            MongoClient client = new MongoClient(settings);
            if (client != null)
            {
                this.database = client.GetDatabase(configuration.GetValue<string>("MongoSettings:Database"));
            }
        }

        public IMongoCollection<Book> BooksCatalog
        {
            get
            {
                return this.database.GetCollection<Book>("Books");
            }
        }
    }


}
