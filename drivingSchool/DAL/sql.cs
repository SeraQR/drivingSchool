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
    public class SQL
    {
        #region 定义数据库成员
        private static string ConnectionStringSQL = ConfigurationManager.ConnectionStrings["drivingSchool"].ConnectionString;
        static public SqlCommand Com;
        static public SqlConnection Con;
        static public SqlDataReader Read;
        static public SqlDataAdapter Ada;
        static public SqlCommandBuilder CB;
        static public DataSet Set;
        #endregion

        #region 释放数据库对象
        static public void Dispose()
        {
            Con.Close();
            Com.Dispose();
            Con.Dispose();
        }
        #endregion

        static public void End()
        {
            Ada.Update(Set);
            Ada.Dispose();
            CB.Dispose();
            Set.Dispose();
        }
        static public void start(string command)
        {
            Ada = new SqlDataAdapter(command, ConnectionStringSQL);
            Ada.MissingSchemaAction = MissingSchemaAction.AddWithKey;
            CB = new SqlCommandBuilder(Ada);
            Set = new DataSet();
            Ada.Fill(Set);
        }
        static public bool Excute(string Command)
        {
            Con = new SqlConnection(ConnectionStringSQL);
            Con.Open();
            if (Con.State == ConnectionState.Open)
            {
                Com = new SqlCommand(Command, Con);
            }
            try
            {
                if (Com.ExecuteNonQuery() > 0)
                {
                    Dispose();
                    return true;
                }
                else
                {
                    Dispose();
                    return false;
                }
            }
            catch
            {
                Dispose();
                return false;
            }
        }
        static public SqlDataReader getData(string Command)
        {
            Con = new SqlConnection(ConnectionStringSQL);
            Con.Open();
            if (Con.State == ConnectionState.Open)
            {
                Com = new SqlCommand(Command, Con);
            }
            Read = SQL.Com.ExecuteReader();
            if (Read.HasRows)
            {
                Read.Read();
                return Read;
            }
            return null;
        }

        static public SqlDataReader getReader(string Command)
        {
            Con = new SqlConnection(ConnectionStringSQL);
            Con.Open();
            if (Con.State == ConnectionState.Open)
            {
                Com = new SqlCommand(Command, Con);
            }
            return SQL.Com.ExecuteReader();
        }
    }
}