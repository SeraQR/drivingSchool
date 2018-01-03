using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

using drivingSchool.Model;

namespace drivingSchool.DAL
{
    public class Account
    {
        static public bool isExist(string table,string type,AccountModel user)
        {
            string command = null;
            if (type == "account")
            {
                command = $"select account from {table} where account = '{user.account}'";
            }else if (type == "password")
            {
                command = $"select password from {table} where password = '{user.password}'";
            }else if (type == "user")
            {
                command = $"select account from {table} where password = '{user.password}' and account = '{user.account}'";
            }else if(type == "name"){
                command = $"select name from {table} where name = '{user.name}'";
            }
            try
            {
                if (SQL.getReader(command).HasRows)
                {
                    SQL.Dispose();
                    return true;
                }
                else
                {
                    SQL.Dispose();
                    return false;
                }

            }
            catch
            {
                return false;
            }
           
        }

        static public string getQuestionAnswer(string table,string account)
        {
            string result = "";
            string command = $"select * from {table} where account = '{account}'";
            SqlDataReader read = SQL.getData(command);
            result = read["question"]+"="+read["answer"];
            SQL.Dispose();
            return result;
        }
        static public bool changePwd(string table,string account,string newPassword)
        {
            string command = $"update {table} set password = '{newPassword}' where account = '{account}'";
            return SQL.Excute(command);
        }
        static public bool changeInfo(string table,AccountModel user)
        {
            string command = $"update {table} set name = '{user.name}',address = '{user.address}',description = '{user.description}' where account = '{user.account}'";
            return SQL.Excute(command);
        }
    }
}