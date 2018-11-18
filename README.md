# Frupal

Please make sure to add yourself as an author on any files you edit.

### preliminary to-do list.
required functionality: 
* energy system
* map file verification (maybe write a program to parse a map file and determine if it's correct?)
* further jewel stuff:
	* if the selected random location is impossible to reach (e.g. in the middle of a water tile) then we need to regenerate a random location until we get to a non-water tile.
* further movement funtionality:
    * if the direction the player wants to go is water, we need to ensure that we subtract energy, but don't move into the tile.
	* if the tile the player wants to enter is bog or forest, we must subtract 2 energy.
