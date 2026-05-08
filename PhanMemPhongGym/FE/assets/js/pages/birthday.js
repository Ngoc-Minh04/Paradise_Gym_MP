window.GymApp.pages['birthday'] = {
  _monthNames: [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ],
  _wishTemplates: [
    'Chúc bạn luôn mạnh khỏe, tràn đầy năng lượng và thật nhiều niềm vui!',
    'Tuổi mới bứt phá mọi mục tiêu, tập luyện sung và luôn rạng rỡ!',
    'Sinh nhật vui vẻ! Chúc bạn luôn hạnh phúc, bình an và thành công.',
  ],

  _getBirthdayGroups: function () {
    const currentYear = new Date().getFullYear();
    const rawMembers = window.GymApp.data.members;
    const membersList = Array.isArray(rawMembers) ? rawMembers : [];
    return Array.from({ length: 12 }, (_, idx) => {
      const month = idx + 1;
      const members = membersList
        .filter(m => {
          const bDay = m.ngay_sinh || m.dob;
          return bDay && typeof bDay === 'string' && Number(bDay.split('-')[1]) === month;
        })
        .map(m => {
          const bDay = m.ngay_sinh || m.dob;
          const [year, mth, day] = bDay.split('-').map(Number);
          return {
            ...m,
            birthDay: day,
            birthMonth: mth,
            ageThisYear: currentYear - year,
          };
        })
        .sort((a, b) => a.birthDay - b.birthDay || (a.ho_ten || '').localeCompare(b.ho_ten || '', 'vi'));
      return {
        month,
        label: this._monthNames[idx],
        members,
      };
    }).filter(group => group.members.length > 0);
  },

  _getTodayBirthdays: function () {
    const today = new Date();
    const todayMD = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const rawMembers = window.GymApp.data.members;
    const members = Array.isArray(rawMembers) ? rawMembers : [];
    return members.filter(m => {
      const bDay = m.ngay_sinh || m.dob;
      if (!bDay) return false;
      const parts = bDay.split('-');
      return `${parts[1]}-${parts[2]}` === todayMD;
    });
  },

  _normalizeLabel: function (text) {
    return String(text || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 90);
  },

  _getWishKey: function (memberName) {
    const cleanName = this._normalizeLabel(memberName).toLowerCase() || 'all';
    return `gym-birthday-wish-${cleanName}`;
  },

  _saveWish: function (memberName, wishText) {
    try {
      localStorage.setItem(this._getWishKey(memberName), wishText);
    } catch (err) {
      console.warn('Cannot save birthday wish:', err);
    }
  },

  _loadWish: function (memberName) {
    try {
      return localStorage.getItem(this._getWishKey(memberName)) || '';
    } catch (err) {
      return '';
    }
  },

  render: function () {
    const groups = this._getBirthdayGroups();
    const todayBirthdays = this._getTodayBirthdays();
    const busiestGroup = groups.reduce((best, group) => !best || group.members.length > best.members.length ? group : best, null);
    const totalMembersWithBirthday = groups.reduce((sum, group) => sum + group.members.length, 0);
    const currentMonth = new Date().getMonth() + 1;
    const currentGroup = groups.find(g => g.month === currentMonth);
    return `
      <div class="birthday-page flex flex-col gap-margin animate-soft">

        <div class="birthday-hero premium-card p-loose relative overflow-hidden">
          <div class="birthday-hero-glow"></div>
          <div class="birthday-hero-grid">
            <div>
              <p class="birthday-kicker">Sinh nhật hội viên Paradise GYM</p>
              <h2 class="font-display-lg text-display-lg text-on-surface font-black">Giao diện mới hiện đại, nổi bật và dễ thao tác</h2>
              <p class="text-on-surface-variant font-body-md opacity-80 mt-2">
                Quản lý sinh nhật trực quan theo tháng, chúc mừng nhanh chỉ với một chạm.
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-standard">
              <button id="btn-birthday-celebrate-all" class="birthday-action-btn bg-brand-primary text-white">
                <span class="material-symbols-outlined">celebration</span>
                Chúc mừng tất cả
              </button>
              <button id="btn-birthday-celebrate-month" class="birthday-action-btn birthday-action-secondary text-on-surface">
                <span class="material-symbols-outlined">rocket_launch</span>
                ${currentGroup ? `Bùng nổ ${currentGroup.label}` : 'Chúc mừng tháng này'}
              </button>
            </div>
          </div>
        </div>

        <div class="birthday-wish-panel premium-card p-loose">
          <div class="flex flex-col lg:flex-row lg:items-center gap-standard justify-between">
            <div>
              <h3 class="font-black text-on-surface text-display-md">Gửi lời chúc sinh nhật</h3>
              <p class="text-on-surface-variant text-body-sm opacity-80">Viết lời chúc riêng hoặc dùng mẫu nhanh để gửi thật tiện.</p>
            </div>
            <div class="birthday-wish-badge">
              <span class="material-symbols-outlined">mail</span>
              Tin nhắn chúc mừng
            </div>
          </div>

          <div class="birthday-wish-form-grid mt-standard">
            <div>
              <label for="birthday-wish-target" class="text-label-bold text-on-surface-variant uppercase">Người nhận</label>
              <select id="birthday-wish-target" class="w-full mt-1 bg-white/80 dark:bg-slate-800/70 border border-outline-variant">
                <option value="TẤT CẢ HỘI VIÊN">TẤT CẢ HỘI VIÊN</option>
                ${todayBirthdays.map(m => `<option value="${m.ho_ten}">${m.ho_ten} (hôm nay)</option>`).join('')}
              </select>
            </div>
            <div>
              <label for="birthday-wish-input" class="text-label-bold text-on-surface-variant uppercase">Nội dung lời chúc</label>
              <textarea id="birthday-wish-input" rows="3" maxlength="220" class="w-full mt-1 resize-none bg-white/80 dark:bg-slate-800/70 border border-outline-variant" placeholder="Ví dụ: Chúc bạn tuổi mới nhiều sức khỏe, tập đâu thắng đó!"></textarea>
            </div>
          </div>

          <div class="flex flex-wrap gap-compact mt-standard">
            ${this._wishTemplates.map((tmp, idx) => `
              <button class="birthday-wish-template" data-template="${tmp.replace(/"/g, '&quot;')}" type="button">
                <span class="material-symbols-outlined text-[14px]">auto_fix_high</span>
                Mẫu ${idx + 1}
              </button>
            `).join('')}
            <button id="birthday-send-wish" class="birthday-send-btn ml-auto" type="button">
              <span class="material-symbols-outlined">send</span>
              Gửi chúc mừng
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-standard">
          ${[
            { label: 'Hôm nay', value: todayBirthdays.length, icon: 'cake', tone: 'pink' },
            { label: 'Tổng hội viên có ngày sinh', value: totalMembersWithBirthday, icon: 'card_giftcard', tone: 'green' },
            { label: 'Số tháng có dữ liệu', value: groups.length, icon: 'event', tone: 'blue' },
            { label: busiestGroup ? `Đông nhất: ${busiestGroup.label}` : 'Đông nhất', value: busiestGroup ? busiestGroup.members.length : 0, icon: 'celebration', tone: 'amber' },
          ].map(s => `
            <div class="birthday-stat-card premium-card p-standard">
              <div class="birthday-stat-icon birthday-${s.tone}">
                <span class="material-symbols-outlined birthday-stat-symbol">${s.icon}</span>
              </div>
              <div class="min-w-0">
                <p class="text-on-surface-variant text-label-md font-semibold uppercase opacity-70 truncate">${s.label}</p>
                <p class="text-on-surface font-black text-display-2xl">${s.value}</p>
              </div>
            </div>
          `).join('')}
        </div>

        ${todayBirthdays.length > 0 ? `
          <div class="premium-card birthday-today-block p-loose relative overflow-hidden">
            <div class="birthday-today-decoration">
              <span class="material-symbols-outlined">auto_awesome</span>
            </div>
            <div class="relative z-10">
              <div class="flex items-center justify-between gap-standard flex-wrap">
                <h3 class="font-black text-on-surface text-display-md">Sinh nhật hôm nay</h3>
                <span class="birthday-pill"><span class="material-symbols-outlined text-[14px] mr-1">cake</span>${todayBirthdays.length} hội viên</span>
              </div>
              <p class="text-on-surface-variant text-body-sm mt-1">Chạm vào thẻ hội viên để bật hiệu ứng chúc mừng cao cấp.</p>
              <div class="flex flex-wrap gap-standard mt-standard">
                ${todayBirthdays.map(m => `
                  <div class="birthday-today-chip birthday-clickable flex items-center gap-standard premium-card p-standard" data-label="CHÚC MỪNG SINH NHẬT" data-count="${m.ho_ten}">
                    <div class="relative flex-shrink-0">
                      ${window.GymApp.avatarImg(m.avatar_url, m.ho_ten, 'lg')}
                      <div class="absolute -top-1 -right-1 bg-brand-primary text-white rounded-full p-0.5 shadow-sm">
                        <span class="material-symbols-outlined text-[10px]">cake</span>
                      </div>
                    </div>
                    <div>
                      <p class="font-black text-on-surface text-body-lg">${m.ho_ten}</p>
                      <p class="text-label-xs text-brand-primary font-bold uppercase">Nhấn để chúc mừng</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        ` : ''}

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-loose">
          ${groups.map(group => `
            <div class="premium-card birthday-month-card overflow-hidden flex flex-col">
              <div class="px-loose py-standard border-b border-outline-variant/40 flex items-center justify-between">
                <div class="flex items-center gap-compact">
                  <div class="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <span class="material-symbols-outlined text-brand-primary">cake</span>
                  </div>
                  <div>
                    <p class="font-black text-on-surface text-body-lg">${group.label}</p>
                    <p class="text-[11px] text-on-surface-variant font-bold opacity-70 uppercase tracking-wide">${group.members.length} hội viên</p>
                  </div>
                </div>
                <button class="birthday-burst-btn birthday-clickable w-10 h-10 rounded-full flex items-center justify-center bg-brand-primary text-white shadow-md" data-month="${group.month}" data-label="${group.label}" data-count="${group.members.length}">
                  <span class="material-symbols-outlined">auto_awesome</span>
                </button>
              </div>

              <div class="p-loose grid grid-cols-1 sm:grid-cols-2 gap-standard">
                ${group.members.map(m => `
                  <div class="birthday-member-row flex items-center gap-standard p-standard rounded-2xl bg-surface-container-low/50 border border-transparent">
                    ${window.GymApp.avatarImg(m.avatar_url, m.ho_ten, 'md')}
                    <div class="min-w-0">
                      <p class="font-black text-on-surface text-body-md truncate">${m.ho_ten}</p>
                      <div class="flex items-center gap-xs text-[10px] text-on-surface-variant font-bold uppercase opacity-60">
                        <span class="text-brand-primary">${String(m.birthDay).padStart(2, '0')}/${String(m.birthMonth).padStart(2, '0')}</span>
                        <span>•</span>
                        <span>${m.ageThisYear} TUỔI</span>
                      </div>
                    </div>
                    <button class="birthday-mini-wish birthday-clickable ml-auto" data-label="CHÚC MỪNG SINH NHẬT" data-count="${m.ho_ten}" title="Gửi chúc mừng nhanh">
                      <span class="material-symbols-outlined text-[16px]">send</span>
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  },

  _showBirthdayBurst: function (label, count) {
    document.getElementById('birthday-burst-layer')?.remove();

    const layer = document.createElement('div');
    layer.id = 'birthday-burst-layer';
    layer.style.cssText = 'position:fixed;inset:0;z-index:9997;pointer-events:none;overflow:hidden;';
    document.body.appendChild(layer);

    const colors = ['#1D9336', '#22c55e', '#f59e0b', '#ec4899', '#3b82f6', '#8b5cf6'];
    const icons = ['cake', 'card_giftcard', 'celebration', 'redeem', 'local_bar', 'stars'];

    const centerCard = document.createElement('div');
    centerCard.style.cssText = 'position:fixed;left:50%;top:40px;transform:translateX(-50%);z-index:9999;min-width:280px;max-width:min(88vw,500px);padding:14px 18px;border-radius:18px;border:1px solid rgba(29,147,54,0.24);background:rgba(255,255,255,0.94);box-shadow:0 18px 44px rgba(12,18,29,0.22);text-align:center;';
    centerCard.innerHTML = '<div style="display:flex;justify-content:center;gap:8px;margin-bottom:6px;"><span class="material-symbols-outlined" style="font-size:25px;color:#16a34a;">cake</span><span class="material-symbols-outlined" style="font-size:25px;color:#db2777;">card_giftcard</span><span class="material-symbols-outlined" style="font-size:25px;color:#f59e0b;">celebration</span></div><div style="font-weight:900;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:#102014;">' + label + '</div><div style="font-weight:700;font-size:12px;margin-top:2px;color:#1D9336;">Chúc mừng ' + count + '</div>';
    layer.appendChild(centerCard);

    centerCard.animate(
      [{ transform: 'translateX(-50%) translateY(-12px)', opacity: 0 }, { transform: 'translateX(-50%) translateY(0)', opacity: 1 }],
      { duration: 420, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }
    );

    for (let i = 0; i < 40; i++) {
      const icon = document.createElement('span');
      icon.className = 'material-symbols-outlined';
      icon.textContent = icons[Math.floor(Math.random() * icons.length)];
      icon.style.cssText = 'position:fixed;left:' + (5 + Math.random() * 90) + 'vw;top:105vh;z-index:9998;font-size:' + (18 + Math.random() * 9) + 'px;color:' + colors[Math.floor(Math.random() * colors.length)] + ';filter:drop-shadow(0 3px 8px rgba(0,0,0,0.2));';
      layer.appendChild(icon);
      const drift = -80 + Math.random() * 160;
      const up = -500 - Math.random() * 320;
      const rotate = -40 + Math.random() * 80;

      icon.animate(
        [
          { transform: 'translate(0,0) rotate(0deg) scale(0.7)', opacity: 0 },
          { transform: 'translate(' + drift + 'px,' + (up * 0.55) + 'px) rotate(' + rotate + 'deg) scale(1)', opacity: 1, offset: 0.35 },
          { transform: 'translate(' + (drift * 1.2) + 'px,' + up + 'px) rotate(' + (rotate * 1.7) + 'deg) scale(0.85)', opacity: 0 }
        ],
        { duration: 2200 + Math.random() * 900, easing: 'ease-out', fill: 'forwards', delay: Math.random() * 280 }
      );
      setTimeout(() => icon.remove(), 3400);
    }

    for (let i = 0; i < 22; i++) {
      const sparkle = document.createElement('div');
      const size = 6 + Math.random() * 8;
      sparkle.style.cssText = 'position:fixed;left:' + (8 + Math.random() * 84) + 'vw;top:' + (15 + Math.random() * 65) + 'vh;width:' + size + 'px;height:' + size + 'px;border-radius:999px;background:rgba(255,255,255,0.95);z-index:9997;';
      layer.appendChild(sparkle);
      sparkle.animate(
        [{ transform: 'scale(0.2)', opacity: 0 }, { transform: 'scale(1.4)', opacity: 0.9, offset: 0.35 }, { transform: 'scale(2)', opacity: 0 }],
        { duration: 1300 + Math.random() * 500, easing: 'ease-out', fill: 'forwards', delay: Math.random() * 500 }
      );
      setTimeout(() => sparkle.remove(), 2500);
    }

    centerCard.animate(
      [{ opacity: 1 }, { opacity: 1, offset: 0.78 }, { opacity: 0 }],
      { duration: 3000, easing: 'ease-out', fill: 'forwards' }
    );

    setTimeout(() => layer.remove(), 3300);
  },

  init: function () {
    const self = this;

    document.querySelectorAll('.birthday-burst-btn, .birthday-today-chip, .birthday-mini-wish').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        self._showBirthdayBurst(btn.dataset.label, btn.dataset.count);
      });
    });

    document.getElementById('btn-birthday-celebrate-all')?.addEventListener('click', e => {
      self._showBirthdayBurst('PARADISE GYM', 'TẤT CẢ HỘI VIÊN');
    });

    document.getElementById('btn-birthday-celebrate-month')?.addEventListener('click', () => {
      const currentMonth = new Date().getMonth() + 1;
      const currentGroup = self._getBirthdayGroups().find(g => g.month === currentMonth);
      self._showBirthdayBurst(
        currentGroup ? currentGroup.label : 'THÁNG NÀY',
        currentGroup ? `${currentGroup.members.length} HỘI VIÊN` : 'CHƯA CÓ DỮ LIỆU'
      );
    });

    const targetSelect = document.getElementById('birthday-wish-target');
    const wishInput = document.getElementById('birthday-wish-input');
    const sendBtn = document.getElementById('birthday-send-wish');

    if (targetSelect && wishInput) {
      wishInput.value = self._loadWish(targetSelect.value);
      targetSelect.addEventListener('change', () => {
        wishInput.value = self._loadWish(targetSelect.value);
      });
    }

    document.querySelectorAll('.birthday-wish-template').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!wishInput) return;
        wishInput.value = btn.dataset.template || '';
        wishInput.focus();
      });
    });

    sendBtn?.addEventListener('click', () => {
      if (!targetSelect || !wishInput) return;
      const target = self._normalizeLabel(targetSelect.value);
      const wish = self._normalizeLabel(wishInput.value);
      if (!wish) {
        window.GymApp.toast('Vui lòng nhập lời chúc trước khi gửi.', 'info');
        wishInput.focus();
        return;
      }
      self._saveWish(target, wish);
      self._showBirthdayBurst(target, wish.slice(0, 32) + (wish.length > 32 ? '...' : ''));
      window.GymApp.toast('Đã lưu và gửi lời chúc sinh nhật.', 'success');
    });
  }
};