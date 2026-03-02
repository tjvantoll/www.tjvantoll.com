# CLAUDE.md

This is TJ VanToll's personal website at https://www.tjvantoll.com. TJ is a Principal Developer Advocate at Blues. The site lists his writing, speaking engagements, and links to his work.

## Running the site

```
bundle exec jekyll serve
```

## Project structure

- `_posts/` — Blog posts (both local and external). File names follow `YYYY-MM-DD-slug.md`.
- `_layouts/` — Page templates (`default.html`, `page.html`, `post.html`, `externalpost.html`, `empty.html`).
- `_data/speaking.json` — Speaking engagements data (talks, podcast appearances, interviews).
- `writing.md` — Auto-generates a list of all posts from `_posts/`.
- `speaking.md` — Auto-generates a list of all talks from `_data/speaking.json`.
- `index.md` — Homepage with bio and nav links.
- `_config.yml` — Jekyll config (title, URL, permalink style, etc.).

## Adding external blog posts

External posts use the `externalpost` layout, which does a meta-refresh redirect to the original URL. Create a file in `_posts/` named `YYYY-MM-DD-publication.md`:

```markdown
---
layout: externalpost
title: "Post Title Here"
redirect_url: https://example.com/full-url-to-post
publication_name: "Publication Name"
publication_url: "https://example.com"
---
```

Common publications:
- Blues Developer Blog: `publication_name: "Blues Developer Blog"`, `publication_url: "https://dev.blues.io/blog/"`
- Hackster: `publication_name: "Hackster"`, `publication_url: "https://www.hackster.io"`

Always fetch the actual URL to confirm the exact post title and publication date before creating the file.

## Adding speaking engagements

Edit `_data/speaking.json`. Each entry supports these fields:

```json
{
  "name": "Talk Title",
  "url": "https://link-to-slides-or-recording",
  "date": "YYYY-MM-DD",
  "type": "talk",
  "talk_venue": "Conference Name",
  "talk_venue_city": "City, State",
  "talk_venue_url": "https://conference-url",
  "talk_slides": "https://slides-url",
  "talk_video": "https://video-url"
}
```

For podcast appearances use `podcast_name` and `podcast_url`. For interviews use `interview_person`, `interview_site`, and `interview_site_url`.
