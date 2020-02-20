using System;
using System.Collections.Generic;
using System.Text;

namespace Web.Bll.Utils
{
    public class Selector
    {
        private Selector() { }
        public int beginCount { get; set; }
        public int count { get; set; }
        public int totalPages { get; private set; }
        private static int range = 20;
        private static object key = new object();
        
        public static Selector CreateSelector(int page, int totalItems)
        {
            lock (key)
            {
                Selector selector = new Selector();
                int usePage = page;
                usePage = page <= 0 ? 1 : page;

                selector.beginCount = (usePage * range) - range;
                selector.count = range;

                double drange = range;
                double dpageCount = totalItems / drange;
                int ipageCount = totalItems / range;

                if (dpageCount - ipageCount > 0)
                {
                    ipageCount++;
                }
                selector.totalPages = ipageCount;
                return selector;
            }
        }
    }
}
