var taskDump = require('task.dump');
var taskHarvest = require('task.harvest');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            //taskHarvest.run(creep);
            var source = creep.room.find(FIND_SOURCES)[0]; // Not closest one for now till we handle this better
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            taskDump.run(creep);
        }
    }
};

module.exports = roleHarvester;
