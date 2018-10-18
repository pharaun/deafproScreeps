var taskBuild = {

    /**
     * @param {Creep} creep
     * @return {Bool} hasTask - true if it can work/move to, false otherwise
     **/
    run: function(creep) {
        const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        const ret = creep.build(target);

        if(ret == OK) {
            return true;
        } else if(ret == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            return true;
        }
        return false;
    }
};

module.exports = taskBuild;
