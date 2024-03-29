<!doctype html>
<html>

<head>
    <title>Checkout Demo</title>
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1" />
    <script src="https://www.paynimo.com/paynimocheckout/client/lib/jquery.min.js" type="text/javascript"></script>
</head>

<body>

   <!-- <button id="btnSubmit">Make a Payment</button>-->

    <script type="text/javascript" src="https://www.paynimo.com/paynimocheckout/server/lib/checkout.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
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

            $(document).off('click', '#btnSubmit').on('click', '#btnSubmit', function (e) {
                e.preventDefault();

                var configJson = {
                    'tarCall': false,
                    'features': {
                        'showPGResponseMsg': true,
                        'enableAbortResponse': true,
                        'enableExpressPay': true,
                        'enableNewWindowFlow': true    //for hybrid applications please disable this by passing false
                    },
                    'consumerData': {
                        'deviceId': 'WEBSH2',	//possible values 'WEBSH1' and 'WEBSH2'
                        'token': 'b4cd8d63c394cf30234bcb6e27fc4a96109cd362cde6b6d564cddea9e06540866987ab13b1d0a4c8f962c336353388cb446b666277310b6fd5d89cadc3634f21',
                        'returnUrl': 'https://www.infusai.com/test/pgResponse.html',    //merchant response page URL
                        'responseHandler': handleResponse,
                        'paymentMode': 'all',
                        'merchantLogoUrl': 'https://www.paynimo.com/CompanyDocs/company-logo-vertical-light.png',  //provided merchant logo will be displayed
                        'merchantId': 'L3348',
                        'currency': 'INR',
                        'consumerId': 'c964634',
                        'consumerMobileNo': '9876543210',
                        'consumerEmailId': 'test@test.com',
                        'txnId': '1634021239773',   //Unique merchant transaction ID
                        'items': [{
                            'itemId': 'test',
                            'amount': '10',
                            'comAmt': '0'
                        }],
                        'customStyle': {
                            'PRIMARY_COLOR_CODE': '#45beaa',   //merchant primary color code
                            'SECONDARY_COLOR_CODE': '#FFFFFF',   //provide merchant's suitable color code
                            'BUTTON_COLOR_CODE_1': '#2d8c8c',   //merchant's button background color code
                            'BUTTON_COLOR_CODE_2': '#FFFFFF'   //provide merchant's suitable color code for button text
                        }
                    }
                };

                $.pnCheckout(configJson);
                if (configJson.features.enableNewWindowFlow) {
                    pnCheckoutShared.openNewWindow();
                }
            });
        });
    </script>
</body>

</html>