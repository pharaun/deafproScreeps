var taskBuild = require('task.build');
var taskHarvest = require('task.harvest');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            taskBuild.run(creep);
        } else {
            taskHarvest.run(creep);
        }
    }
};

module.exports = roleBuilder;
