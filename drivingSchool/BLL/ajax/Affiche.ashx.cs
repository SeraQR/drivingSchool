using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using drivingSchool.DAL;
using drivingSchool.Model;


namespace drivingSchool.BLL.ajax
{
    /// <summary>
    /// affiche 的摘要说明
    /// </summary>
    public class affiche : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string type = context.Request.Form["type"];
            string account = context.Request.Form["account"];
            string content = context.Request.Form["content"];
            string name = context.Request.Form["name"];
            if (type == "set")
            {
                AfficheModel affiche = new AfficheModel(account, content,name);
                if (Affiche.setAffiche(affiche))
                {
                    context.Response.Write("true");
                }
                else
                {
                    context.Response.Write("false");
                }
            }else{
                string data = Affiche.getAffiche();
                context.Response.Write(data);
            }

        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}