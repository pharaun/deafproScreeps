/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */
 var sc = require('sc');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy > 0) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            sc.getEnergy(creep);
        }
    }
};

module.exports = roleUpgrader;