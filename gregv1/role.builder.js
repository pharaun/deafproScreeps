/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */
var sc = require('sc');
var roleUpgrader = require('role.upgrader');


function getBuildTarget(creep) {
    var repairables = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.hitsMax - structure.hits) > 50;
        }
    });
    if (repairables.length > 0) {
        return sc.getNearest(creep, repairables);
    }
    
    var buildables = creep.room.find(FIND_CONSTRUCTION_SITES);

    if (buildables.length) {
        return sc.getNearest(creep, buildables);
    }
    
    return undefined;
}

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy > 0) {
            var target = getBuildTarget(creep);
            var is = creep.memory.was;
            if (target instanceof ConstructionSite) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                is = 'build';
            } else if (target instanceof Structure) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                is = 'repair';
            } else if (!target) {
                is = 'upgrade';
                roleUpgrader.run(creep);
            }
            if (is != creep.memory.was) {
                creep.say('🚧 ' + is);
                creep.memory.was = is;
            }
        } else {
            sc.getEnergy(creep);
        }
    }
};

module.exports = roleBuilder;