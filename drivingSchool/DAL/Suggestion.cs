using drivingSchool.Model;

namespace drivingSchool.DAL
{
    public class Suggestion
    {
        static public bool insertSuggestion(SuggestionModel s)
        {
            string command = $"insert into suggestion (account,content) values ('{s.account}','{s.content}')";
            return SQL.Excute(command);
        }
    }
}