Shen_repl = function(div) {
  function puts(str) {
    var out = document.getElementById("shen_repl_out");
    if (out == null)
      return;
    var s = str.split("\n"), n = s.length - 1;
    for (var j = 0; j < n; ++j) {
      out.appendChild(document.createTextNode(s[j]));
      out.appendChild(document.createElement("br"));
    }
    out.appendChild(document.createTextNode(s[n]));
  }

  function mk_output() {
    var div = document.createElement("div");
    div.id = "shen_repl_out";
    div.className = "shen_repl_out shen_tt_font";
    return div;
  }

  function mk_input_keypress(fn) {
    function onkeypress(e) {
      fn();
      var key = e.keyCode || e.which;
      if (key != 0xd)
        return true;
      if (e.ctrlKey) {
        this.value += "\n";
        return true;
      }
      puts(this.value);
      this.value = "";
      this.rows = 1;
      return false;
    }
    return onkeypress;
  }

  function resize_textarea(t, out) {
    var st = (window.getComputedStyle === undefined)
             ? t.currentStyle : getComputedStyle(t);
    var bt = parseInt(st.borderTopWidth, 10);
    var bb = parseInt(st.borderBottomWidth, 10);
    var mt = parseInt(st.marginTop, 10);
    var mb = parseInt(st.marginBottom, 10);
    t.style.height = 0;
    t.style.height = t.scrollHeight + bt + bb + mt + mb + "px";
    var sd = out.scrollHeight - out.scrollTop;
    out.style.bottom = (out.parentNode.offsetHeight - t.offsetTop) + "px";
    if (Math.abs(sd - out.clientHeight) < 5)
      out.scrollTop = out.scrollHeight;
  }

  function mk_input(out) {
    var t = document.createElement("textarea");
    function deferred_resize_textarea() {
      setTimeout(function() {resize_textarea(t, out);}, 1);
    }
    t.id = "shen_repl_in";
    t.className += " shen_repl_in shen_tt_font";
    t.placeholder = ">";
    t.cols = 72;
    t.rows = 1;
    t.spellcheck = false;
    t.addEventListener("change", deferred_resize_textarea);
    t.addEventListener("keyup", mk_input_keypress(deferred_resize_textarea));
    return t;
  }

  function mk(div) {
    div = document.getElementById(div);
    Shen_web.clean(div);
    var out = mk_output();
    var t = mk_input(out);
    div.appendChild(out);
    div.appendChild(t);
    resize_textarea(t, out);
  }
  mk(div);
}