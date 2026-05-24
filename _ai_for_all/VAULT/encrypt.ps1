# encrypt.ps1 — Шифрует variables.json в variables.json.enc (AES-256-GCM)
# Использует crypto.js (Node.js)
# Требует: Node.js

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$cryptoJs = Join-Path -LiteralPath $scriptDir -ChildPath "crypto.js"
$plainFile = Join-Path -LiteralPath $scriptDir -ChildPath "variables.json"
$encFile = Join-Path -LiteralPath $scriptDir -ChildPath "variables.json.enc"

if (-not (Test-Path -LiteralPath $plainFile)) {
    Write-Error "Файл $plainFile не найден"
    exit 1
}

$password = Read-Host -Prompt "Введи мастер-пароль для шифрования" -AsSecureString
$Bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($Bstr)
[System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($Bstr)

try {
    cmd /c "node `"$cryptoJs`" encrypt $plainPassword < `"$plainFile`" > `"$encFile`""
    if ($LASTEXITCODE -eq 0) { Write-Host "Зашифровано: $encFile" -ForegroundColor Green }
    else { throw "node exit code $LASTEXITCODE" }
} catch {
    Write-Error "Ошибка шифрования: $_"
    exit 1
}
