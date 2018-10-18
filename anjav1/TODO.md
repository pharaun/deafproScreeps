1. Need to add a return to all tasks that indicate if there is a task to do or if there isn't
	- so we can skip running the lower priority tasks if there is tasks to do
	- so that we can later on improve harvester (if there's no dump, and is full, move to spawner for now)
2. Seems like no matter what i do it ends up always alternating between tasks,
	- need some way to make it pick one task and stick to completion, then pick new task
	- for some reason harvester can do this, but the builder can't?????
