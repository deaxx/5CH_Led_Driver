const zigbeeHerdsmanConverters = require('zigbee-herdsman-converters');

const exposes = zigbeeHerdsmanConverters.exposes;
const ea = exposes.access;
const e = exposes.presets;
const fz = zigbeeHerdsmanConverters.fromZigbeeConverters;
const tz = zigbeeHerdsmanConverters.toZigbeeConverters;

const ptvo_switch = zigbeeHerdsmanConverters.findByDevice({modelID: 'ptvo.switch'});
fz.legacy = ptvo_switch.meta.tuyaThermostatPreset;



const device = {
    zigbeeModel: ['ptvo.led'],
    model: 'ptvo.led',
    vendor: 'Custom devices (DiY)',
    description: '[Configurable firmware](https://ptvo.info/zigbee-configurable-firmware-features/)',
    fromZigbee: [fz.ignore_basic_report, fz.on_off, fz.ptvo_switch_analog_input, fz.brightness, fz.ptvo_multistate_action, fz.legacy.ptvo_switch_buttons,],
    toZigbee: [tz.ptvo_switch_trigger, tz.on_off, tz.ptvo_switch_analog_input, tz.ptvo_switch_light_brightness,],
    exposes: [e.switch().withEndpoint('l2'),
      e.light_brightness().withEndpoint('l3'),
      e.light_brightness().withEndpoint('l4'),
      e.light_brightness().withEndpoint('l5'),
      e.light_brightness().withEndpoint('l6'),
      e.action(['single', 'double', 'triple', 'hold', 'release']),
],
    meta: {
        multiEndpoint: true,
        
    },
    endpoint: (device) => {
        return {
            l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l1: 1,
        };
    },
    
};

module.exports = device;
