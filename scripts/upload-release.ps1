# Uploads the 11 renamed videos to a GitHub Release as assets.
# Run AFTER:
#   1) ./scripts/rename-videos.ps1 (creates ./videos/friend-N.mp4)
#   2) `gh auth login` (one-time GitHub CLI auth)
#   3) You've pushed this repo to GitHub (private or public; Pages requires public on free tier)
#
# Usage from PowerShell, inside the proposal-site folder:
#   ./scripts/upload-release.ps1 -Repo "jeffs/your-repo-name" -Tag "v1"

param(
  [Parameter(Mandatory=$true)][string]$Repo,
  [string]$Tag = "v1"
)

$ErrorActionPreference = "Stop"
$videos = Get-ChildItem -Path "$PSScriptRoot\..\videos" -Filter "friend-*.mp4" | Sort-Object Name
if ($videos.Count -eq 0) {
  Write-Error "No friend-*.mp4 files in ./videos. Run rename-videos.ps1 first."
  exit 1
}

Write-Host "About to upload $($videos.Count) videos to $Repo release $Tag"
$total = ($videos | Measure-Object Length -Sum).Sum / 1MB
Write-Host ("Total size: {0:N0} MB" -f $total)

# Create the release if it doesn't exist (idempotent: --notes "" so it doesn't prompt)
gh release view $Tag --repo $Repo *> $null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Creating release $Tag..."
  gh release create $Tag --repo $Repo --title "Keepsake videos" --notes "Private video assets."
}

foreach ($v in $videos) {
  Write-Host "Uploading $($v.Name) ($([math]::Round($v.Length/1MB)) MB)..."
  gh release upload $Tag $v.FullName --repo $Repo --clobber
}

$user, $name = $Repo -split "/"
$base = "https://github.com/$user/$name/releases/download/$Tag"
Write-Host ""
Write-Host "Done. Set this in public/friends.js:"
Write-Host "  window.VIDEO_BASE_URL = `"$base`";"
