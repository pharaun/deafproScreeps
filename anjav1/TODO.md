1. Need to add a return to all tasks that indicate if there is a task to do or if there isn't
	- so we can skip running the lower priority tasks if there is tasks to do
	- so that we can later on improve harvester (if there's no dump, and is full, move to spawner for now)
2. Seems like no matter what i do it ends up always alternating between tasks,
	- need some way to make it pick one task and stick to completion, then pick new task
	- for some reason harvester can do this, but the builder can't?????
3. Find a way to make the creep say what task its doing (instead of a hrdcoded task)
	- also since it seems like the mine/not mine toggle is common to creeps
		can we makethis more generic and let us instance creeps based off their memory/role
		instead of having to have multiple copies of the role.*?
