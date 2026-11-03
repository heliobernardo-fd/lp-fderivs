# Script de Deploy Automatizado do Projeto LP-FDERIVS

$tokensFile = Join-Path $PSScriptRoot "tokens.txt"
$token = ""
if (Test-Path $tokensFile) {
    $content = Get-Content $tokensFile -Raw
    if ($content -match '(vcp_[a-zA-Z0-9]+)') {
        $token = $matches[1]
    }
}

$projectName = "lp-fderivs"

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "🚀 Publicando projeto DEDICADO: [$projectName] na Vercel" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

if ($token) {
    cmd.exe /c "npx vercel --prod --name $projectName --token $token --yes"
} else {
    cmd.exe /c "npx vercel --prod --name $projectName --yes"
}
