var taskUpgrade = {

    /**
     * @param {Creep} creep
     * @return {Bool} hasTask - true if it can work/move to, false otherwise
     **/
    run: function(creep) {
        const ret = creep.upgradeController(creep.room.controller);

        if(ret == OK) {
            return true;
        } else if(ret == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            return true;
        }
        return false;
    }
};

module.exports = taskUpgrade;
