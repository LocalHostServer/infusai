<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pgResponse.aspx" %>

<!doctype html>
<html>

<head>
    <title>Checkout Demo</title>
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1" />
    <script src="https://www.paynimo.com/paynimocheckout/client/lib/jquery.min.js" type="text/javascript"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>
</head>

<body>

   <!-- <button id="btnSubmit">Make a Payment</button>-->
<% Response.Redirect("https://cordlifecssuat.powerappsportals.com/payment-instrument/payment_response/?res=" + Request.Form[0]); %>
    <script type="text/javascript" src="https://www.paynimo.com/paynimocheckout/server/lib/checkout.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            debugger;
            var ciphertext = CryptoJS.MD5(Request.Form[0]);
            function handleResponse(res) {
                debugger;
                if (typeof res != 'undefined' && typeof res.paymentMethod != 'undefined' && typeof res.paymentMethod.paymentTransaction != 'undefined' && typeof res.paymentMethod.paymentTransaction.statusCode != 'undefined' && res.paymentMethod.paymentTransaction.statusCode == '0300') {
                    // success block
                    document.write(res.paymentMethod.paymentTransaction.statusCode);
                } else if (typeof res != 'undefined' && typeof res.paymentMethod != 'undefined' && typeof res.paymentMethod.paymentTransaction != 'undefined' && typeof res.paymentMethod.paymentTransaction.statusCode != 'undefined' && res.paymentMethod.paymentTransaction.statusCode == '0398') {
                    // initiated block
                } else {
                    // error block
                }
            };

        });
    </script>
</body>

</html>