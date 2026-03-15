$ErrorActionPreference = 'Stop'
$base = 'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1'
$apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c'
$stamp = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$userEmail = "copilot.user.$stamp@test.com"
$adminEmail = "copilot.admin.$stamp@test.com"
$password = 'Qwerty123!'
function CallApi($method, $path, $token=$null, $body=$null) {
  $headers = @{ apiKey = $apiKey }
  if ($token) { $headers.Authorization = "Bearer $token" }
  if ($null -ne $body) {
    return Invoke-RestMethod -Uri ($base + $path) -Method $method -Headers $headers -ContentType 'application/json' -Body ($body | ConvertTo-Json -Depth 10)
  }
  return Invoke-RestMethod -Uri ($base + $path) -Method $method -Headers $headers
}
Write-Output '--- REGISTER USER ---'
$regUser = CallApi 'POST' '/register' $null @{ name='Copilot User'; email=$userEmail; password=$password; passwordRepeat=$password; role='user'; profilePictureUrl='https://example.com/u.png'; phoneNumber='081234567890' }
Write-Output ("user register: " + $regUser.status)
Write-Output '--- REGISTER ADMIN ---'
$regAdmin = CallApi 'POST' '/register' $null @{ name='Copilot Admin'; email=$adminEmail; password=$password; passwordRepeat=$password; role='admin'; profilePictureUrl='https://example.com/a.png'; phoneNumber='081234567891' }
Write-Output ("admin register: " + $regAdmin.status)
Write-Output '--- LOGIN BOTH ---'
$userLogin = CallApi 'POST' '/login' $null @{ email=$userEmail; password=$password }
$adminLogin = CallApi 'POST' '/login' $null @{ email=$adminEmail; password=$password }
$userToken = $userLogin.token
$adminToken = $adminLogin.token
Write-Output ("user login: " + $userLogin.status)
Write-Output ("admin login: " + $adminLogin.status)
Write-Output '--- USER PROFILE ---'
$userProfile = CallApi 'GET' '/user' $userToken
Write-Output ("user profile role: " + $userProfile.data.role)
Write-Output '--- GENERATE PAYMENT METHODS ---'
$genPm = CallApi 'POST' '/generate-payment-methods' $userToken @{}
Write-Output ("generate payment methods: " + $genPm.status)
$paymentMethods = CallApi 'GET' '/payment-methods' $userToken
$paymentMethodId = $paymentMethods.data[0].id
Write-Output ("payment methods count: " + $paymentMethods.data.Count)
Write-Output ("payment method id: " + $paymentMethodId)
Write-Output '--- ADD CART ---'
$activityId = (CallApi 'GET' '/activities').data[0].id
$addCart = CallApi 'POST' '/add-cart' $userToken @{ activityId=$activityId }
Write-Output ("add cart: " + $addCart.status)
$carts = CallApi 'GET' '/carts' $userToken
$cartId = $carts.data[0].id
Write-Output ("cart count: " + $carts.data.Count)
Write-Output ("cart id: " + $cartId)
Write-Output '--- CREATE TRANSACTION ---'
$createTxn = CallApi 'POST' '/create-transaction' $userToken @{ cartIds=@($cartId); paymentMethodId=$paymentMethodId }
Write-Output ("create transaction: " + $createTxn.status)
$transactionId = $createTxn.data.id
Write-Output ("transaction id: " + $transactionId)
Write-Output '--- MY TRANSACTIONS ---'
$myTx = CallApi 'GET' '/my-transactions' $userToken
Write-Output ("my transactions count: " + $myTx.data.Count)
Write-Output '--- ADMIN ALL TRANSACTIONS ---'
$allTx = CallApi 'GET' '/all-transactions' $adminToken
$found = @($allTx.data | Where-Object { $_.id -eq $transactionId }).Count
Write-Output ("all transactions count: " + $allTx.data.Count)
Write-Output ("admin sees created transaction: " + $found)
Write-Output '--- UPDATE TRANSACTION STATUS ---'
$updateTxn = CallApi 'POST' ('/update-transaction-status/' + $transactionId) $adminToken @{ status='success' }
Write-Output ("update transaction status: " + $updateTxn.status)
Write-Output 'SUCCESS FLOW COMPLETED'
