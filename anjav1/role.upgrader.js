var taskUpgrade = require('task.upgrade');
var taskHarvest = require('task.harvest');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            taskUpgrade.run(creep);
        } else {
            taskHarvest.run(creep);
        }
    }
};

module.exports = roleUpgrader;
