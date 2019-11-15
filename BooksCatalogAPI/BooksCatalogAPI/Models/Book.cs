using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BooksCatalogAPI.Models
{
    public class Book
    {
         [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        // [BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")]
        public string Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("subTitle")]
        public string SubTitle { get; set; }

        [BsonElement("author")]
        public string Author { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("price")]
        public double Price { get; set; }

        [BsonElement("quantity")]
        public int Quantity { get; set; }

        [BsonElement("language")]
        public string Language { get; set; }

        [BsonElement("coverImageUrl")]
        public string CoverImageUrl { get; set; }

        [BsonElement("createdDate")]
        public DateTime CreatedDate { get; set; }

        [BsonElement("updatedDate")]
        public DateTime UpdatedDate { get; set; }

        [BsonElement("isFree")]
        public bool isFree { get; set; }

        [BsonElement("isAvailable")]
        public bool isAvailable { get; set; }

        [BsonElement("status")]
        public string Status { get; set; }

        [BsonElement("bookLocationPath")]
        public string BookLocationPath { get; set; }
    }
}
