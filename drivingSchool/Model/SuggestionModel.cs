using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace drivingSchool.Model {
	public class SuggestionModel {
		public string account;
		public string content;
		public SuggestionModel (string account, string content) {
			this.account = account;
			this.content = content;
		}
	}
}
