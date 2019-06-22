using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using drivingSchool.DAL;

namespace drivingSchool.BLL.ajax {
	/// <summary>
	/// coach 的摘要说明
	/// </summary>
	public class coach : IHttpHandler {

		public void ProcessRequest (HttpContext context) {
			context.Response.ContentType = "text/plain";
			string key = context.Request.Form["key"];
			switch (key) {
				case "getPersonalInformation":
					getPersonalInformation (context);
					break;
				case "getAllInformation":
					getAllInformation (context);
					break;
			}

		}
		public static void getPersonalInformation (HttpContext context) {
			string account = context.Request.Form["account"];
			string data = "";
			data = Coach.getPersonalInformation (account);
			context.Response.Write (data);
		}
		public static void getAllInformation (HttpContext context) {
			string type = context.Request.Form["type"];
			context.Response.Write (Coach.getAllInfo (type));
		}
		public bool IsReusable {
			get {
				return false;
			}
		}
	}
}
