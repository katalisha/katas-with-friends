# a very rjbs christmas tree generator

This program is *mostly* pretty straightforward.  It generates a triangular
tree with a star at the top and a trunk at the bottom, given some height.  This
is all done in the `DRAW_A_TREE` loop, and it's done regularly, clearing the
screen and drawing it again, over and over, forever.  Almost.

Important things to notice:

* we use Term::ReadKey to get the terminal size, so we can center the tree
* we also pick a tree height based on terminal height, unless you supply one
  as the only argument to the program
* if you resize the terminal, the tree will redraw nearly immediately
* single-height trees are special cased using a tree-compression algorithm
* we use srand to ensure that ornaments are always the same on every
  same-height tree, meaning that redraws will never move ornaments around
