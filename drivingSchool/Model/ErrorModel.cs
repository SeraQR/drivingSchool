using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace drivingSchool.Model {
	public class ErrorModel {

		/* 错误信息 */
		public string errorMessage;

		/* 出错文件 */
		public string scriptURI;

		/* 出错行号 */
		public string lineNumber;

		/* 出错列号 */
		public string columnNumber;

		/* 错误详情 */
		public string errorObj;

		/* 浏览器信息 */
		public string userAgent;

		public ErrorModel (string errorMessage, string scriptURI, string lineNumber, string columnNumber, string errorObj, string userAgent) {
			this.errorMessage = errorMessage;
			this.scriptURI = scriptURI;
			this.lineNumber = lineNumber;
			this.columnNumber = columnNumber;
			this.errorObj = errorObj;
			this.userAgent = userAgent;
		}
	}
}
