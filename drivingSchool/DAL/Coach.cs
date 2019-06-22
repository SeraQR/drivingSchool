using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using drivingSchool.Model;

namespace drivingSchool.DAL {
	public class Coach {

		static public void UpdateNewStudent () {
			SQL.start ("select * from coach");
			DataRowCollection Rows = SQL.Set.Tables[0].Rows;
			for (int i = 0; i < Rows.Count; ++i) {
				Rows[i]["newstudent"] = Convert.ToInt32 (Rows[i]["newstudent"]) + 1;
			}
			SQL.End ();
		}
		static public void UpdateNewMessage (string receiver) {
			SQL.start ($"select * from coach where name = '{receiver}'");
			DataRowCollection Rows = SQL.Set.Tables[0].Rows;
			Rows[0]["unread"] = Convert.ToInt32 (Rows[0]["unread"]) + 1;
			SQL.End ();
		}
		static public string getPersonalInformation (string account) {
			string data = "";
			string command = $"select * from coach where account = '{account}'";

			SqlDataReader read = SQL.getData (command);
			data = read["name"] + "=" + read["description"] + "=" + read["address"] + "=" + read["newstudent"] + "=" + read["unread"];
			SQL.Dispose ();
			return data;
		}

		static public void initZero (string account, string info) {
			string command = $"update coach set {info} = 0 where account = '{account}' or name = '{account}'";
			SQL.Excute (command);
		}

		public static string getAllInfo (string type) {
			string data = "";
			SqlDataReader read = SQL.getReader ("select * from coach");
			if (type == "all") {
				while (read.Read ()) {
					data += read["account"] + "=" + read["name"] + "=" + read["address"] + "=" + read["description"] + ";";
				}

			} else {
				while (read.Read ()) {
					data += read["name"] + ";";
				}
			}

			return data;
		}

	}
}
