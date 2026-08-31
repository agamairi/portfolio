import re

with open("app/globals.css", "r") as f:
    content = f.read()

pattern = r"@media\(min-width:821px\)\s*\{[^\}]*\}"

replacement = """@media(min-width:821px) {
  .portfolio-shell { grid-template-columns: 1fr; place-items: center; gap: 0; padding: 3vh 2vw; }
  .phone-wrap { width: 100%; justify-items: center; }
  
  .ipad-grid { height: calc(100% - 96px); }
  .ipad-home { padding-bottom: 92px; }
  
  .ipad-stack .stack-cloud { margin-top: 10px; }
  .skills-at-glance { gap: 8px; }
  .ipad-stack .rot-depth { gap: 4px; }
  
  .ipad-apps { padding: 12px; }
  .ipad-apps .ipad-app-grid { gap: 6px; margin-top: 9px; }
  .ipad-apps .ipad-app-grid .app-button:nth-child(n+4) { display: flex; }
  .ipad-apps .ipad-app-grid .app-icon { width: 34px; height: 34px; border-radius: 10px; }
  .ipad-apps .ipad-app-grid .app-label { font-size: 6px; line-height: 1.1; }
  .ipad-apps .ipad-apps-links { margin-top: 8px; padding-top: 7px; gap: 6px; }
  .ipad-apps .ipad-apps-links a { font-size: 8px; }
}"""

new_content = re.sub(pattern, replacement, content)

with open("app/globals.css", "w") as f:
    f.write(new_content)
