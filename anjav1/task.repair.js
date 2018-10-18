var taskRepair = {

    /**
     * @param {Creep} creep
     * @return {Bool} hasTask - true if it can work/move to, false otherwise
     **/
    run: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });

        // Sort by damage * distance
        targets.sort((a,b) => cost(creep, a) - cost(creep, b));

        if(targets.length > 0) {
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                return true;
            }
        }
        return false;
    }
};

function cost(creep, target) {
    return (target.hits/target.hitsMax) * creep.pos.getRangeTo(target.pos.x, target.pos.y)
}

module.exports = taskRepair;
