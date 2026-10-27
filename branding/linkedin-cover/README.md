# LinkedIn cover

`linkedin-cover.png` is the cover image on Vitaly's LinkedIn profile: a light background, a round mosaic in the style of Soviet mosaic panels (sun, mountains, forest, water) and the line "From the first idea to stable production."

- Size: 3168x792 (2x of LinkedIn's recommended 1584x396, so it stays sharp on high-density screens).
- The profile photo covers the bottom-left of a cover, so the picture and the text sit on the right.
- Font: Bahnschrift (ships with Windows 10 and later).

## Change and rebuild
Needs Python 3 and Pillow (`pip install pillow`). Edit `mosaic.py` (colours, sun, mountains, tile size, text in `TAGLINE`), then run from this folder:

```sh
python mosaic.py        # rebuilds linkedin-cover.png
python mosaic.py all    # also writes variant-panel.png and variant-frieze.png (not committed)
```

The tiles use a fixed random seed, so the same script always produces the same image. The round mosaic (`round_mosaic`) is also drawn on the site's link preview, [branding/social-image](../social-image/README.md): after changing it, rebuild that picture too.

Upload on LinkedIn: profile → pencil on the cover → Change photo.
