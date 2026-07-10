# LinkedIn Updates

Use one folder per LinkedIn post.

Required structure:

```text
linkedin-updates/
  index.json
  2026-07-10-post-name/
    post.md
    image-1.png
    image-2.jpg
```

Add each folder name to `index.json`:

```json
[
  "2026-07-10-post-name"
]
```

Each `post.md` can use this format:

```md
Date: 2026-07-10
Topic: on shipping
Title: Optional title shown on the portfolio
Link: https://www.linkedin.com/...
---
Paste the LinkedIn post text here.

![Image alt text](image-1.png)
```

Images referenced with Markdown are rendered as the gallery. The first few non-empty lines become the preview. Read More expands inline, and the Link field adds a small original-post link.

When opened directly as `file://`, some browsers block loading local JSON/Markdown. When hosted normally, the updates load automatically. The page keeps a built-in fallback so the section never breaks.