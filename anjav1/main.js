var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    memoryClear();
    enoughCreepRole('spawn-w1n7', 'harvester', 2, [WORK,CARRY,MOVE]);
    enoughCreepRole('spawn-w1n7', 'upgrader', 2, [WORK,WORK,CARRY,CARRY,MOVE]);
    enoughCreepRole('spawn-w1n7', 'builder', 2, [WORK,WORK,CARRY,CARRY,MOVE]);
    
    spawnerStatus('spawn-w1n7');

    // Creeps role execution
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}

function memoryClear() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

function enoughCreepRole(spawnerName, creepRole, creepLimit, creepBody) {
    var creepers = _.filter(Game.creeps, (creep) => creep.memory.role == creepRole);
    if(creepers.length < creepLimit) {
        var newName = creepRole + Game.time;
        console.log('Spawning new ' + creepRole + ': ' + newName);
        Game.spawns[spawnerName].spawnCreep(creepBody, newName, {memory: {role: creepRole}});
    }    
}

function spawnerStatus(spawnerName) {
    if(Game.spawns[spawnerName].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns[spawnerName].spawning.name];
        Game.spawns[spawnerName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnerName].pos.x + 1, 
            Game.spawns[spawnerName].pos.y, 
            {align: 'left', opacity: 0.8}
        );
    }
}
