using System;
using System.Data.SqlClient;
using drivingSchool.Model;

namespace drivingSchool.DAL {
	public class Message {
		static public string getMessageList (string type, string name, string top) {
			string data = "";
			string command = "";
			if (type == "onlyNew") {
				command = $"select top {Convert.ToInt32(top)} * from message where receiver = '{name}' order by addTime desc";
			} else {
				command = $"select * from message where receiver = '{name}'";
			}
			SqlDataReader read = SQL.getReader (command);
			while (read.Read ()) {
				data += read["sender"] + "=" + read["content"] + "=" + read["addTime"] + ";";
			}
			Coach.initZero (name, "unread");
			SQL.Dispose ();
			return data;
		}
		static public bool insertMessage (MessageModel message) {
			string command = $"insert into message (sender,receiver,content) values ('{message.sender}','{message.receiver}','{message.content}')";
			if (SQL.Excute (command)) {
				Coach.UpdateNewMessage (message.receiver);
				return true;
			}
			return false;
		}
		static public string getSentMessage (string sender) {
			string data = "";
			SqlDataReader read = SQL.getReader ($"select * from message where sender = '{sender}'");
			while (read.Read ()) {
				data += read["receiver"] + "=" + read["content"] + "=" + read["addTime"] + ";";
			}
			return data;
		}
	}
}
