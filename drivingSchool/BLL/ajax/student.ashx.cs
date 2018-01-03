using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using drivingSchool.DAL;

namespace drivingSchool.BLL.ajax
{
    /// <summary>
    /// student 的摘要说明
    /// </summary>
    public class student : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string key = context.Request.Form["key"];
            switch (key)
            {
                case "getPersonalInformation":
                    getPersonalInformation(context);
                    break;
                case "getStudentList":
                    getStudentList(context);
                    break;
            }
            
        }
        public static void getPersonalInformation(HttpContext context)
        {
            string account = context.Request.Form["account"];
            string data = "";
            data = Student.getPersonalInformation(account);
            context.Response.Write(data);
        }
        public static void getStudentList(HttpContext context)
        {
            string type = context.Request.Form["type"];
            string account = context.Request.Form["account"];
            string top = context.Request.Form["top"];
            string data = Student.getStudentList(type, account, top);
            context.Response.Write(data);
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