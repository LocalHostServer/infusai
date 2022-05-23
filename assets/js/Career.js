$(function () {

    $("#btncareersubmit").click(function () {

        let fname = $("#txtfname").val();
        let lname = $("#txtlname").val();
        let mobileno = $("#txtmobile").val();
        let email = $("#txtemail").val();
        var fileUpload = $("#fileUpload").get(0);

        if (fname == "" || fname == null)
        {
            showalert("Please Enter First Name",null)
            return;
        }

        if (lname == "" || lname == null)
        {

            showalert("Please Enter Last Name", null)
            return;
        }
        if (mobileno == "" || mobileno == null)
        {

            showalert("Please Enter Mobile No", null)
            return;

        }
        if (email == "" || email == null) {

            showalert("Please Enter Email Address", null)

            return;
        }
        if (fileUpload.files.length == 0) {

            showalert("Please Upload Pdf file", null)
            return;
        }

        if ((fname == "" || fname == null) && (lname == "" || lname == null) && (mobileno == "" || mobileno == null) && (email == "" || email == null) && (fileUpload == "" || fileUpload == null))
        {
            var files = fileUpload.files;

            // Create FormData object  
            var fileData = new FormData();

            // Looping over all files and add it to FormData object  
            for (var i = 0; i < files.length; i++) {
                fileData.append(files[i].name, files[i]);
            }

            // Adding one more key to FormData object  
            fileData.append('fname', fname);
            fileData.append('lname', lname);
            fileData.append('mobileno', mobileno);
            fileData.append('email', email);

            $.ajax({
                url: 'http://localhost:38384/api/Service/Sendemailwithattachment',
                type: "POST",
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: fileData,
                success: function (result) {
                    if (result == "success") {
                        clearForm();
                        $("#exampleModal").modal('hide');

                    }
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });

        }

       
        
    })
   
    function clearForm()
    {
       $("#txtfname").val("");
       $("#txtlname").val("");
       $("#txtmobile").val("");
       $("#txtemail").val("");
        $("#exampleModal").hide();

    }

})
function validateForm() {

    

}
function CheckExtension() {
    var fileUpload = $("#fileUpload").get(0);
    if (!fileUpload.files[0].type == "application/pdf")
    {
        showalert("only pdf file is allowed", "fileUpload")
        return false;
    }

    if (fileUpload.files[0].size > 1010000) {
        showalert("Only 1 mb file can upload", "fileUpload")
        return false;
    }
}
function ValidateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($("#txtemail").val())) {
        return (true)
    }
    showalert("You have entered an invalid email address!", "txtemail")
    return (false)
}
function ValidateMobile() {
    if (/^[7-9][0-9]{0,10}$/.test($("#txtmobile").val())) {
        return (true)
    }
  
    showalert("You have entered an invalid Mobile no","txtmobile")
    return (false)
}

function showalert(msg,clearcontrolval) {
    $("#spninfo").text(msg);
    $('#InfoModal').modal('show');
    if (clearcontrolval != null) {

        $("#" + clearcontrolval + "").val("");
    }
    
}
