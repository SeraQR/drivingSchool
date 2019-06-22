using System;
using System.Data.SqlClient;
using drivingSchool.Model;

namespace drivingSchool.DAL {
	public class Student {

		static public bool InsertAccount (string table, AccountModel user) {
			string command = $"insert into {table} (account,password,question,answer,name,address,description) values ('{user.account}','{user.password}','{user.question}','{user.answer}','{user.name}','{user.address}','{user.description}')";
			bool result = SQL.Excute (command);
			if (result) {
				Coach.UpdateNewStudent ();
			}
			return result;
		}
		static public string getPersonalInformation (string account) {
			string data = "";
			string command = $"select * from student where account = '{account}'";

			SqlDataReader read = SQL.getData (command);
			data = read["name"] + "=" + read["description"] + "=" + read["address"];
			SQL.Dispose ();
			return data;
		}
		static public string getStudentList (string type, string account, string top) {
			string data = "";
			string command = "";
			if (type == "onlyNew") {
				command = $"select top {Convert.ToInt32(top)} * from student order by addTime desc";
			} else {
				command = "select * from student";
			}
			SqlDataReader read = SQL.getReader (command);
			while (read.Read ()) {
				data += read["account"] + "=" + read["name"] + "=" + read["address"] + "=" + read["description"] + "=" + read["addTime"] + ";";
			}
			Coach.initZero (account, "newstudent");
			SQL.Dispose ();
			return data;
		}
	}
}
