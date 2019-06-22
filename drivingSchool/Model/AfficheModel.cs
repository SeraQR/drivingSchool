using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace drivingSchool.Model {
	public class AfficheModel {
		public string account;
		public string content;
		public string name;
		public AfficheModel (string account, string content, string name) {
			this.account = account;
			this.content = content;
			this.name = name;
		}
	}
}
