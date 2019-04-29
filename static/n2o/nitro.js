// Nitrogen Compatibility Layer

function validateSources() { return true; }

function querySourceRaw(Id) {
    var val, edit, el = document.getElementById(Id);
    if (!el) return "";
    switch (el.tagName) {
    case 'FIELDSET': val = document.querySelector('[id="' + Id + '"] :checked');
        val = val ? val.value : ""; break;
    case 'INPUT':
        switch (el.getAttribute("type")) {
        case 'radio': case 'checkbox': val = el.checked ? el.value : ""; break;
        case 'date': val = Date.parse(el.value);  val = val && new Date(val) || ""; break;
        case 'calendar': val = pickers[el.id]._d || ""; break;  //only 4 nitro #calendar{}
        default: edit = el.contentEditable;
            if (edit && edit === 'true') val = el.innerHTML;
            else val = el.value;
        }
        break;
    case 'SELECT':
        if (el.multiple) {
            val = [];
            var options = el.options;
            var opt;

            for (var i=0, iLen=options.length; i<iLen; i++) {
              opt = options[i];

              if (opt.selected) {
                val.push(opt.value);
              }
            }
        } else {
            val = el.value;
        }
        break;
    case 'SVG': case 'svg':
        val = btor.getModel();
        break;
    default: edit = el.contentEditable;
        if (edit && edit === 'true') val = el.innerHTML;
        else val = el.value;
    }
    return val;
}

function querySource(Id) {
    var qs = querySourceRaw(Id);
    if (qs instanceof Date) {
        return tuple(number(qs.getFullYear()),
                     number(qs.getMonth() + 1),
                     number(qs.getDate()));
    } else if (qs instanceof Array) {
        return {t:108,v:qs.map(e => bin(e))};
    } else if (qs.tasks) {
        return btor.encode();
    }
    else { return bin(qs); }
}

(function () {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
})();
