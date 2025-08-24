namespace TrimUrlApi.Models
{
    public class Analytics
    {
        public int Id { get; set; }
        public DateTime ClickedTime { get; set; }
        public required string UrlCode { get; set; }

        /// Foreign key to the Url table
        public int UrlId { get; set; }

        /// Navigation property to the Url
        public Url? Url { get; set; }
    }
}
