using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace drivingSchool.Model
{
    public class AccountModel
    {
        /* 账号 */
        public string account;

        /* 密码 */
        public string password;

        /* 密保问题 */
        public string question;

        /* 密保答案 */
        public string answer;

        /* 昵称 */
        public string name;

        /* 地址 */
        public string address;

        /* 个人描述 */
        public string description;

        public AccountModel(string account, string password, string name, string question = null, string answer = null, string address = null, string description = null)
        {
            this.account = account;
            this.password = password;
            this.name = name;
            this.question = question;
            this.answer = answer;
            this.address = address;
            this.description = description;
        }

    }
}