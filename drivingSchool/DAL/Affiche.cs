using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

using System.Data;
using System.Data.SqlClient;

using drivingSchool.Model;

namespace drivingSchool.DAL
{
    public class Affiche
    {
        
        public static bool setAffiche(AfficheModel affiche)
        {
            string command = $"insert into affiche (account,content,name) values ('{affiche.account}','{affiche.content}','{affiche.name}')";
            return SQL.Excute(command);
        }
        public static string getAffiche()
        {
            string data = "";
            string command = $"select top 1 * from affiche order by addTime desc";
            SqlDataReader read = SQL.getData(command);
            data = $"公告：{read["content"]} - {read["name"]} 教练";
            SQL.Dispose();
            return data;
        }
    }
}