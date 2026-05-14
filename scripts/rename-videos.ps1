# Copies the 12 named videos from Downloads into ./videos with web-safe filenames.
# Names are lowercased and "Alex and Rosalind.mp4" becomes "alex-and-rosalind.mp4"
# to match what's referenced in public/friends.js.
#
# Usage from PowerShell, inside the proposal-site folder:
#   ./scripts/rename-videos.ps1

$ErrorActionPreference = "Stop"
$src = "$env:USERPROFILE\Downloads"
$dst = "$PSScriptRoot\..\videos"
New-Item -ItemType Directory -Force -Path $dst | Out-Null

$map = @{
  "Hazel.mp4"             = "hazel.mp4"
  "Sue.mp4"               = "sue.mp4"
  "CP.mp4"                = "cp.mp4"
  "Hilary.mp4"            = "hilary.mp4"
  "Joyce.mp4"             = "joyce.mp4"
  "Kat.mp4"               = "kat.mp4"
  "Carol.mp4"             = "carol.mp4"
  "Cyn.mp4"               = "cyn.mp4"
  "Daniel.mp4"            = "daniel.mp4"
  "Kevin.mp4"             = "kevin.mp4"
  "Aaron.mp4"             = "aaron.mp4"
  "Alex and Rosalind.mp4" = "alex-and-rosalind.mp4"
}

foreach ($entry in $map.GetEnumerator()) {
  $from = Join-Path $src $entry.Key
  $to   = Join-Path $dst $entry.Value
  if (-not (Test-Path $from)) {
    Write-Warning "Missing: $($entry.Key)"
    continue
  }
  Copy-Item -Path $from -Destination $to -Force
  Write-Host "Copied $($entry.Key) -> $($entry.Value)"
}

Write-Host ""
Write-Host "Done. Videos are in: $dst"
Write-Host "Next: run ./scripts/upload-release.ps1 -Repo `"Jeffy/<repo>`" once you've created the repo."
