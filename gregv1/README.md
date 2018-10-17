Greg's first learning versions:

It started from the tutorial, taking roles of harvester, builder, and upgrader.

Differences from tutorial:

## MAIN

main.js dynamically includes new roles, rather than tutorial's line by line inclusion.
`var roles = {};` at the end of the tick / loop includes all the require()'d role.??s.

Added parts = {}, and filterCosts(), which builds the largest creep that the room can
support at the time of call. (using room.energyCapacityAvailable)

Has a count of how are spawned, and a list of minimums to keep spawned. This isn't
scaling, unfortunately, and I tweak the numbers as the spawns get more.

## HARVESTER

- 1 MOVE, lots of WORK and some CARRY.

Harvesters are intended to be high work med carry low move. Once they have a certain
amount, they try to transfer it to other creeps. (They say "burp" when that happens).
If they fill up and no creeps are around to take it off them, they head to an energy
storage location. (see SC.JS)

## BUILDER

- Tries to keep work, carry, move typically average.

Builders are tweaked to first repair, then build. If nothing to repair or build, they
import upgrader and run their logic.

## UPGRADER

- High work, some carry and low move.

Pretty simple, they just move to the controller and try to upgrade it.

## RUNNER

- Move and carry, and that's it. Fast Moving batteries.

The runners are new, not from tutorial. When all roles are active, they try to
pick up energy from harvesters and move it to the other creeps or to storage.
If non-(harvester/runner) are very low, then runners will also pick up energy
from storage (structureContainers) to deliver to them.

## SC

sc.js is helper functions:

getEnergyStore: Nearest place for a Harvester or Runner to dump excess energy.
If there are any spawns or extensions lacking energy, those take high priority.
(Exception: Harvesters move so slowly, they go to the closest container or
storage, depending on Runners to fill the spawn from container)

getEnergyProvider: For non-harvesters, this will return an energy provider.
Builders and Upgraders will attempt to get energy from Containers or from Runners.
Runners will find harvesters, or if there are any "really hungry" builders or
upgraders, Runners will pull from Containers to feed them. Runners only pull from
containers if there are "really hungry" screeps that need energy.

getEnergy: A wrapper around energy provider that deals with moving the screep to the
provider.
