var taskDump = require('task.dump');
var taskUpgrade = require('task.upgrade');
var taskHarvest = require('task.harvest');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.dumping && creep.carry.energy == 0) {
            creep.memory.dumping = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.dumping && creep.carry.energy == creep.carryCapacity) {
            creep.memory.dumping = true;
            creep.say('🚚 dump');
        }

        if(creep.memory.dumping) {
            taskDump.run(creep);
            //taskUpgrade.run(creep);
        } else {
            taskHarvest.run(creep);
        }
    }
};

module.exports = roleHarvester;
