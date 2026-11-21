TEE MOON: GitHub CMS (without Supabase for content)

1. Upload the contents of this folder (NOT the ZIP itself) into the repository TetianaSulima/tee-moon-site, branch main. Keep the images/content folder. Do not remove CNAME.
2. Confirm that https://teemoon.art and the photos work.
3. Go to https://teemoon.art/admin.html for editing. Existing content is loaded from content.json. Old local drafts are preserved and can be exported.
4. When ready to publish, click ОПУБЛИКОВАТЬ НА GITHUB.
5. Create a fine-grained GitHub personal access token at https://github.com/settings/personal-access-tokens/new. Select your account, ONLY repository tee-moon-site, Contents: Read and write, short expiration. Do NOT share this token with anyone. Paste it into the publish dialog, never into files or chat. It is used only for this publication, in memory.
6. After a successful publication, GitHub Pages rebuilds the site; verify in an incognito window. A temporary draft is kept locally.

Important:
- /admin.html is publicly reachable but cannot publish without a GitHub token. Editing there only changes that visitor's browser draft. No password check is possible purely on GitHub Pages.
- A GitHub token is a sensitive credential. Use only over HTTPS on your trusted computer. Revoke or expire it after use. Avoid entering a token into a compromised browser or website.
- Contact and subscribe forms are still implemented via Supabase in the original site. They require separate migration before Supabase can be fully deleted. They were not changed by this package.
- Files server.js and supabase.sql are intentionally excluded from this package. Existing versions in GitHub will still be there until separately deleted.
- Images here are web-sized previews, not high-resolution printable originals.
