namespace TrimUrlApi.Models
{
    public class Url
    {
        public int Id { get; set; }
        public required string LongUrl { get; set; }
        public required string UrlCode { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
