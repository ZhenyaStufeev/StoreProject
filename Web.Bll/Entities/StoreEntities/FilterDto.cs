namespace Web.Bll.Entities.StoreEntities
{
    public class FilterViewModel
    {
        public int FilterNameId { get; set; }
        public string FilterName { get; set; }

        public int FilterValueId { get; set; }
        public string FilterValue { get; set; }
    }

    public class FilterRequest
    {
        public int categoryId { get; set; }
        public int[] filtersId { get; set; }
        int page { get; set; }
    }
}