// ── main.js ───────────────────────────────────────────────────────────────────
// Depends on: models.js (MODELS), instances.js (INSTANCES)
// Requires:   Mapbox GL JS, Threebox

// ── Config ────────────────────────────────────────────────────────────────────
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yam9uZTkwIiwiYSI6ImNrZ3R6M2FvdTBwbmwycXBibGRqM2w2enYifQ.BxjvFSGqefuC9yFCrXC-nQ';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzkJBCR8AL3vg7yYPigMklJdWWP8mS9clKbZ54fbXE8iz78lG2pCRIOqSooheDwDCoN/exec';
const AKATSUKI_HEIGHT = 1;

// ── Map ───────────────────────────────────────────────────────────────────────
const map = new mapboxgl.Map({
    container:  'map',
    style:      'mapbox://styles/jorjone90/cmmb415n1001g01s4240j3jdf',
    projection: 'globe',
    zoom:       17.8,
    minZoom:    17.5,
    maxZoom:    19.5,
    center:     [44.799, 41.697],
    pitch:      52.76,
    bearing:    -132.62,
    antialias:  true,
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.enable();

// ── State ─────────────────────────────────────────────────────────────────────
let tb;
let akatsukiCounter = 0;
let recordCounter   = 0;
const userFigures   = [];

// ── Auto-generated name ───────────────────────────────────────────────────────
function generateName(n) {
    return 'ანონიმური აკაცუკი #' + n;
}

// ── Tooltip ───────────────────────────────────────────────────────────────────
const tooltip = document.getElementById('tooltip');

function showTooltip(x, y, label) {
    tooltip.innerHTML     = '<strong>' + label + '</strong>';
    tooltip.style.left    = (x + 14) + 'px';
    tooltip.style.top     = (y - 10) + 'px';
    tooltip.style.display = 'block';
}
function hideTooltip() { tooltip.style.display = 'none'; }

map.on('mousemove', function(e) {
    if (!userFigures.length) return;
    var mp = e.point;
    var found = false;
    for (var i = 0; i < userFigures.length; i++) {
        var fig = userFigures[i];
        var fp = map.project([fig.coords[0], fig.coords[1]]);
        var dx = mp.x - fp.x, dy = mp.y - fp.y;
        if (Math.sqrt(dx * dx + dy * dy) < 20) {
            showTooltip(mp.x, mp.y, fig.label);
            found = true;
            break;
        }
    }
    if (!found) hideTooltip();
});

// ── Core loader ───────────────────────────────────────────────────────────────
function loadAndPlace(inst, onDone) {
    var def = MODELS[inst.model];
    if (!def) { if (onDone) onDone(); return; }

    var alt    = inst.coords[2] || 0;
    var lngLat = [inst.coords[0], inst.coords[1]];

    tb.loadObj({
        type:     'glb',
        obj:      def.url + '?i=' + inst.id,
        scale:    def.scale,
        units:    'meters',
        rotation: { x: 90, y: inst.rotationY || 0, z: 0 },
        anchor:   'bottom',
    }, function(obj) {
        obj.setCoords([lngLat[0], lngLat[1], alt]);
        tb.add(obj);
        if (onDone) onDone();
    });
}

function loadQueue(list, onDone) {
    var i = 0;
    function next() {
        if (i >= list.length) { if (onDone) onDone(); return; }
        loadAndPlace(list[i++], next);
    }
    next();
}

// ── User figures ──────────────────────────────────────────────────────────────
function buildAkatsukiInst(coords) {
    akatsukiCounter++;
    return {
        id:        'user-' + akatsukiCounter,
        model:     'akatsuki',
        coords:    [coords[0], coords[1], AKATSUKI_HEIGHT],
        rotationY: 0,
    };
}

async function loadExistingFigures() {
    try {
        var res  = await fetch(APPS_SCRIPT_URL);
        var data = await res.json();
        recordCounter = data.length;
        var instList = [];
        data.forEach(function(row) {
            if (!row.latitude || !row.longitude) return;
            var coords = [parseFloat(row.longitude), parseFloat(row.latitude)];
            instList.push(buildAkatsukiInst(coords));
            // Use the label stored in the sheet, fall back to entry number
            var label = row.label || generateName(row.entry || akatsukiCounter);
            userFigures.push({ label: label, coords: coords });
        });
        loadQueue(instList, null);
    } catch(e) {}
}

function placeAkatsukiNow(coords) {
    recordCounter++;
    var inst = buildAkatsukiInst(coords);
    loadAndPlace(inst, null);
    userFigures.push({ label: generateName(recordCounter), coords: coords });
}

// ── UI elements ───────────────────────────────────────────────────────────────
var akatsukiBtn  = document.getElementById('akatsuki-btn');
var placeHint    = document.getElementById('place-hint');
var overlay      = document.getElementById('modal-overlay');
var formView     = document.getElementById('form-view');
var successMsg   = document.getElementById('success-msg');
var submitBtn    = document.getElementById('submit-btn');
var aboutBtn     = document.getElementById('about-btn');
var aboutOverlay = document.getElementById('about-overlay');
var aboutClose   = document.getElementById('about-close');
var aboutBlur    = document.getElementById('about-blur');

// ── Place mode ────────────────────────────────────────────────────────────────
var placingMode   = false;
var pendingCoords = null;

akatsukiBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    placingMode = !placingMode;
    akatsukiBtn.classList.toggle('active', placingMode);
    map.getCanvas().classList.toggle('placing', placingMode);
    placeHint.style.display = placingMode ? 'block' : 'none';
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && placingMode) {
        placingMode = false;
        akatsukiBtn.classList.remove('active');
        map.getCanvas().classList.remove('placing');
        placeHint.style.display = 'none';
    }
});

