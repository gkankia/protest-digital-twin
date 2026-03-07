// ── main.js ───────────────────────────────────────────────────────────────────
// Depends on: models.js (MODELS), instances.js (INSTANCES)
// Requires:   Mapbox GL JS, Threebox

// ── Config ────────────────────────────────────────────────────────────────────
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yam9uZTkwIiwiYSI6ImNrZ3R6M2FvdTBwbmwycXBibGRqM2w2enYifQ.BxjvFSGqefuC9yFCrXC-nQ';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxDOqhSiuRb8x1lKhn6BWj8FTLGw7v-vD5S8edkrPzYF3PrpTSGNouOtZjZhL-XJTs/exec';
const AKATSUKI_HEIGHT = 1; // metres above ground for user figures

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
const userFigures   = [];
const genderKa      = { male: 'მამრობითი', female: 'მდედრობითი', other: 'სხვა' };

// ── Tooltip ───────────────────────────────────────────────────────────────────
const tooltip = document.getElementById('tooltip');

function showTooltip(x, y, nickname, age, gender) {
    tooltip.innerHTML     = `<strong>${nickname}</strong><br>ასაკი: ${age}<br>სქესი: ${genderKa[gender] || gender}`;
    tooltip.style.left    = (x + 14) + 'px';
    tooltip.style.top     = (y - 10) + 'px';
    tooltip.style.display = 'block';
}
function hideTooltip() { tooltip.style.display = 'none'; }

map.on('mousemove', (e) => {
    if (!userFigures.length) return;
    const mp = e.point;
    let found = false;
    for (const fig of userFigures) {
        const fp = map.project([fig.coords[0], fig.coords[1]]);
        const dx = mp.x - fp.x, dy = mp.y - fp.y;
        if (Math.sqrt(dx * dx + dy * dy) < 20) {
            showTooltip(mp.x, mp.y, fig.nickname, fig.age, fig.gender);
            found = true;
            break;
        }
    }
    if (!found) hideTooltip();
});

// ── Core loader ───────────────────────────────────────────────────────────────
// Appending ?i=<id> to the URL forces Threebox to treat each instance as a
// separate asset, preventing the shared-mesh bug that causes duplicate models
// to overwrite each other.

function loadAndPlace(inst, onDone) {
    const def = MODELS[inst.model];
    if (!def) { if (onDone) onDone(); return; }

    const alt    = inst.coords[2] || 0;
    const lngLat = [inst.coords[0], inst.coords[1]];

    tb.loadObj({
        type:     'glb',
        obj:      def.url + '?i=' + inst.id,
        scale:    def.scale,
        units:    'meters',
        rotation: { x: 90, y: inst.rotationY || 0, z: 0 },
        anchor:   'bottom',
    }, (obj) => {
        obj.setCoords([...lngLat, alt]);
        tb.add(obj);
        if (onDone) onDone();
    });
}

// Sequential queue — one model at a time, guaranteed order, no race conditions
function loadQueue(list, onDone) {
    let i = 0;
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

// On page load: fetch all rows, build inst list, drain as one sequential queue
async function loadExistingFigures() {
    try {
        const res  = await fetch(APPS_SCRIPT_URL);
        const data = await res.json();

        const instList = [];
        data.forEach((row) => {
            if (!row.latitude || !row.longitude) return;
            const coords = [parseFloat(row.longitude), parseFloat(row.latitude)];
            instList.push(buildAkatsukiInst(coords));
            userFigures.push({
                nickname: row.nickname || 'ანონიმური',
                age:      row.age      || '?',
                gender:   row.gender   || '?',
                coords,
            });
        });

        loadQueue(instList, null);

    } catch (err) {
        console.warn('ფიგურების ჩატვირთვა ვერ მოხერხდა:', err);
    }
}

// Live submission: single immediate load, no queue needed
function placeAkatsukiNow(coords, nickname, age, gender) {
    const inst = buildAkatsukiInst(coords);
    loadAndPlace(inst, null);
    userFigures.push({ nickname, age, gender, coords });
}

// ── Place mode ────────────────────────────────────────────────────────────────
let placingMode    = false;
let pendingCoords  = null;
let selectedGender = null;

const akatsukiBtn = document.getElementById('akatsuki-btn');
const placeHint   = document.getElementById('place-hint');
const overlay     = document.getElementById('modal-overlay');
const formView    = document.getElementById('form-view');
const successMsg  = document.getElementById('success-msg');
const submitBtn   = document.getElementById('submit-btn');

akatsukiBtn.addEventListener('click', () => {
    placingMode = !placingMode;
    akatsukiBtn.classList.toggle('active', placingMode);
    map.getCanvas().classList.toggle('placing', placingMode);
    placeHint.style.display = placingMode ? 'block' : 'none';
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && placingMode) {
        placingMode = false;
        akatsukiBtn.classList.remove('active');
        map.getCanvas().classList.remove('placing');
        placeHint.style.display = 'none';
    }
});

