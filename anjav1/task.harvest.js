var taskHarvest = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var source = creep.pos.findClosestByRange(FIND_SOURCES);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};

module.exports = taskHarvest;
