using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using drivingSchool.DAL;
using drivingSchool.Model;

namespace drivingSchool.BLL.ajax
{
    /// <summary>
    /// Error 的摘要说明
    /// </summary>
    public class Monitor : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string errorMessage = context.Request.Form["errorMessage"];
            string scriptURI = context.Request.Form["scriptURI"];
            string lineNumber = context.Request.Form["lineNumber"];
            string columnNumber = context.Request.Form["columnNumber"];
            string errorObj = context.Request.Form["errorObj"];
            string userAgent = context.Request.Form["userAgent"];
            ErrorModel error = new ErrorModel(errorMessage,scriptURI,lineNumber,columnNumber,errorObj,userAgent);
            context.Response.Write(Error.uploadError(error));
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