<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Receipt_Poc.aspx.cs" Inherits="POC.tot_thailand" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/css/select2.min.css"/>
	
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/js/all.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.full.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css"/>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css"/>

     
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
    <link rel="stylesheet" href=" https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/11.0.0/css/fabric.min.css"/>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300"/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous"/>
	
    
    <title>Infusai Thailand</title>
    <style>
		 .t-pill {
            position: absolute;
            left: 3px;
            bottom: 3px;
            font-size: 12px;
            color: rgba(0,0,0,.5);
            background: #f8f9fa;
            padding: 4px 10px;
            border-radius: 5px;
        }

        body, h1, h2, h3, h4, h5, h6, p, select, input, textarea, button, i, td, th {
            font-size: 12.5px !important;
        }

        /*.table td, .table th {
            padding: .35rem;
            height: 30px;
            line-height: 30px;
        }*/

		label {
		  background-color: darkblue;
		  color: white;
		  /*padding: 2rem;*/
		  font-family: sans-serif;
		  border-radius: 3.5rem;
		  width: 7rem;
		  height: 7rem;
		  /*line-height: 10rem;*/
		  cursor: pointer;
			 padding-top:1.5rem;
		  /*margin-top: 1rem;*/
		}
    </style>

    
</head>
<body style="height: 172px">

    
    <form id="form1" runat="server">

        

        <div class="container-fluid" style="position: fixed; z-index: 999; top: 0; left: 0;">
		<div class="row">
			<div class="col-md-12 text-center" style=" background: #f2f2f2;"><img src="https://infusai.com/assets/images/infusai-logo.svg" alt="Infusai" style="width: 240px; margin-left: 80px; margin-top:10px; margin-bottom:10px;" /></div>
		</div>
	</div>

         
        <div class="container-fluid" id="filediv" runat="server">
		<div class="row">
			<div class="col-sm-12 col-12" style="height: 60vh; text-align: center; vertical-align: middle; padding-top:40vh; padding-bottom:60vh; vertical-align: middle;">
				<input runat="server" type="file" id="FileUpload1" onchange="previewFile()" hidden/>
				<label for="FileUpload1"><i class="fa fa-3x fa-camera"></i><br/>Choose file</label><br/>
			</div>
		</div>	
	</div>

        <div class="container-fluid" runat="server" id="imgdiv" style="display: none;">
		<div class="row">
			<div class="col-sm-12 col-md-12 col-lg-12 " style="height: 60vh; text-align: center; vertical-align: middle; padding-top:15vh; vertical-align: middle;">
				 <img src="" runat="server" id="preimg" class="img-thumbnail" style="width: 90vw; margin-bottom: 10px; "  alt="Image preview..."/>
                			
			    <button class="btn btn-danger" onclick="backclick();" style="font-family: sans-serif;border-radius: 0rem;width: 8rem; height: 2.5rem; cursor: pointer;margin:0; padding:0;"><i class="fa fa-2x fa-undo" style="vertical-align: middle;"></i> Cancel</button>
				
				<button runat="server" id="btnprocessnow"  onserverclick="btnprocessnow_Click"  class="btn btn-success" style="font-family: sans-serif;border-radius: 0rem;width: 8rem; height: 2.5rem; cursor: pointer;margin:0; padding:0;"><i class="fa fa-2x fa-object-group" style="vertical-align: middle;"></i> Process now</button>
		</div>
			
		</div>	
		
	</div>

        <div class="container-fluid" runat="server" id="tablediv" style="margin-top: 80px; display: none;">
		<div class="row">
			<div id="back1"  runat="server" class="col-sm-12 col-12" style="height: 50px; line-height: 50px;cursor:pointer;" onclick="showhidediv()">
                <i class="fa fa-arrow-alt-circle-left"></i> Back</a></div>
			
		</div>
		<div class="row overflow-auto">
			<asp:Table ID="Table1" class="table " runat="server">
            <asp:TableHeaderRow><asp:TableHeaderCell>Quantity</asp:TableHeaderCell><asp:TableHeaderCell>Description</asp:TableHeaderCell><asp:TableHeaderCell>Price</asp:TableHeaderCell><asp:TableHeaderCell>Loyalty</asp:TableHeaderCell></asp:TableHeaderRow>
        </asp:Table>
		</div>
	</div>

    
    </form>

   <script>
       var imgurl = '';
       function previewFile() {
           
           var preview = document.getElementById('preimg');
           var imgdiv = document.getElementById('imgdiv');
           var filediv = document.getElementById('filediv');
           
           var file = document.getElementById('FileUpload1').files[0];
           var reader = new FileReader();

           reader.onloadend = function () {
               imgurl = reader.result;
               preview.src = imgurl;
               imgdiv.style.display = "block";
               filediv.style.display = "none";
               //preview.style.display = "block";
              // preview1.src = imgurl;
           }

           if (file) {
               reader.readAsDataURL(file);
           } else {
              // preview.src = "";
              // preview1.src = "";
           }
       }

       function showhidediv()
       {
           document.getElementById('filediv').style.display = "block";
           document.getElementById('tablediv').style.display = "none";
          // document.getElementById('preimg').style.display = "none";

       }
      
       function backclick() {
           document.getElementById('filediv').style.display = "block";
           document.getElementById('tablediv').style.display = "none";
           document.getElementById('imgdiv').style.display = "none";
           // document.getElementById('preimg').style.display = "none";

       }

   </script>
    
    
</body>
</html>
