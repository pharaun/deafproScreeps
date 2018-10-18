var taskHarvest = {

    /**
     * @param {Creep} creep
     * @return {Bool} hasTask - true if it can work/move to, false otherwise
     **/
    run: function(creep) {
        const source = creep.pos.findClosestByRange(FIND_SOURCES);
        const ret = creep.harvest(source);

        if(ret == OK) {
            return true;
        } else if(ret == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            return true;
        }
        return false;
    }
};

module.exports = taskHarvest;
