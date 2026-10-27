# Link preview image

`public/social-image.png` is the picture LinkedIn, Telegram, Slack and X show when someone shares a link to the site (`og:image` in `index.html`). It repeats the site's first screen: the blue to teal part of the site's gradient, stars, the name in Segoe UI Light, the role and the address in an outlined pill.

- Size: 1200x630, the size Open Graph previews are cropped to (1.91:1). Everything important sits in the middle, so X's 2:1 crop cuts only the background.
- PNG, not WebP: not every link preview service reads WebP.
- Font: Segoe UI Light and Semilight (ship with Windows 10 and later).

## Change and rebuild
Needs Python 3 and Pillow (`pip install pillow`). Edit `social_image.py` (colours, `NAME`, `ROLE`, `ADDRESS`), then run from this folder:

```sh
python social_image.py   # rebuilds ../../public/social-image.png
```

The stars use a fixed random seed, so the same script always produces the same image. If the size changes, update `og:image:width` and `og:image:height` in `index.html` (a test checks they match the file).

Preview services keep the old picture for a while after a release: refresh it with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and, for Telegram, by sending the link to [@WebpageBot](https://t.me/WebpageBot).