map.on('click', (e) => {
    if (!placingMode) return;
    pendingCoords = [e.lngLat.lng, e.lngLat.lat];
    placingMode   = false;
    akatsukiBtn.classList.remove('active');
    map.getCanvas().classList.remove('placing');
    placeHint.style.display = 'none';

    selectedGender = null;
    document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('nickname').value = '';
    document.getElementById('age').value      = '';
    document.getElementById('q1').value       = '';
    document.getElementById('q2').value       = '';
    document.getElementById('q3').value       = '';
    ['q1', 'q2', 'q3'].forEach(id => {
        document.getElementById(id + '-count').textContent = '0';
    });
    formView.style.display   = 'block';
    successMsg.style.display = 'none';
    submitBtn.textContent    = 'გაგზავნა';
    submitBtn.disabled       = false;
    overlay.classList.add('visible');
});

document.querySelectorAll('.gender-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedGender = btn.dataset.gender;
    });
});

['q1', 'q2', 'q3'].forEach(id => {
    document.getElementById(id).addEventListener('input', function () {
        document.getElementById(id + '-count').textContent = this.value.length;
    });
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('visible');
});

submitBtn.addEventListener('click', async () => {
    const nickname = document.getElementById('nickname').value.trim();
    const age      = document.getElementById('age').value.trim();
    if (!nickname)       { alert('გთხოვთ შეიყვანოთ მეტსახელი.');  return; }
    if (!age)            { alert('გთხოვთ შეიყვანოთ ასაკი.');      return; }
    if (!selectedGender) { alert('გთხოვთ აირჩიოთ სქესი.');        return; }

    submitBtn.textContent = '⏳ იგზავნება...';
    submitBtn.disabled    = true;

    const payload = {
        nickname, age,
        gender:    selectedGender,
        latitude:  pendingCoords[1],
        longitude: pendingCoords[0],
        q1: document.getElementById('q1').value.trim(),
        q2: document.getElementById('q2').value.trim(),
        q3: document.getElementById('q3').value.trim(),
    };

    try {
        await fetch(APPS_SCRIPT_URL, {
            method:  'POST',
            mode:    'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(payload),
        });
    } catch (err) {
        console.error('გაგზავნის შეცდომა:', err);
    }

    placeAkatsukiNow(pendingCoords, nickname, age, selectedGender);

    formView.style.display   = 'none';
    successMsg.style.display = 'block';
    setTimeout(() => overlay.classList.remove('visible'), 3000);
});

// ── About panel ───────────────────────────────────────────────────────────────
const aboutBtn     = document.getElementById('about-btn');
const aboutOverlay = document.getElementById('about-overlay');
const aboutClose   = document.getElementById('about-close');
const aboutBlur    = document.getElementById('about-blur');

aboutBtn.addEventListener('click',   () => aboutOverlay.classList.add('visible'));
aboutClose.addEventListener('click', () => aboutOverlay.classList.remove('visible'));
aboutBlur.addEventListener('click',  () => aboutOverlay.classList.remove('visible'));

// ── Init ──────────────────────────────────────────────────────────────────────
map.on('style.load', () => {
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
            // Load all static instances first, then load saved user figures
            loadQueue(INSTANCES, () => {
                loadExistingFigures();
            });
        },
        render() { tb.update(); }
    });
});
