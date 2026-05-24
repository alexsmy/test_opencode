# decrypt.ps1 — Расшифровывает variables.json.enc в variables.json (AES-256-GCM)
# Использует crypto.js (Node.js)
# Требует: Node.js

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$cryptoJs = Join-Path -LiteralPath $scriptDir -ChildPath "crypto.js"
$plainFile = Join-Path -LiteralPath $scriptDir -ChildPath "variables.json"
$encFile = Join-Path -LiteralPath $scriptDir -ChildPath "variables.json.enc"

if (-not (Test-Path -LiteralPath $encFile)) {
    Write-Error "Файл $encFile не найден"
    exit 1
}

$password = Read-Host -Prompt "Введи мастер-пароль для расшифровки" -AsSecureString
$Bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($Bstr)
[System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($Bstr)

try {
    cmd /c "node `"$cryptoJs`" decrypt $plainPassword < `"$encFile`" > `"$plainFile`""
    if ($LASTEXITCODE -eq 0) { Write-Host "Расшифровано: $plainFile" -ForegroundColor Green }
    else { throw "node exit code $LASTEXITCODE" }
} catch {
    Write-Error "Ошибка расшифровки: $_"
    exit 1
}
