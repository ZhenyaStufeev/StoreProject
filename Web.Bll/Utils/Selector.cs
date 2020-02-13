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
        private static int range = 20;
        public static Selector CreateSelector(int page)
        {
            Selector selector = new Selector();
            selector.beginCount = (page * range) - range;
            selector.count = range;

            return selector;
        }
    }
}
