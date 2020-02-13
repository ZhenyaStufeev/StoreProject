using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data_Access_Layer.Entities.Store
{
    [Table("tblFilters")]
    public class Filter
    {
        public int Id { get; set; }
        [/*ForeignKey("FilterNameOf"), Key,*/ Column(Order = 0)]
        public int FilterNameId { get; set; }
        public virtual FilterName FilterNameOf { get; set; }

        [/*ForeignKey("FilterValueOf"),Key,*/ Column(Order = 1)]
        public int FilterValueId { get; set; }
        public virtual FilterValue FilterValueOf { get; set; }

        [/*ForeignKey("ProductOf"), Key,*/ Column(Order = 2)]
        public int ProductId { get; set; }
        public virtual Product ProductOf { get; set; }
    }
}
