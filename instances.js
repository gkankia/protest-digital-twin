// ── instances.js ──────────────────────────────────────────────────────────────
// All static scene instances. Each entry maps to a key in MODELS (models.js).
//
// Fields:
//   id        — unique string identifier
//   model     — key from MODELS
//   coords    — [lng, lat] or [lng, lat, altMetres]
//   rotationY — degrees (optional, defaults to 0)

const INSTANCES = [

    // ── Bus stops ────────────────────────────────────────────────
    { id: 'bus-stop-1',    model: 'busStop',     coords: [44.798461, 41.697794],     rotationY: -63  },
    { id: 'bus-stop-2',    model: 'busStop',     coords: [44.798742, 41.697983],     rotationY: -243 },

    // ── Buses ────────────────────────────────────────────────────
    { id: 'bus-1',         model: 'bus',         coords: [44.798445, 41.697900],     rotationY: -155 },
    { id: 'bus-2',         model: 'bus',         coords: [44.798675, 41.697900],     rotationY: 25   },

    // ── Ford Transits (police minivans) ──────────────────────────
    { id: 'fordtransit-1', model: 'fordtransit', coords: [44.79929,  41.69750],      rotationY: 115  },
    { id: 'fordtransit-2', model: 'fordtransit', coords: [44.79938,  41.69754],      rotationY: 115  },
    { id: 'fordtransit-3', model: 'fordtransit', coords: [44.79947,  41.69757],      rotationY: 115  },
    { id: 'fordtransit-4', model: 'fordtransit', coords: [44.79956,  41.69761],      rotationY: 115  },
    { id: 'fordtransit-5', model: 'fordtransit', coords: [44.79993,  41.69759],      rotationY: 115  },

    // ── Barricades ──────────────────────────
    { id: 'barricade-E',   model: 'barricadeE',  coords: [44.79864,  41.69686, 1],   rotationY: 28   },
    { id: 'barricade-N',   model: 'barricadeS',  coords: [44.79782,  41.69704, 1],   rotationY: 28   },
    { id: 'barricade-S',   model: 'barricadeN',  coords: [44.79831,  41.69633, 1],   rotationY: 28   },
    { id: 'barricade-W',   model: 'barricadeW',  coords: [44.79720,  41.69630, 1],   rotationY: 28   },

    // ── Police cars ──────────────────────────────────────────────
    { id: 'policecar-1',   model: 'policecar',   coords: [44.79862, 41.69732, 1],    rotationY: 300  },
    { id: 'policecar-2',   model: 'policecar',   coords: [44.79872, 41.69736, 1],    rotationY: 300  },
    { id: 'policecar-3',   model: 'policecar',   coords: [44.79899, 41.69712, 1],    rotationY: 210  },
    { id: 'policecar-4',   model: 'policecar',   coords: [44.79904, 41.69706, 1],    rotationY: 210  },
    { id: 'policecar-5',   model: 'policecar',   coords: [44.79913, 41.69659, 1],    rotationY: 300  },
    { id: 'policecar-6',   model: 'policecar',   coords: [44.79921, 41.69662, 1],    rotationY: 300  },

    // ── Skoda ────────────────────────────────────────────────────
    { id: 'skoda-1',       model: 'skoda',       coords: [44.79920, 41.69721, 1],    rotationY: 45  },    
    { id: 'skoda-2',       model: 'skoda',       coords: [44.79923, 41.69716, 1],    rotationY: 45  },

    // ── Ford Transits (police minivans) ──────────────────────────
    { id: 'watertruck',    model: 'watertruck',  coords: [44.79851, 41.69691],       rotationY: 120  },
    { id: 'watertruck',    model: 'watertruck',  coords: [44.79855, 41.69687],       rotationY: 120  },
    { id: 'watertruck',    model: 'watertruck',  coords: [44.79859, 41.69683],       rotationY: 120  },

    // ── Policemen ────────────────────────────────────────────────
    { id: 'policeman-1',   model: 'policeman',   coords: [44.798500, 41.697700],     rotationY: 0    },

    // ── Drone ────────────────────────────────────────────────────
    { id: 'drone-1',       model: 'imeditv',     coords: [44.798500, 41.697700, 20], rotationY: 0    },

    // ── Cross ────────────────────────────────────────────────────
    { id: 'cross-1',       model: 'cross',       coords: [44.79873,  41.69698],      rotationY: 115  },

    // ── Large lamps ──────────────────────────────────────────────
    { id: 'lampbig-1',     model: 'lampbig',     coords: [44.79891,  41.69724],      rotationY: 0    },
    { id: 'lampbig-2',     model: 'lampbig',     coords: [44.79911,  41.69693],      rotationY: 0    },

    // ── Street lamps ─────────────────────────────────────────────
    { id: 'streetlamp-1',  model: 'lampstreet',  coords: [44.79911,  41.69738],      rotationY: 115  },
    { id: 'streetlamp-2',  model: 'lampstreet',  coords: [44.79935,  41.69704],      rotationY: 115  },
    { id: 'streetlamp-3',  model: 'lampstreet',  coords: [44.79959,  41.69670],      rotationY: 115  },

    // ── Pine trees ───────────────────────────────────────────────
    { id: 'pine-1',        model: 'pinetree',    coords: [44.79893,  41.69646]                       },
    { id: 'pine-2',        model: 'pinetree',    coords: [44.79905,  41.69649]                       },
    { id: 'pine-3',        model: 'pinetree',    coords: [44.79835,  41.69758]                       },
    { id: 'pine-4',        model: 'pinetree',    coords: [44.79916,  41.69762]                       },

    // ── Cedars ───────────────────────────────────────────────────
    { id: 'cedar-1',       model: 'cedar_1',     coords: [44.79756,  41.69903]                       },
    { id: 'cedar-2',       model: 'cedar_1',     coords: [44.79769,  41.69891]                       },
    { id: 'cedar-3',       model: 'cedar_1',     coords: [44.79808,  41.69810]                       },
    { id: 'cedar-4',       model: 'cedar_1',     coords: [44.79819,  41.69797]                       },
    { id: 'cedar-5',       model: 'cedar_1',     coords: [44.79836,  41.69789]                       },
    { id: 'cedar-6',       model: 'cedar_1',     coords: [44.79851,  41.69829]                       },
    { id: 'cedar-7',       model: 'cedar_1',     coords: [44.79868,  41.69752]                       },
    { id: 'cedar-8',       model: 'cedar_2',     coords: [44.79882,  41.69784]                       },
    { id: 'cedar-9',       model: 'cedar_2',     coords: [44.79952,  41.69678]                       },
    { id: 'cedar-10',      model: 'cedar_1',     coords: [44.79923,  41.69658]                       },
    { id: 'cedar-11',      model: 'cedar_1',     coords: [44.79936,  41.69646]                       },
    { id: 'cedar-12',      model: 'cedar_1',     coords: [44.79950,  41.69621]                       },
    { id: 'cedar-13',      model: 'cedar_2',     coords: [44.79961,  41.69612]                       },
    { id: 'cedar-14',      model: 'cedar_1',     coords: [44.79968,  41.69595]                       },
    { id: 'cedar-15',      model: 'cedar_2',     coords: [44.79978,  41.69580]                       },
    { id: 'cedar-16',      model: 'cedar_1',     coords: [44.79989,  41.69631]                       },
    { id: 'cedar-17',      model: 'cedar_1',     coords: [44.80020,  41.69584]                       },
    { id: 'cedar-18',      model: 'cedar_1',     coords: [44.80032,  41.69569]                       },
    { id: 'cedar-19',      model: 'cedar_1',     coords: [44.80038,  41.69560]                       },
    { id: 'cedar-20',      model: 'cedar_2',     coords: [44.80000,  41.69531]                       },
    { id: 'cedar-21',      model: 'cedar_1',     coords: [44.80015,  41.69509]                       },
    { id: 'cedar-22',      model: 'cedar_2',     coords: [44.80024,  41.69496]                       },
    { id: 'cedar-23',      model: 'cedar_1',     coords: [44.80042,  41.69528]                       },
    { id: 'cedar-24',      model: 'cedar_1',     coords: [44.80059,  41.69503]                       },
    { id: 'cedar-25',      model: 'cedar_2',     coords: [44.79791,  41.69907]                       },
    { id: 'cedar-26',      model: 'cedar_1',     coords: [44.79816,  41.69880]                       },
    { id: 'cedar-27',      model: 'cedar_1',     coords: [44.79927,  41.69649]                       },
    //these ones to update the coordiantes
    { id: 'cedar-28',      model: 'cedar_1',     coords: [44.79851,  41.69627]                       },
    { id: 'cedar-29',      model: 'cedar_2',     coords: [44.79869,  41.69636]                       },
    { id: 'cedar-30',      model: 'cedar_1',     coords: [44.79882,  41.69641]                       },
    { id: 'cedar-31',      model: 'cedar_1',     coords: [44.79832,  41.69622]                       },
    { id: 'cedar-32',      model: 'cedar_2',     coords: [44.79821,  41.69618]                       },
    //these ones to update the coordiantes
    { id: 'cedar-33',      model: 'cedar_1',     coords: [44.79971,  41.69654]                       },
    { id: 'cedar-34',      model: 'cedar_2',     coords: [44.79964,  41.69662]                       },

    // ── Bushes ───────────────────────────────────────────────────
    { id: 'bush-1',        model: 'bush',        coords: [44.79908,  41.69699, 2],   rotationY: 0    },
    { id: 'bush-2',        model: 'bush',        coords: [44.79911,  41.69696, 2],   rotationY: 0    },
    { id: 'bush-3',        model: 'bush',        coords: [44.79915,  41.69688, 2],   rotationY: 0    },
    { id: 'bush-4',        model: 'bush',        coords: [44.79920,  41.69680, 2],   rotationY: 0    },
    { id: 'bush-5',        model: 'bush',        coords: [44.79885,  41.69733, 2],   rotationY: 0    },
    { id: 'bush-6',        model: 'bush',        coords: [44.79888,  41.69729, 2],   rotationY: 0    },
    { id: 'bush-7',        model: 'bush',        coords: [44.79893,  41.69721, 2],   rotationY: 0    },

    // ── Mercedes (GD cars) ───────────────────────────────────────
    { id: 'mercedes-1',    model: 'mercedes',    coords: [44.79764,  41.69670],      rotationY: 40   },
    { id: 'mercedes-2',    model: 'mercedes',    coords: [44.79772,  41.69672],      rotationY: 40   },
    { id: 'mercedes-3',    model: 'mercedes',    coords: [44.79780,  41.69676],      rotationY: 40   },
    { id: 'mercedes-4',    model: 'mercedes',    coords: [44.79791,  41.69679],      rotationY: 40   },
    { id: 'mercedes-5',    model: 'mercedes',    coords: [44.79768,  41.69671],      rotationY: 40   },
    { id: 'mercedes-6',    model: 'mercedes',    coords: [44.79776,  41.69674],      rotationY: 40   },
    { id: 'mercedes-7',    model: 'mercedes',    coords: [44.79786,  41.69678],      rotationY: 40   },
    { id: 'mercedes-8',    model: 'mercedes',    coords: [44.79793,  41.69674],      rotationY: 40   },
    { id: 'mercedes-9',    model: 'mercedes',    coords: [44.79789,  41.69673],      rotationY: 40   },
    { id: 'mercedes-10',   model: 'mercedes',    coords: [44.79784,  41.69672],      rotationY: 40   },
    { id: 'mercedes-11',   model: 'mercedes',    coords: [44.79780,  41.69670],      rotationY: 40   },
    { id: 'mercedes-12',   model: 'mercedes',    coords: [44.79775,  41.69668],      rotationY: 40   },
    { id: 'mercedes-13',   model: 'mercedes',    coords: [44.79771,  41.69666],      rotationY: 40   },
    { id: 'mercedes-14',   model: 'mercedes',    coords: [44.79767,  41.69665],      rotationY: 40   },

];
