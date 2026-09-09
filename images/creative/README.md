# Creative gallery images

The "Beyond Research" section on the homepage reads eight tiles from this
folder. Drop your files in here named:

    01.jpg  02.jpg  03.jpg  04.jpg  05.jpg  06.jpg  07.jpg  08.jpg

No code change is needed - the filenames are already wired up in `index.html`.

To change a caption, edit the matching `<figcaption>` in the `.gallery` block
of `index.html`.

## Guidelines

- Tiles are square-cropped by CSS (`object-fit: cover`), so anything roughly
  centred works. Square originals crop best.
- Around 800x800px is plenty. Keep each file under ~300KB so the page stays
  fast; export JPEG at quality 80.
- To use more or fewer than eight tiles, add or remove `<figure>` blocks in
  `index.html`. The grid reflows on its own.

Until a file exists, its tile renders as a neutral placeholder - the layout
does not break.
