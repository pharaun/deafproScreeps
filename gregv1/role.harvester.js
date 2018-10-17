var sc = require('sc');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        /* If we have enough to make transfer worthwhile, try to transfer away to runners. */
        
        if (creep.carry.energy >= 50) {
            /* If energy Capacity is met, we pass off to anybody. Otherwise we only pass off to runners. */
            var takers = [];
            if (creep.room.energyAvailable == creep.room.energyCapacityAvailable) {
                takers = creep.room.find(FIND_MY_CREEPS, {
                    filter: (p) => {
                        return (p.memory.role != "harvester") && (p.carryCapacity - p.carry.energy) > 40;
                    }
                });
            } else {
                takers = creep.room.find(FIND_MY_CREEPS, {
                    filter: (p) => {
                        return (p.memory.role == "runner") && (p.carryCapacity - p.carry.energy) > 40;
                    }
                });
            }
            
            for (var i = 0; i < takers.length; i++) {
                if (creep.transfer(takers[i], RESOURCE_ENERGY) == OK) {
                    creep.say("burp");
                    return;
                }
            }
        }
        
        if (creep.carry.energy == creep.carryCapacity) {
            var target = sc.getEnergyStore(creep);
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizPathStyle: {stroke: "#ffaa00"}});
            }
            return;
        }
        
        /* Otherwise, keep working. */
        var sources = creep.room.find(FIND_SOURCES);
        var closest = sc.getNearest(creep, sources);
        if (creep.harvest(closest) != OK) {
            var biggest = _.sortBy(sources, s => s.energyCapacity - s.energy);
            creep.moveTo(biggest[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}

module.exports = roleHarvester;