using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using drivingSchool.DAL;
using drivingSchool.Model;

namespace drivingSchool.BLL.ajax {
	/// <summary>
	/// account 的摘要说明
	/// </summary>
	public class account : IHttpHandler {

		public void ProcessRequest (HttpContext context) {
			context.Response.ContentType = "text/plain";
			string key = context.Request.Form["key"];
			switch (key) {
				case "changeInfo":
					changeInfo (context);
					break;
				case "changePwd":
					changePwd (context);
					break;
				case "hasInfo":
					hasInfo (context);
					break;
				case "getQuestionAnswer":
					getQuestionAnswer (context);
					break;
				case "register":
					register (context);
					break;
			}

		}
		public static void changeInfo (HttpContext context) {
			string table = context.Request.Form["table"];
			string account = context.Request.Form["account"];
			string address = context.Request.Form["address"];
			string description = context.Request.Form["description"];
			if (Account.changeInfo (table, account, address, description)) {
				context.Response.Write ("true");
			} else {
				context.Response.Write ("false");
			}
		}
		public static void changePwd (HttpContext context) {
			string table = context.Request.Form["table"];
			string account = context.Request.Form["account"];
			string password = context.Request.Form["password"];
			if (Account.changePwd (table, account, password)) {
				context.Response.Write ("true");
			} else {
				context.Response.Write ("false");
			}
		}
		public static void hasInfo (HttpContext context) {
			string type = context.Request.Form["type"];
			string table = context.Request.Form["table"];

			string account = context.Request.Form["account"];
			string password = context.Request.Form["password"];
			string name = context.Request.Form["name"];

			AccountModel user = new AccountModel (account, password, name);

			try {
				if (Account.isExist (table, type, user)) {
					context.Response.Write ("true");
				} else {
					context.Response.Write ("false");
				}
			} catch {
				context.Response.Write ("false");
			}
		}
		public static void getQuestionAnswer (HttpContext context) {
			string table = context.Request.Form["table"];
			string account = context.Request.Form["account"];
			string data = "";
			data = Account.getQuestionAnswer (table, account);
			context.Response.Write (data);
		}
		public static void register (HttpContext context) {
			string table = context.Request.Form["table"];
			string account = context.Request.Form["account"];
			string password = context.Request.Form["password"];
			string question = context.Request.Form["question"];
			string answer = context.Request.Form["answer"];
			string name = context.Request.Form["name"];
			string address = context.Request.Form["address"];
			string description = context.Request.Form["description"];

			AccountModel user = new AccountModel (account, password, name, question, answer, address, description);

			try {
				if (Student.InsertAccount (table, user)) {
					context.Response.Write ("true");
				} else {
					context.Response.Write ("false");
				}
			} catch {
				context.Response.Write ("false");
			}
		}

		public bool IsReusable {
			get {
				return false;
			}
		}
	}
}
