import re

with open("app/globals.css", "r") as f:
    css = f.read()

# I will find the @media(max-width:820px) block that I added at the end (the one with .home-page.main-page { ... })
# and replace the content.
# Wait, it's easier to just parse it or do replacements on the strings I inserted.

# 1. Update identity-widget and its children
new_identity = """
  .identity-widget { padding: 16px; }
  .identity-widget .mini-avatar { width: 38px; height: 38px; }
  .identity-widget h2 { font-size: 24px; margin: 8px 0 6px; }
  .identity-widget .mobile-role-line { margin: 2px 0; font-size: 11px; color: #fff; font-weight: 700; }
  .identity-widget .mobile-summary { color: rgba(255, 255, 255, 0.75); font-size: 9.5px; line-height: 1.4; margin: 2px 0 0; }
  .identity-widget .id-links { gap: 5px; margin-top: 10px; }
  .identity-widget .id-links a { font-size: 8.5px; padding: 5px 8px; }
  .identity-widget button { margin-top: 10px; font-size: 10px; }
  .identity-widget p { max-width: none; }
"""

# I need to remove my old .mobile-role-line, .mobile-summary, .identity-widget p
css = re.sub(r'\.mobile-role-line\s*\{[^}]*\}', '', css)
css = re.sub(r'\.mobile-summary\s*\{[^}]*\}', '', css)
css = re.sub(r'\.identity-widget\s*p\s*\{[^}]*\}', '', css)

# 2. mobile-proof-links
old_proof_links = '''  .mobile-proof-links {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 8px;
  }
  .mobile-proof-link {
    display: block;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 12px;
    padding: 10px;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
  }'''

new_proof_links = '''  .mobile-proof-links {
    display: flex;
    flex-direction: row;
    gap: 6px;
    margin-top: 8px;
  }
  .mobile-proof-link {
    display: block;
    flex: 1;
    min-width: 0;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 12px;
    padding: 8px 6px;
    color: #fff;
    font-size: 9px;
    line-height: 1.2;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
  }'''
css = css.replace(old_proof_links, new_proof_links)

# 3. .home-page.main-page gap and padding-bottom, adding webkit scroll
old_main_page = '''  .home-page.main-page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 0;
    height: 100%;
    padding-bottom: max(115px, calc(105px + env(safe-area-inset-bottom)));
    overflow-y: auto;
  }'''
new_main_page = '''  .home-page.main-page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 0;
    height: 100%;
    gap: 8px;
    padding-bottom: max(132px, calc(124px + env(safe-area-inset-bottom)));
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }'''
css = css.replace(old_main_page, new_main_page)

# 4. Reduce app-grid and featured-widget inside main-page
new_app_grid = '''
  .main-page .app-grid .app-icon { width: 44px; height: 44px; }
  .main-page .app-grid .app-label { font-size: 8px; }
  .main-page .featured-widget { padding: 14px; }
'''

# Let's just insert these inside the @media(max-width:820px) block that was appended at the end.
# We can find the closing brace of the file and put it before.
css = css.rstrip()
if css.endswith('}'):
    css = css[:-1] + new_identity + new_app_grid + '\n}'

with open("app/globals.css", "w") as f:
    f.write(css)

print("globals.css updated")
