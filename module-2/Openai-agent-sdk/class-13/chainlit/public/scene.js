/* Nova — ambient background scene.
 *
 * Two jobs:
 *   1. Paint a slow field of glowing orbs + faint stars behind the app.
 *   2. Publish the cursor position as --nova-mx / --nova-my so style.css can
 *      tilt the message cards. CSS does the tilt; JS only supplies the numbers.
 *
 * Bails out entirely under prefers-reduced-motion, and stops drawing when the
 * tab is hidden so it costs nothing in the background.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var canvas = null;
  var ctx = null;
  var orbs = [];
  var stars = [];
  var frame = null;
  var dpr = 1;

  // Kept deliberately blue. Earlier teal-heavy entries pulled the whole
  // background green once the orbs overlapped in "lighter" blend mode.
  var PALETTE = [
    [56, 150, 255],
    [70, 120, 245],
    [96, 128, 255],
    [40, 170, 235],
  ];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function build() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    // Scale the orb count to the viewport so a laptop isn't doing phone work
    // and a large display doesn't look empty.
    var orbCount = Math.max(5, Math.min(11, Math.round((w * h) / 190000)));
    orbs = [];
    for (var i = 0; i < orbCount; i++) {
      var color = PALETTE[i % PALETTE.length];
      orbs.push({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(w * 0.12, w * 0.28),
        vx: rand(-0.16, 0.16),
        vy: rand(-0.12, 0.12),
        color: color,
        alpha: rand(0.11, 0.2),
        depth: rand(0.3, 1),
      });
    }

    var starCount = Math.round((w * h) / 9000);
    stars = [];
    for (var j = 0; j < starCount; j++) {
      stars.push({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.4, 1.3),
        a: rand(0.12, 0.5),
        tw: rand(0.4, 1.6),
        phase: rand(0, Math.PI * 2),
        depth: rand(0.2, 1),
      });
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  // Cursor state. target* is written on mousemove; cur* eases toward it so the
  // parallax glides instead of snapping.
  var targetX = 0;
  var targetY = 0;
  var curX = 0;
  var curY = 0;

  function onPointerMove(e) {
    targetX = (e.clientX / window.innerWidth) * 2 - 1;
    targetY = (e.clientY / window.innerHeight) * 2 - 1;
  }

  function isDarkTheme() {
    return document.documentElement.classList.contains("dark");
  }

  function draw(now) {
    var t = now / 1000;
    var w = window.innerWidth;
    var h = window.innerHeight;

    curX += (targetX - curX) * 0.05;
    curY += (targetY - curY) * 0.05;

    var root = document.documentElement;
    root.style.setProperty("--nova-mx", curX.toFixed(4));
    root.style.setProperty("--nova-my", curY.toFixed(4));

    ctx.clearRect(0, 0, w, h);

    // Light mode has a pale ground, so the additive blend that makes orbs glow
    // on black turns them into muddy smears. Draw softer and normally instead.
    var dark = isDarkTheme();
    ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
    var intensity = dark ? 1 : 0.4;

    for (var i = 0; i < orbs.length; i++) {
      var o = orbs[i];

      o.x += o.vx;
      o.y += o.vy;

      // Wrap with a margin of one radius so orbs drift off and back on smoothly.
      if (o.x < -o.r) o.x = w + o.r;
      if (o.x > w + o.r) o.x = -o.r;
      if (o.y < -o.r) o.y = h + o.r;
      if (o.y > h + o.r) o.y = -o.r;

      var px = o.x - curX * 26 * o.depth;
      var py = o.y - curY * 26 * o.depth;
      var pulse = 1 + Math.sin(t * 0.5 + i) * 0.06;
      var r = o.r * pulse;

      var g = ctx.createRadialGradient(px, py, 0, px, py, r);
      var c = o.color;
      g.addColorStop(0, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + o.alpha * intensity + ")");
      g.addColorStop(0.55, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + o.alpha * 0.3 * intensity + ")");
      g.addColorStop(1, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",0)");

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (dark) {
      for (var j = 0; j < stars.length; j++) {
        var s = stars[j];
        var tw = 0.55 + 0.45 * Math.sin(t * s.tw + s.phase);
        ctx.fillStyle = "rgba(190,220,255," + (s.a * tw).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(s.x - curX * 12 * s.depth, s.y - curY * 12 * s.depth, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalCompositeOperation = "source-over";
    frame = window.requestAnimationFrame(draw);
  }

  function start() {
    if (frame === null) frame = window.requestAnimationFrame(draw);
  }

  function stop() {
    if (frame !== null) {
      window.cancelAnimationFrame(frame);
      frame = null;
    }
  }

  function teardown() {
    stop();
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("visibilitychange", onVisibility);
    if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    canvas = null;
    ctx = null;
    document.documentElement.style.removeProperty("--nova-mx");
    document.documentElement.style.removeProperty("--nova-my");
  }

  function onVisibility() {
    if (document.hidden) stop();
    else start();
  }

  function init() {
    if (reduceMotion.matches || canvas) return;

    canvas = document.createElement("canvas");
    canvas.id = "nova-canvas";
    canvas.setAttribute("aria-hidden", "true");
    ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas = null;
      return;
    }

    document.body.appendChild(canvas);
    resize();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    start();
  }

  // Respect the setting if the user flips it while the app is open.
  var onMotionChange = function () {
    if (reduceMotion.matches) teardown();
    else init();
  };
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", onMotionChange);
  else if (reduceMotion.addListener) reduceMotion.addListener(onMotionChange);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
