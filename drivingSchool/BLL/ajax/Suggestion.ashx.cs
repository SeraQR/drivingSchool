using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using drivingSchool.DAL;
using drivingSchool.Model;

namespace drivingSchool.BLL.ajax {
	/// <summary>
	/// suggestion 的摘要说明
	/// </summary>
	public class suggestion : IHttpHandler {

		public void ProcessRequest (HttpContext context) {
			context.Response.ContentType = "text/plain";
			string account = context.Request.Form["account"];
			string content = context.Request.Form["content"];
			SuggestionModel s = new SuggestionModel (account, content);
			context.Response.Write (Suggestion.insertSuggestion (s));
		}

		public bool IsReusable {
			get {
				return false;
			}
		}
	}
}
