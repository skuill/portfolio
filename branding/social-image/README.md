# Link preview image

`public/social-image.png` is the picture LinkedIn, Telegram, Slack and X show when someone shares a link to the site (`og:image` in `index.html`). It matches the [LinkedIn cover](../linkedin-cover/README.md): a light background, the name, the role and the address on the left, the round mosaic (sun, mountains, forest, water) on the right.

- Size: 1200x630, the size Open Graph previews are cropped to (1.91:1). The text and the mosaic stay clear of the edges, so X's 2:1 crop cuts only the background.
- PNG, not WebP: not every link preview service reads WebP.
- Font: Bahnschrift (ships with Windows 10 and later).
- The mosaic is drawn by `round_mosaic` in `../linkedin-cover/mosaic.py`: a change there changes both pictures.

## Change and rebuild
Needs Python 3 and Pillow (`pip install pillow`). Edit `social_image.py` (`NAME`, `ROLE`, `ADDRESS`, positions), then run from this folder:

```sh
python social_image.py   # rebuilds ../../public/social-image.png
```

The tiles use a fixed random seed, so the same script always produces the same image. If the size changes, update `og:image:width` and `og:image:height` in `index.html` (a test checks they match the file).

Preview services keep the old picture for a while after a release: refresh it with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and, for Telegram, by sending the link to [@WebpageBot](https://t.me/WebpageBot).
