using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using drivingSchool.DAL;
using drivingSchool.Model;

namespace drivingSchool.BLL.ajax
{
    /// <summary>
    /// message 的摘要说明
    /// </summary>
    public class message : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string key = context.Request.Form["key"];
            switch (key)
            {
                case "insertMessage":
                    insertMessage(context);
                    break;
                case "getMessageList":
                    getMessageList(context);
                    break;
                case "getSentMessage":
                    getSentMessage(context);
                    break;
            }
            
        }
        public static void insertMessage(HttpContext context)
        {
            string sender = context.Request.Form["sender"];
            string receiver = context.Request.Form["receiver"];
            string content = context.Request.Form["content"];

            MessageModel message = new MessageModel(sender, receiver, content);
            if (Message.insertMessage(message))
            {
                context.Response.Write("true");
            }
            else
            {
                context.Response.Write("false");
            }
        }
        public static void getMessageList(HttpContext context)
        {
            string type = context.Request.Form["type"];
            string name = context.Request.Form["name"];
            string top = context.Request.Form["top"];
            string data = Message.getMessageList(type, name, top);
            context.Response.Write(data);
        }
        public static void getSentMessage(HttpContext context)
        {
            string name = context.Request.Form["name"];
            context.Response.Write(Message.getSentMessage(name));
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