map.on('click', function(e) {
    if (!placingMode) return;

    pendingCoords = [e.lngLat.lng, e.lngLat.lat];
    placingMode   = false;
    akatsukiBtn.classList.remove('active');
    map.getCanvas().classList.remove('placing');
    placeHint.style.display = 'none';

    // Reset form fields
    document.getElementById('q1').value = '';
    document.getElementById('q2').value = '';
    document.getElementById('q3').value = '';
    document.getElementById('q1-count').textContent = '0';
    document.getElementById('q2-count').textContent = '0';
    document.getElementById('q3-count').textContent = '0';

    formView.style.display   = 'block';
    successMsg.style.display = 'none';
    submitBtn.textContent    = 'გაგზავნა';
    submitBtn.disabled       = false;

    overlay.classList.add('visible');
});

// Character counters
document.getElementById('q1').addEventListener('input', function() {
    document.getElementById('q1-count').textContent = this.value.length;
});
document.getElementById('q2').addEventListener('input', function() {
    document.getElementById('q2-count').textContent = this.value.length;
});
document.getElementById('q3').addEventListener('input', function() {
    document.getElementById('q3-count').textContent = this.value.length;
});

// Close modal on backdrop click
overlay.addEventListener('click', function(e) {
    e.stopPropagation();
    if (e.target === overlay) overlay.classList.remove('visible');
});

// ── Submit ────────────────────────────────────────────────────────────────────
submitBtn.addEventListener('click', async function() {
    submitBtn.textContent = '⏳ იგზავნება...';
    submitBtn.disabled    = true;

    var entryNumber = recordCounter + 1;
    var entryLabel  = generateName(entryNumber);

    var payload = {
        entry:     entryNumber,
        label:     entryLabel,
        latitude:  pendingCoords[1],
        longitude: pendingCoords[0],
        q1:        document.getElementById('q1').value.trim(),
        q2:        document.getElementById('q2').value.trim(),
        q3:        document.getElementById('q3').value.trim(),
    };

    try {
        await fetch(APPS_SCRIPT_URL, {
            method:  'POST',
            headers: { 'Content-Type': 'text/plain' },
            body:    JSON.stringify(payload),
        });
    } catch(e) {}

    placeAkatsukiNow(pendingCoords);

    formView.style.display   = 'none';
    successMsg.style.display = 'block';
    setTimeout(function() { overlay.classList.remove('visible'); }, 3000);
});

// ── About panel ───────────────────────────────────────────────────────────────
aboutBtn.addEventListener('click', function() {
    aboutOverlay.classList.add('visible');
});
aboutClose.addEventListener('click', function() {
    aboutOverlay.classList.remove('visible');
});
aboutBlur.addEventListener('click', function() {
    aboutOverlay.classList.remove('visible');
});

// ── Init ──────────────────────────────────────────────────────────────────────
map.on('style.load', function() {
    map.setFog({});

    tb = new Threebox(
        map,
        map.getCanvas().getContext('webgl'),
        { defaultLights: true }
    );
    window.tb = tb;

    map.addLayer({
        id:            'all-models',
        type:          'custom',
        renderingMode: '3d',
        onAdd() {
            // Load akatsuki user figures first, then static instances
            loadExistingFigures().then(() => {
                loadQueue(INSTANCES, null);
            });
        },
        render: function() { tb.update(); }
    });
});