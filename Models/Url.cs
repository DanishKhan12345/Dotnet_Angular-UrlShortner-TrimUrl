namespace TrimUrlApi.Models
{
    public class Url
    {
        public int Id { get; set; }
        public required string LongUrl { get; set; }
        public required string UrlCode { get; set; }
        public required DateTime CreatedAt { get; set; }

        public IReadOnlyList<Analytics> Analytics { get; set; } = null!;
    }
}
// This code defines a Url class with properties for Id, LongUrl, UrlCode, and CreatedAt.