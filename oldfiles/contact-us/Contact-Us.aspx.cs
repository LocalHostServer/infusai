using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Mail;
using System.Net;
using System.Configuration;


public partial class contact_us_Contact_Us : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        SendEmailToIspl();
        SendEmailToUser();
    }

    private void SendEmailToIspl()
    {
        string Tomail = "vinesh@infusai.com";
        string ccmail = "info@infusai.com";

        string mailbody = "<span  style=\"font-family:'Trebuchet MS'; font-size='10px'\">Dear Sir/Mam,</span><br><br>";
        mailbody += "<span style=\"font-family:'Trebuchet MS'; font-size='10px'\">Please find below contact details.</span><br><br>";
        mailbody += "<span style=\"font-family:'Trebuchet MS'; font-size='10px'\">Company Name: " + Request.Form["cname"].ToString() + " <br/><br/>Contact Name: " + Request.Form["fname"].ToString() + " <br/><br/>Email ID: " + Request.Form["cemail"].ToString() + " <br/><br/>Contact No: " + Request.Form["phone"].ToString() + " <br/><br/>Country: " + Request.Form["c_country"].ToString() + " <br/><br/>Message: " + Request.Form["message"].ToString() + " <br/><br/></span>";
        //if (Request.Form["services"].ToString() != "")
        //{
        //    mailbody += "<span style=\"font-family:'Trebuchet MS'; font-size='10px'\">Services: " + Request.Form["services"].ToString() + " <br/><br/> No. of employees: " + Request.Form["noemployees"].ToString() + " <br/><br/>Yearly Budget: " + Request.Form["budget"].ToString() + " <br/><br/> Closure Time: " + Request.Form["closure"].ToString() + " <br/><br/></span>";
        //}
        mailbody += "<span style=\"font-family:'Trebuchet MS'; font-size='10px'\">Best Regards<br>" + Request.Form["fname"].ToString() + "</span><br><br><br>";

        SendEMail(ConfigurationManager.AppSettings["FromEmail"].ToString(), Tomail.ToString(), "Contact form - Details", mailbody.ToString(), ccmail.ToString(), true, ConfigurationManager.AppSettings["FromEmail"].ToString());
    }

    private void SendEmailToUser()
    {
        string Tomail = Request.Form["cemail"];
        string ccmail = "";

        string mailbodyDetails = "<span style=\"font-family:'Trebuchet MS'; font-size='10px'\">Dear " + Request.Form["fname"].ToString() + ",</span><br><br>";
        mailbodyDetails += "<span  style=\"font-family:'Trebuchet MS'; font-size='10px'\">Thanks for connecting us. Our digital transformation experts will get in touch with you soon.</span><br><br>";
        mailbodyDetails += "<span style=\"font-family:'Trebuchet MS'; font-size='10px'\">Thanks,<br>Team Infusai</span><br><br><br>";

        SendEMail(ConfigurationManager.AppSettings["FromEmail"].ToString(), Tomail.ToString(), "Contact form", mailbodyDetails.ToString(), ccmail.ToString(), false, ConfigurationManager.AppSettings["FromEmail"].ToString());
		
		Response.Write("success");
    }


    private static void SendEMail(String StrFromEmail, String StrToEmail, String StrSubject, String StrBody, String StrCcEmail, Boolean AddCC, String StrReplyEmail)
    {
        SmtpClient smtp = new SmtpClient();
        MailMessage mailMessage = new MailMessage();

        //   smtp.UseDefaultCredentials = false;
        smtp.EnableSsl = false;
        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
        mailMessage.From = new MailAddress(StrFromEmail);
        String[] StrToEmail1 = StrToEmail.Split(',');
        for (int i = 0; i < StrToEmail1.Length; i++)
        {
            mailMessage.To.Add(StrToEmail1[i]);
        }

        if (StrReplyEmail != "")
        {
            mailMessage.ReplyTo = new MailAddress(StrReplyEmail);
        }


        if (AddCC == true)
        {
            String[] StrCCMails = StrCcEmail.Split(',');
            for (int i = 0; i < StrCCMails.Length; i++)
            {
                mailMessage.CC.Add(StrCCMails[i]);
            }
        }
        mailMessage.IsBodyHtml = true;
        mailMessage.Subject = StrSubject;
        mailMessage.Body = StrBody;

        try
        {
            smtp.Send(mailMessage);
        }
        catch (SmtpException ex)
        {
            throw (ex);
        }
        catch (Exception ex)
        {
            throw (ex);
        }
        finally
        {
            mailMessage.Dispose();
        }
    }

}
