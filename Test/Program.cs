using Data_Access_Layer.Context;
using System;
using System.Linq;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            ApplicationContext db = new ApplicationContext();

            db.Carts.Select(p => p.Products);
        }
    }
}
