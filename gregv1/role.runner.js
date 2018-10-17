var sc = require('sc');

var roleRunner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        /* Do we need a refill? If so, try dumping everything nearby then running to nearest source. */
        var hungry = creep.room.find(FIND_MY_CREEPS, {
            filter: c => (c.memory.role != 'harvester' && c.memory.role != 'runner')
        });
        var reallyhungry = _.filter(hungry, h => h.carry.energy == 0);
        if (reallyhungry.length == 0) {
            var reallyhungry = _.filter(hungry, h => h.carry.energy < 30);
        }
        if (creep.memory.is == 'filling' && creep.carry.energy > (creep.carryCapacity / 2)) {
            creep.memory.is = 'running';
            creep.say("running");
        } else if ((creep.memory.is == 'filling') || (creep.carry.energy < (creep.carryCapacity / 3))) {
            if (creep.memory.is != 'filling') {
                creep.say("filling");
            }
            creep.memory.is = 'filling';
            if (creep.carry.energy > 0) {
                for (var i = 0; i < hungry.length; i++) {
                    if ((hungry[i].carryCapacity - hungry[i].carry.energy) > creep.carry.energy) {
                        if (creep.transfer(hungry[i], RESOURCE_ENERGY) == OK) {
                            return;
                        }
                    }
                }   
            }
            
            sc.getEnergy(creep, reallyhungry.length > 0);
        }
        
        if (creep.memory.is == 'running') {
            /* Spawn and Extensions first */
            var targets = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
            });
            
            if (targets.length > 0) {
                for (var i = 0; i < targets.length; i++) {
                    if (creep.transfer(targets[i], RESOURCE_ENERGY) == OK) {
                        creep.say("dump");
                        return;
                    }
                }
                creep.moveTo(sc.getNearest(creep, targets), {visualizePathStyle: {stroke: '#ffffff'}});
                return;
            }
    
            /* Now the really hungries */
            if (reallyhungry.length > 0) {
            
                for (var i = 0; i < reallyhungry.length; i++) {
                    if (creep.transfer(reallyhungry[i], RESOURCE_ENERGY) == OK) {
                        creep.say("burp");
                        return;
                    }
                }
            
                var target = sc.getNearest(creep, reallyhungry);
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                return;
            }
            
            /* If no really hungries, store! */
            var target = sc.getEnergyStore(creep);
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}

module.exports = roleRunner;