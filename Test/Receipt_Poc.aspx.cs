using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace POC
{
    public partial class tot_thailand : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
           // Loaderdiv.Style.Add("display", "none");
            filediv.Style.Add("display", "block");
            tablediv.Style.Add("display", "none");
            //filediv.Visible = true;
            //tablediv.Visible = false;

        }

        protected void btnprocessnow_Click(object sender, EventArgs e)
        {
            try
            {
               // Loaderdiv.Style.Add("display", "block");
                
               // Loaderdiv.Visible = true;
               // //ScriptManager.RegisterStartupScript(Page, GetType(), "JsStatus", "showhideloader('block');", true);
               //// ClientScript.RegisterStartupScript(GetType(), "id", "showhideloader('block')", true);
               // Thread.Sleep(1000 * 60 * 1);
               // Loaderdiv.Visible = false;
               // Loaderdiv.Attributes.Add("style", "display:none");
               // ScriptManager.RegisterStartupScript(Page, GetType(), "JsStatus", "showhideloader('none');", true);
                //ClientScript.RegisterStartupScript(GetType(), "id", "showhideloader('none')", true);

                //Page.ClientScript.RegisterStartupScript(this.GetType(), "clientscript", "document.getElementById('Loaderdiv').style.visibility = 'visible';", true);
                // Loaderdiv.Visible = true;
                //Thread threadInput = new Thread(getdata);
                //threadInput.Start();

                // Loaderdiv.Visible = true;

                if (FileUpload1.PostedFile.FileName == "")
                {
                    Response.Write("<script>alert('Please Choose a file');</script>");
                   // ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('Please Choose a file')", true);
                   // Loaderdiv.Visible = false;
                    return;
                }

               
                //MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
               // ms.Write(imageBytes, 0, imageBytes.Length);
                //System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);  

                

               // byte[] buffer = new byte[Request.Files["FileUpload1"].ContentLength];
                //Request.Files["FileUpload1"].InputStream.Read(buffer, 0, buffer.Length);
                System.IO.Stream fs = FileUpload1.PostedFile.InputStream;
                System.IO.BinaryReader br = new System.IO.BinaryReader(fs);
                Byte[] bytes = br.ReadBytes((Int32)fs.Length);
                //MemoryStream ms = new MemoryStream(bytes, 0, bytes.Length);
                //ms.Write(bytes, 0, bytes.Length);
                //System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
                //image.Save(Server.MapPath("~/Images/1.jpg"));
                //preimg.ImageUrl = Server.MapPath("~/Images/1.jpg"); 

                string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
                string url = "data:image/png;base64," + base64String;                
                //preimg.Src = url;
               // preimg.ImageUrl = url;
               // preimg.setAttribute("src", url);
              //  preimg.Visible = true;
                TableRow row = new TableRow();
                Table1.Rows.Add(row);

                var client = new RestClient("https://app.nanonets.com/api/v2/OCR/Model/6789bcf7-a34f-4068-901d-5e08e3683c67/LabelFile/");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("accept", "multipart/form-data");
                request.AddHeader("Authorization", "Basic SWx1Q21hUldWMDc2RXE1SUNjWExQempCUXVBTkU2RVQ6");
                request.AddFile("file", bytes, FileUpload1.PostedFile.FileName, FileUpload1.PostedFile.ContentType);
                IRestResponse response = client.Execute(request);
                Console.WriteLine(response.Content);
                //var data = JsonConvert.SerializeObject(response.Content);
                //dynamic dynObj = JsonConvert.DeserializeObject(response.Content);
                //var JSONObj = new JavaScriptSerializer().Deserialize<Dictionary<string, string>>(response.Content);
                createTable(response);
                //filediv.Visible = false;
                //tablediv.Visible = true;
                
                tablediv.Style.Add("display", "block");
                filediv.Style.Add("display", "none");
                //Loaderdiv.Style.Add("display", "none");
                imgdiv.Style.Add("display", "none");
                //preimg1.Src = url;
                //Loaderdiv.Visible = false;
                //Page.ClientScript.RegisterStartupScript(this.GetType(), "clientscript", "document.getElementById('Loaderdiv').style.visibility = 'visible';", false);

            }
            catch (Exception ex)
            {
                //Page.ClientScript.RegisterStartupScript(this.GetType(), "clientscript", "document.getElementById('Loaderdiv').style.visibility = 'visible';", false);
               // Loaderdiv.Visible = false;
                throw new Exception(ex.Message);
            }
           

        }

        


        protected void lblupload_Click(object sender, EventArgs e)
        {

            string hello = "";
        }

        private void createTable(IRestResponse response)
        {

            dynamic data = JsonConvert.DeserializeObject(response.Content);
            //var data = JsonConvert.SerializeObject(response.Content);




            if (data != null && data.result[0].prediction.Count > 0)
            {
                // tablehtml += "<thead><tr><td><b>SR No.</b></td><td><b>Description</b></td><td><b>Price</b></td></tr></thead>";
                for (var i = 0; i < data.result[0].prediction.Count; i++)
                {
                    var tablehtml = "";
                    string call2string = "";
                    int quantity = 0;
                    TableRow row = new TableRow();
                    // string stringdata = (string)data.result[0].prediction[i].ocr_text.Value;
                    string[] tbdata = ((string)data.result[0].prediction[i].ocr_text.Value).Split(' ');
                    // var tbdata = data.result[0].prediction[i].ocr_text.Value.Split(" ");
                    //string[] tbdata = data.result[0].prediction[0].ocr_text.Value.Split(" ");

                    TableCell cell1 = new TableCell();
                    if (tbdata[0].All(char.IsDigit))
                    {
                        cell1.Text = tbdata[0];
                        quantity = Convert.ToInt32(tbdata[0]);
                    }
                    else
                    {
                        quantity = 0;
                        tablehtml = tbdata[0];
                        cell1.Text = "0";
                    }

                    row.Cells.Add(cell1);
                    TableCell cell2 = new TableCell();
                    //tablehtml += "<tr><td>" + tbdata[0] + "</td><td>";
                    for (var j = 1; j <= tbdata.Length - 2; j++)
                    {
                        tablehtml += " " + tbdata[j];
                    }
                    cell2.Text = tablehtml.Trim();
                    call2string = tablehtml.Trim();
                    row.Cells.Add(cell2);

                    TableCell cell3 = new TableCell();
                    if (tbdata.Length == 1)
                    {
                        tablehtml = "";
                    }
                    else
                    {
                        tablehtml = tbdata[tbdata.Length - 1];
                    }
                    cell3.Text = tablehtml;
                    row.Cells.Add(cell3);

                    TableCell cell4 = new TableCell();
                    if (call2string.Contains("หมแผ่นกรอบ ตรา ส 1"))//1606141027763.jpg
                    {
                        cell4.Text = Convert.ToString(quantity * 5);
                    }
                    else if (call2string.Contains("แทนมตุ้มจิ๋ว ส.ขอนแ"))//1606141030311
                    {
                        cell4.Text = Convert.ToString(quantity * 15);
                    }
                    else if (call2string.Contains("เด็กกล้วยทอมIP"))
                    {
                        cell4.Text = Convert.ToString(quantity * 25);
                    }
                    else if (call2string.Contains("แดบหมูไรมัน ตรา ศ"))
                    {
                        cell4.Text = Convert.ToString(quantity * 10);
                    }
                    //else if (call2string.Contains(""))
                    //{
                    //    cell4.Text = Convert.ToString(quantity * 20);
                    //}
                    else
                    {
                        cell4.Text = "0";
                    }

                    row.Cells.Add(cell4);


                    Table1.Rows.Add(row);
                }

            }
        }

        

    }
}