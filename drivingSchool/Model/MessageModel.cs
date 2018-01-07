using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace drivingSchool.Model
{
    public class MessageModel
    {
        /* 发送方 */
        public string sender;

        /* 接收方 */
        public string receiver;

        /* 发送内容 */
        public string content;
        public MessageModel(string sender,string receiver,string content)
        {
            this.sender = sender;
            this.receiver = receiver;
            this.content = content;
        }
    }
}