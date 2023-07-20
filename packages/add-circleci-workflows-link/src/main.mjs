export function main(path, rule) {
  const matches = path.match(rule.match)
  const userName = rule.getUserName(matches)
  const repoName = rule.getRepoName(matches)
  const branchName = rule.getBranchName(matches)

  const btn = document.createElement('a')
  btn.textContent = 'CircleCI Workflows'
  btn.href = `https://app.circleci.com/pipelines/github/${userName}/${repoName}?branch=${encodeURIComponent(
    branchName,
  )}`
  btn.target = '_blank'
  btn.style.display = 'inline-block'
  btn.style.height = '20px'
  btn.style.lineHeight = '20px'
  btn.style.paddingLeft = '20px'
  btn.style.background = 'url("https://avatars0.githubusercontent.com/ml/7?s=16") left center no-repeat'

  rule.insertButton(btn)
}
