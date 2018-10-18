var taskBuild = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if(creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};

module.exports = taskBuild;
