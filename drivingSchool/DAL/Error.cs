using drivingSchool.Model;

namespace drivingSchool.DAL {
	public class Error {
		public static bool uploadError (ErrorModel error) {
			string command = $"insert into error (errorMessage,scriptURI,lineNumber,columnNumber,errorObj,userAgent) values ('{error.errorMessage}','{error.scriptURI}','{error.lineNumber}','{error.columnNumber}','{error.errorObj}','{error.userAgent}')";
			return SQL.Excute (command);
		}
	}
}
