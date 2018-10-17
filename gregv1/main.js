var sc = require('sc');

var roles = {};
var role_priorities = ["harvester", "runner", "upgrader", "builder"];

var mins = {
    harvester: 5,
    builder: 2,
    upgrader: 4,
    runner: 4,
};

var parts = {
    upgrader: [MOVE, CARRY, WORK, WORK, CARRY, WORK, CARRY, WORK, MOVE],
    harvester: [MOVE, CARRY, WORK, WORK, CARRY, WORK, WORK, CARRY, WORK],
    builder: [MOVE, WORK, CARRY, WORK, CARRY, MOVE, WORK],
    runner: [MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, MOVE],
};

var COSTS = {
    carry: 50,
    work: 100,
    move: 50,
};

function filterCosts(arry) {
    var total = 0;
    var max = Game.spawns.home.room.energyCapacityAvailable;
    var ret = [];
    for (var i = 0; i < arry.length; i++) {
        var what = arry[i];
        total += COSTS[what];
        if (total > max) break;
        ret.push(arry[i]);
    }
    return ret;
}

module.exports.loop = function () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var counts = {
        harvester: 0,
        builder: 0,
        upgrader: 0,
        runner: 0,
    };
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = creep.memory.role;
        if (!role) {
            /* Probably from a bug when I spawned by hand */
            creep.say("amnesia");
            creep.memory.role = 'harvester';
            role = 'harvester';
        }
        if (!roles[role]) {
            roles[role] = require('role.' + role);
        }
        roles[role].run(creep);
        if (!counts[role]) counts[role] = 0;
        counts[role] += 1;
    }

    if (!Game.spawns.home.spawning) {
        var spawn = undefined;
        for (var i = 0; i < role_priorities.length && !spawn; i++) {
            var role = role_priorities[i];
            if (counts[role] < mins[role]) {
                Game.spawns.home.room.visual.text(
                    '!' + role,
                    Game.spawns.home.pos.x + 1,
                    Game.spawns.home.pos.y,
                    {align: 'left', opacity: 0.8});
                spawn = role;
            }
        }
        if (spawn) {
            var newName = "auto" + spawn + '.' + Game.time;
            Game.spawns.home.spawnCreep(filterCosts(parts[spawn]), newName,
                    {memory: {role: spawn}});
        }
    }

    if (Game.spawns.home.spawning) {
        var spawningCreep = Game.creeps[Game.spawns.home.spawning.name];
        Game.spawns.home.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns.home.pos.x + 1,
            Game.spawns.home.pos.y,
            {align: 'left', opacity: 0.8});
    }
};
