// ── models.js ─────────────────────────────────────────────────────────────────
// All GLB model definitions. Add new model types here.
// scale values are in metres (Threebox units: 'meters').

const BASE_URL = 'https://raw.githubusercontent.com/gkankia/protest-digital-twin/main/Digital%20Twin/models/';

const MODELS = {
    busStop:     { url: BASE_URL + 'bus_stop_new.glb',     scale: { x: 1,    y: 1,    z: 1    } },
    bus:         { url: BASE_URL + 'bus_new.glb',          scale: { x: 1,    y: 1,    z: 1    } },
    fordtransit: { url: BASE_URL + 'ford_transit_new.glb', scale: { x: 1,    y: 1,    z: 1    } },
    barricadeN:  { url: BASE_URL + 'barricade.glb',        scale: { x: 1,    y: 1,    z: 1    } },
    skoda:       { url: BASE_URL + 'skoda.glb',            scale: { x: 1,    y: 1,    z: 1    } },
    policecar:   { url: BASE_URL + 'police_vehicle.glb',   scale: { x: 1,    y: 1,    z: 1    } },
    policeman:   { url: BASE_URL + 'policeman.glb',        scale: { x: 0.6,  y: 0.6,  z: 0.6  } },
    watertruck:  { url: BASE_URL + 'watertruck.glb',       scale: { x: 1,    y: 1,    z: 1    } },
    imeditv:     { url: BASE_URL + 'imedi_drone.glb',      scale: { x: 2.5,  y: 2.5,  z: 2.5  } },
    akatsuki:    { url: BASE_URL + 'akatsuki.glb',         scale: { x: 1.5,  y: 1.5,  z: 1.5  } },
    cross:       { url: BASE_URL + 'cross.glb',            scale: { x: 0.35, y: 0.35, z: 0.35 } },
    lampbig:     { url: BASE_URL + 'lamp_big.glb',         scale: { x: 0.5,  y: 0.5,  z: 0.5  } },
    lampstreet:  { url: BASE_URL + 'street-light-1.glb',   scale: { x: 1,    y: 1,    z: 1    } },
    pinetree:    { url: BASE_URL + 'pine_tree.glb',        scale: { x: 1,    y: 1,    z: 1    } },
    bush:        { url: BASE_URL + 'bush.glb',             scale: { x: 1,    y: 1,    z: 1    } },
    mercedes:    { url: BASE_URL + 'mercedes_benz.glb',    scale: { x: 1,    y: 1,    z: 1    } },
    cedar_1:     { url: BASE_URL + 'cedar-1.glb',          scale: { x: 1,    y: 1,    z: 1    } },
    cedar_2:     { url: BASE_URL + 'cedar-2.glb',          scale: { x: .75,  y: .75,  z: .75  } },
};
