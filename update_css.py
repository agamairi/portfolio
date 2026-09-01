with open("app/globals.css", "r") as f:
    css = f.read()

new_rules = """
  .home-page.second-page {
    display: flex;
    flex-direction: column;
    min-height: 0;
    height: 100%;
    padding-bottom: max(132px, calc(124px + env(safe-area-inset-bottom)));
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    gap: 12px;
  }
  .second-page .mini-project-grid {
    margin-bottom: auto;
  }
"""

css = css.rstrip()
if css.endswith('}'):
    css = css[:-1] + new_rules + '\n}'

with open("app/globals.css", "w") as f:
    f.write(css)

print("globals.css updated")
