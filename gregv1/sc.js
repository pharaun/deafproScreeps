/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('sc');
 * mod.thing == 'a thing'; // true
 */

var sc = {};

sc.getStructures = function(target, types) {
    var check = {}
    _.each(types, (type) => {
        check[type] = true;
    });
    
    return target.room.find(FIND_STRUCTURES, {filter: (s) => check[s.structureType]});
}

sc.getNearest = function(creep, targets) {
    targets = _.sortBy(targets, s => creep.pos.getRangeTo(s));
    return targets[0];
};

sc.getEnergyStore = function(creep) {
    /* Nearest energy takers:
     *
     * Closest spawn or extension
     * Closest container or storage with enough capacity
     * Other creeps
     */
    
    var targets = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
        }
    });
    
    if (targets.length > 0 && creep.memory.role != 'harvester') {
        return sc.getNearest(creep, targets);
    }
            
    var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_STORAGE) && structure.store.energy < structure.storeCapacity;
        }
    });
    
    if (containers.length > 0 || targets.length > 0) {
        return sc.getNearest(creep, containers.concat(targets));
    }
}

sc.getEnergyProvider = function(creep, useContainers) {
    /* Nearest energy providers:
     *
     * Closest of:
     *   Container or Storage with enough energy
     *   Harvester with enough energy
     * Any harvester
     */
    var needed = creep.carryCapacity / 2;
    if (needed > 40) needed = 40;
    
    var containers = [];
    if (useContainers) {
        containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) && structure.store.energy >= needed;
            }
        });
    }
    
    var wants = 'runner';
    if (creep.memory.role == 'runner') wants = 'harvester';
    var providers = creep.room.find(FIND_MY_CREEPS, {
        filter: (p) => {
            return (p.memory.role == wants) && (p.carry.energy >= needed);
        }
    });
    
    var goods = containers.concat(providers);
    if (goods.length > 0) {
        return sc.getNearest(creep, goods);
    }
    
    var allcontainers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_STORAGE);
        }
    });
    return sc.getNearest(creep, allcontainers);
};

sc.getEnergy = function(creep, useContainers) {
    var provider = sc.getEnergyProvider(creep, useContainers);
    var ret = ERR_NOT_IN_RANGE;
    var says = undefined;
    
    if (!provider) {
        creep.say(":-(");
        return;
    }
    
    if (provider instanceof Structure) {
        ret = creep.withdraw(provider, RESOURCE_ENERGY);
        says = 'slurp';
    }
    
    if (ret == OK) {
        creep.say(says);
    } else if (ret == ERR_NOT_IN_RANGE) {
        creep.moveTo(provider, {visualizePathStyle: {stroke: '#ffffff'}});
    }
}

module.exports = sc;
