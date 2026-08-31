with open("app/globals.css", "r") as f:
    content = f.read()

target = "  .ipad-apps .ipad-apps-links a { font-size: 8px; }"
replacement = target + """
  
  .ipad-project{justify-content:flex-start;gap:12px}
  .ipad-project .project-orbit{height:92px}"""

if target in content:
    with open("app/globals.css", "w") as f:
        f.write(content.replace(target, replacement))
