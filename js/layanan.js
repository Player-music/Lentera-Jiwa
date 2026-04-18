'use strict';

/* ============================================================
   layanan.js (PERF v3.0 FIXED)
   PERBAIKAN: IIFE membungkus seluruh kode agar tidak ada
   identifier di global scope, dan event listener tidak menumpuk
   antar navigasi SPA.
   ============================================================ */

(function() {

  function initLayanan() {
    var scheduleChips = document.querySelectorAll('.schedule-chip');
    var modalityBtns  = document.querySelectorAll('.modality-btn');
    var faqBtns       = document.querySelectorAll('.faq-q');
    var bookingForm   = document.getElementById('booking-form');

    if (!bookingForm && scheduleChips.length === 0) return;

    scheduleChips.forEach(function(chip) {
      chip.addEventListener('click', function() {
        scheduleChips.forEach(function(c) { c.classList.remove('is-selected'); });
        chip.classList.add('is-selected');
        var waktuVal = document.getElementById('waktu-val');
        if (waktuVal) waktuVal.value = chip.dataset.time;
      });
    });

    modalityBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        modalityBtns.forEach(function(b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        var modeVal = document.getElementById('mode-val');
        if (modeVal) modeVal.value = btn.dataset.mode;
      });
    });

    faqBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var item   = btn.closest('.faq-item');
        var isOpen = item.classList.contains('is-open');
        document.querySelectorAll('.faq-item').forEach(function(i) {
          i.classList.remove('is-open');
          var q = i.querySelector('.faq-q');
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    if (bookingForm) {
      bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var btn    = document.getElementById('submit-btn');
        var nama   = document.getElementById('nama');
        var email  = document.getElementById('email');
        var telp   = document.getElementById('telp');

        if (!nama || !nama.value.trim()) {
          if (nama) nama.focus();
          if (window.LJ && window.LJ.ToastManager) window.LJ.ToastManager.show('Nama perlu diisi.', 'error');
          return;
        }
        if (!email || !email.value.trim() || !email.value.includes('@')) {
          if (email) email.focus();
          if (window.LJ && window.LJ.ToastManager) window.LJ.ToastManager.show('Format email belum tepat.', 'error');
          return;
        }
        if (!telp || !telp.value.trim() || telp.value.trim().length < 8) {
          if (telp) telp.focus();
          if (window.LJ && window.LJ.ToastManager) window.LJ.ToastManager.show('Nomor HP kurang valid.', 'error');
          return;
        }

        if (btn) {
          btn.textContent = 'Menghubungkan kamu dengan tim kami... 💜';
          btn.disabled    = true;
        }

        var timerId = setTimeout(function() {
          if (bookingForm) bookingForm.style.display = 'none';
          var formSuccess = document.getElementById('form-success');
          if (formSuccess) formSuccess.classList.add('is-visible');
        }, 1400);

        if (window.activeTimers) window.activeTimers.push(timerId);
      });
    }
  }

  initLayanan();

})();