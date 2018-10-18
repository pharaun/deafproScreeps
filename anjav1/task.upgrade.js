var taskUpgrade = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};

module.exports = taskUpgrade;
