using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Web.Bll.Services.Interfaces;

namespace Web.Bll.Services
{
    public class ApiService : IApiService
    {
        private HttpClient client { get; set; }
        private static string apiKeyNovaPoshta = "afc442fb0867b57699c6a619a91acd37";
        private static string novaRef = "https://api.novaposhta.ua/v2.0/json/";
        public ApiService(HttpClient client)
        {
            this.client = client;
        }

        public async Task<object> novaFindCitites(string cityKeyWord)
        {
            if (cityKeyWord == null)
                cityKeyWord = "";

            cityKeyWord = cityKeyWord.ToLower();

            var request = new NovaCitiesRequest()
            {
                calledMethod = "getCities",
                modelName = "Address",
                apiKey = apiKeyNovaPoshta,
                methodProperties = new NovaProps()
                {
                    FindByString = cityKeyWord,
                    Limit = 20
                }
            };
            var jsonRequest = await Task.Run(() => JsonConvert.SerializeObject(request));
            var httpContent = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(novaRef, httpContent);
            string value = await response.Content.ReadAsStringAsync();
            return value;
        }

        public async Task<object> novaGetWarehouses(string refCity)
        {
            if (refCity == null)
            {
                refCity = "";
            }

            var request = new NovaCitiesRequest()
            {
                calledMethod = "getWarehouses",
                modelName = "AddressGeneral",
                apiKey = apiKeyNovaPoshta,
                methodProperties = new NovaProps()
                {
                    CityRef = refCity
                }
            };

            var jsonRequest = await Task.Run(() => JsonConvert.SerializeObject(request));
            var httpContent = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(novaRef, httpContent);
            string value = await response.Content.ReadAsStringAsync();
            return value;
        }
    }
}

public class NovaCitiesRequest
{
    [JsonProperty("modelName")]
    public string modelName { get; set; }

    [JsonProperty("calledMethod")]
    public string calledMethod { get; set; }

    [JsonProperty("methodProperties")]
    public NovaProps methodProperties { get; set; }

    [JsonProperty("apiKey")]
    public string apiKey { get; set; }

}

public class NovaProps
{
    [JsonProperty("FindByString")]
    public string FindByString { get; set; }

    [JsonProperty("Limit")]
    public int Limit { get; set; }

    [JsonProperty("CityRef")]
    public string CityRef { get; set; }
}