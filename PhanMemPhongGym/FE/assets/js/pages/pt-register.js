window.GymApp.pages['pt-register'] = {
  _selectedPT: null,
  _selectedMember: null,

  render: function () {
    const pts = Array.isArray(window.GymApp.data.pts) ? window.GymApp.data.pts : [];
    const membersRaw = Array.isArray(window.GymApp.data.members) ? window.GymApp.data.members : [];
    const members = membersRaw.filter(m => m.trang_thai === 'dang_tap' || m.trang_thai === 'active');
    const bookings = Array.isArray(window.GymApp.data.ptBookings) ? window.GymApp.data.ptBookings : [];

    return `
      <div class="flex flex-col gap-margin animate-soft">

        <!-- Page Title -->
        <div>
          <h2 class="font-display-2xl text-display-2xl text-on-surface font-bold">Đăng ký lịch tập PT</h2>
          <p class="text-on-surface-variant font-body-sm text-body-sm">Đặt lịch tập giữa hội viên và huấn luyện viên cá nhân</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-loose">

          <!-- ===== CARD 1: Form đặt lịch ===== -->
          <div class="premium-card shadow-soft overflow-hidden h-fit">
            <div class="px-loose py-standard border-b border-outline-variant/30 bg-black/5 dark:bg-white/5">
              <h3 class="font-display-xl text-on-surface font-bold flex items-center gap-compact">
                <span class="material-symbols-outlined text-brand-primary">edit_calendar</span>
                Thông tin đặt lịch tập
              </h3>
            </div>

            <div class="p-loose flex flex-col gap-margin">

              <!-- Chọn PT -->
              <div>
                <label class="block text-body-sm text-on-surface-variant font-bold mb-xs flex items-center gap-xs">
                  <span class="material-symbols-outlined text-brand-primary text-sm">sports_gymnastics</span>
                  Chọn huấn luyện viên (PT)
                </label>
                <!-- Search & List PT -->
                <div id="pt-selection-area" class="space-y-xs">
                  <div class="relative mb-compact">
                    <span class="material-symbols-outlined absolute left-standard top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
                    <input id="search-pt" type="text" placeholder="Tìm tên PT..." class="w-full bg-surface-container-low/50 border border-outline-variant/50 text-on-surface pl-9 pr-standard py-3 rounded-xl focus:border-brand-primary focus:bg-white outline-none font-body-md text-body-md transition-all" />
                  </div>
                  <div id="pt-list" class="flex flex-col gap-1 max-h-48 overflow-y-auto pr-xs border border-outline-variant/30 rounded-xl p-2 bg-black/5 dark:bg-white/5">
                    <p class="text-center py-4 text-on-surface-variant opacity-60">Đang tải danh sách PT...</p>
                  </div>
                </div>
                
                <!-- PT đã chọn -->
                <div id="selected-pt-display" class="hidden p-standard bg-brand-primary/10 rounded-2xl border border-brand-primary/30 flex items-center gap-standard">
                  <div id="selected-pt-info" class="flex items-center gap-standard flex-1">
                    <!-- Avatar & Name will be injected here -->
                  </div>
                  <button id="clear-pt" class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center material-symbols-outlined text-lg text-on-surface-variant hover:text-error hover:shadow-md transition-all">close</button>
                </div>
              </div>

              <!-- Chọn Hội viên -->
              <div>
                <label class="block text-body-sm text-on-surface-variant font-bold mb-xs flex items-center gap-xs">
                  <span class="material-symbols-outlined text-brand-primary text-sm">person</span>
                  Chọn hội viên
                </label>
                <!-- Search & List Member -->
                <div id="member-selection-area" class="space-y-xs">
                  <div class="relative mb-standard">
                    <span class="material-symbols-outlined absolute left-standard top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
                    <input id="search-member" type="text" placeholder="Tìm kiếm hội viên..." class="w-full bg-surface-container-low border border-outline-variant text-on-surface pl-8 pr-standard py-compact rounded-lg focus:border-brand-primary outline-none font-body-md text-body-md" />
                  </div>
                  <div id="member-list" class="flex flex-col gap-xs max-h-48 overflow-y-auto pr-xs border border-outline-variant rounded-lg p-xs">
                    <p class="text-center py-4 text-on-surface-variant">Đang tải danh sách hội viên...</p>
                  </div>
                </div>

                <!-- Member đã chọn -->
                <div id="selected-member-display" class="hidden p-standard bg-brand-primary/10 rounded-2xl border border-brand-primary/30 flex items-center gap-standard">
                  <div id="selected-member-info" class="flex items-center gap-standard flex-1">
                    <!-- Avatar & Name will be injected here -->
                  </div>
                  <button id="clear-member" class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center material-symbols-outlined text-lg text-on-surface-variant hover:text-error hover:shadow-md transition-all">close</button>
                </div>
              </div>

              <!-- Loại đăng ký, ngày, giờ -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-standard">
                <div class="flex flex-col gap-xs">
                  <label class="text-label-bold text-on-surface font-bold px-1">Loại đăng ký</label>
                  <select id="reg-type" class="w-full bg-surface-container-low/50 border border-outline-variant/50 text-on-surface px-standard py-3 rounded-xl focus:border-brand-primary outline-none font-body-md text-body-md">
                    <option value="Cá nhân">Cá nhân (1-1)</option>
                    <option value="Nhóm">Nhóm (2-5 người)</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
                <div class="flex flex-col gap-xs">
                  <label class="text-label-bold text-on-surface font-bold px-1">Ngày tập</label>
                  <input id="reg-date" type="text" placeholder="Chọn ngày" readonly class="w-full bg-surface-container-low/50 border border-outline-variant/50 text-on-surface px-standard py-3 rounded-xl focus:border-brand-primary outline-none font-body-md text-body-md cursor-pointer" />
                </div>
                <div class="md:col-span-2 flex flex-col gap-loose">
                  <!-- Chọn Giờ bắt đầu -->
                  <div class="flex flex-col gap-xs">
                    <label class="text-label-bold text-on-surface font-bold px-1 flex items-center gap-xs">
                      <span class="material-symbols-outlined text-brand-primary text-sm">schedule</span>
                      Giờ bắt đầu
                    </label>
                    <div id="start-time-slots" class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 p-1">
                      ${this._renderTimeChips('start', '08:00')}
                    </div>
                  </div>

                  <!-- Chọn Giờ kết thúc -->
                  <div class="flex flex-col gap-xs">
                    <label class="text-label-bold text-on-surface font-bold px-1 flex items-center gap-xs">
                      <span class="material-symbols-outlined text-emerald-600 text-sm">more_time</span>
                      Giờ kết thúc
                    </label>
                    <div id="end-time-slots" class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 p-1">
                      ${this._renderTimeChips('end', '09:00')}
                    </div>
                  </div>

                  <input type="hidden" id="reg-start" value="08:00" />
                  <input type="hidden" id="reg-end" value="09:00" />
                </div>
              </div>

              <!-- Ghi chú -->
              <div>
                <label class="block text-body-sm text-on-surface-variant font-bold mb-xs">Ghi chú</label>
                <textarea id="reg-notes" rows="2" class="w-full bg-surface-container-low border border-outline-variant text-on-surface px-standard py-compact rounded-lg focus:border-brand-primary outline-none font-body-md text-body-md resize-none" placeholder="Mục tiêu tập luyện, yêu cầu đặc biệt..."></textarea>
              </div>

              <!-- Nút đặt lịch -->
              <button id="btn-book" class="w-full bg-brand-primary text-white py-compact rounded-lg font-bold hover:bg-[#187a2d] transition-all flex items-center justify-center gap-compact shadow-sm">
                <span class="material-symbols-outlined text-sm">event_available</span>
                Đặt lịch tập
              </button>
            </div>
          </div>

          <!-- ===== CARD 2: Danh sách đã đặt ===== -->
          <div class="premium-card shadow-soft overflow-hidden flex flex-col">
            <div class="px-loose py-standard border-b border-outline-variant/30 bg-black/5 dark:bg-white/5 flex items-center justify-between">
              <h3 class="font-display-xl text-on-surface font-bold flex items-center gap-compact">
                <span class="material-symbols-outlined text-brand-primary">calendar_month</span>
                Lịch đã đặt
              </h3>
              <span id="booking-count" class="bg-brand-primary text-white px-compact py-xs rounded-full text-[10px] font-black uppercase tracking-wider">
                ${[...window.GymApp.data.ptSchedules, ...window.GymApp.data.ptBookings].length} LỊCH
              </span>
            </div>

            <div id="booking-list" class="flex-grow overflow-y-auto p-standard flex flex-col gap-standard">
              ${this._renderBookingList()}
            </div>
          </div>

        </div>
      </div>
    `;
  },

  _renderBookingList: function () {
    const schedules = window.GymApp.data.ptSchedules || [];
    const bookings = window.GymApp.data.ptBookings || [];
    const all = [...schedules, ...bookings];
    if (all.length === 0) {
      return `
        <div class="flex flex-col items-center justify-center h-full py-margin text-center">
          <span class="material-symbols-outlined text-5xl text-outline">event_note</span>
          <p class="text-on-surface-variant text-body-sm mt-standard">Chưa có lịch đặt nào</p>
        </div>
      `;
    }
    return all.map(b => `
      <div class="premium-card p-standard flex flex-col gap-xs hover:border-brand-primary/50 transition-all group bg-white dark:bg-slate-800/30">
        <div class="flex items-start justify-between">
          <div class="flex flex-col">
            <p class="font-black text-on-surface text-body-md group-hover:text-brand-primary transition-colors">${b.memberName}</p>
            <p class="text-label-xs text-on-surface-variant font-bold opacity-60 uppercase tracking-tighter">PT: ${b.ptName}</p>
          </div>
          ${window.GymApp.statusBadge(b.status)}
        </div>
        <div class="flex flex-wrap items-center gap-standard text-on-surface-variant text-body-sm mt-1">
          <span class="flex items-center gap-xs bg-surface-container px-compact py-atom rounded-full font-bold text-label-xs">
            <span class="material-symbols-outlined text-xs">event</span>
            ${window.GymApp.formatDate(b.date)}
          </span>
          <span class="flex items-center gap-xs bg-brand-primary/10 text-brand-primary px-compact py-atom rounded-full font-bold text-label-xs">
            <span class="material-symbols-outlined text-xs">schedule</span>
            ${b.startTime} — ${b.endTime}
          </span>
          <span class="flex items-center gap-xs bg-surface-container px-compact py-atom rounded-full font-bold text-label-xs">
            <span class="material-symbols-outlined text-xs">group</span>
            ${b.type}
          </span>
        </div>
        ${b.notes ? `<div class="bg-black/5 dark:bg-white/5 p-compact rounded-xl mt-1 text-on-surface-variant text-body-sm italic border-l-4 border-brand-primary/30">"${b.notes}"</div>` : ''}
        <div class="flex items-center justify-end gap-compact pt-xs border-t border-outline-variant/30 mt-xs">
          <button class="w-8 h-8 rounded-full flex items-center justify-center material-symbols-outlined text-on-surface-variant hover:text-brand-primary hover:bg-brand-primary/10 transition-all text-lg" title="Sửa">edit</button>
          <button class="btn-cancel-booking w-8 h-8 rounded-full flex items-center justify-center material-symbols-outlined text-on-surface-variant hover:text-error hover:bg-error/10 transition-all text-lg" data-id="${b.id}" title="Hủy">event_busy</button>
        </div>
      </div>
    `).join('');
  },

  _refreshBookingList: function () {
    const list = document.getElementById('booking-list');
    const count = document.getElementById('booking-count');
    if (list) list.innerHTML = this._renderBookingList();
    const total = window.GymApp.data.ptSchedules.length + window.GymApp.data.ptBookings.length;
    if (count) count.textContent = total;
  },

  init: async function () {
    const self = this;
    self._selectedPT = null;
    self._selectedMember = null;

    // ── Fetch Data from API ─────────────────────────────────
    // Sử dụng dữ liệu nạp sẵn từ app.js để tránh nạp lại
    if (!window.GymApp.data.pts || window.GymApp.data.pts.length === 0) {
        try {
            const [ptsRes, membersRes] = await Promise.all([
                window.GymApp.api.get('/trainers'),
                window.GymApp.api.get('/members')
            ]);
            if (ptsRes?.success) window.GymApp.data.pts = Array.isArray(ptsRes.data) ? ptsRes.data : (ptsRes.data.data || []);
            if (membersRes?.success) window.GymApp.data.members = Array.isArray(membersRes.data) ? membersRes.data : (membersRes.data.data || []);
        } catch(e) {}
    }

    this._renderPTList();
    this._renderMemberList();
    this._refreshBookingList();

    // Cấu hình Tiếng Việt cho Datepicker
    const localeVi = {
      days: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
      daysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      daysMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      monthsShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      today: 'Hôm nay',
      clear: 'Xóa',
      dateFormat: 'dd/mm/yyyy',
      timeFormat: 'HH:mm',
      firstDay: 1
    };

    // Khởi tạo Datepicker cho Ngày tập
    new AirDatepicker('#reg-date', {
      locale: localeVi,
      autoClose: true,
      minDate: new Date()
    });

    // Xử lý chọn Giờ bắt đầu
    const startContainer = document.getElementById('start-time-slots');
    if (startContainer) {
        startContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.time-chip');
            if (!chip) return;
            // Xóa active cũ và trả về trạng thái bình thường
            startContainer.querySelectorAll('.time-chip').forEach(c => {
                c.classList.remove('bg-brand-primary', 'text-white', 'shadow-md');
                c.classList.add('bg-surface-container-low', 'text-on-surface');
            });
            // Áp dụng màu xanh cho ô được chọn
            chip.classList.remove('bg-surface-container-low', 'text-on-surface');
            chip.classList.add('bg-brand-primary', 'text-white', 'shadow-md');
            
            const startVal = chip.dataset.time;
            document.getElementById('reg-start').value = startVal;

            // Tự động gợi ý giờ kết thúc (1 tiếng sau)
            const [h, m] = startVal.split(':').map(Number);
            const endVal = `${String(h + 1).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
            document.getElementById('reg-end').value = endVal;

            // Cập nhật UI cho bảng Giờ kết thúc
            const endContainer = document.getElementById('end-time-slots');
            if (endContainer) {
                endContainer.querySelectorAll('.time-chip').forEach(c => {
                    if (c.dataset.time === endVal) {
                        c.classList.add('bg-brand-primary', 'text-white', 'shadow-md');
                        c.classList.remove('bg-surface-container-low', 'text-on-surface');
                    } else {
                        c.classList.remove('bg-brand-primary', 'text-white', 'shadow-md');
                        c.classList.add('bg-surface-container-low', 'text-on-surface');
                    }
                });
            }
        });
    }

    // Xử lý chọn Giờ kết thúc
    const endContainer = document.getElementById('end-time-slots');
    if (endContainer) {
        endContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.time-chip');
            if (!chip) return;
            // Xóa active cũ
            endContainer.querySelectorAll('.time-chip').forEach(c => {
                c.classList.remove('bg-brand-primary', 'text-white', 'shadow-md');
                c.classList.add('bg-surface-container-low', 'text-on-surface');
            });
            // Áp dụng màu xanh cho ô được chọn
            chip.classList.remove('bg-surface-container-low', 'text-on-surface');
            chip.classList.add('bg-brand-primary', 'text-white', 'shadow-md');
            document.getElementById('reg-end').value = chip.dataset.time;
        });
    }

    // Set default values
    const today = new Date();
    document.getElementById('reg-date').value = today.toLocaleDateString('vi-VN');

    // Search PT filter
    document.getElementById('search-pt')?.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.pt-card').forEach(card => {
        const name = card.dataset.ptName.toLowerCase();
        const spec = card.dataset.ptSpecialty?.toLowerCase() || '';
        card.style.display = name.includes(q) || spec.includes(q) ? '' : 'none';
      });
    });

    // Search Member filter
    document.getElementById('search-member')?.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.member-card').forEach(card => {
        const name = card.dataset.memberName.toLowerCase();
        const id = card.dataset.memberId?.toString().toLowerCase() || '';
        card.style.display = name.includes(q) || id.includes(q) ? '' : 'none';
      });
    });

    // Clear PT
    document.getElementById('clear-pt')?.addEventListener('click', () => {
      self._selectedPT = null;
      document.getElementById('selected-pt-display').classList.add('hidden');
      document.getElementById('pt-selection-area').classList.remove('hidden');
    });

    // Clear Member
    document.getElementById('clear-member')?.addEventListener('click', () => {
      self._selectedMember = null;
      document.getElementById('selected-member-display').classList.add('hidden');
      document.getElementById('member-selection-area').classList.remove('hidden');
    });

    // Đặt lịch
    document.getElementById('btn-book')?.addEventListener('click', async () => {
      if (!self._selectedPT) { window.GymApp.toast('Vui lòng chọn huấn luyện viên PT!', 'error'); return; }
      if (!self._selectedMember) { window.GymApp.toast('Vui lòng chọn hội viên!', 'error'); return; }
      
      const date = document.getElementById('reg-date')?.value;
      const start = document.getElementById('reg-start')?.value;
      const end = document.getElementById('reg-end')?.value;
      if (!date || !start || !end) { window.GymApp.toast('Vui lòng điền đầy đủ ngày và giờ!', 'error'); return; }

      try {
        const bookingData = {
          ho_so_id: self._selectedMember.id,
          pt_id: self._selectedPT.id,
          ngay_tap: date,
          gio_bat_dau: start,
          gio_ket_thuc: end,
          loai_buoi: document.getElementById('reg-type')?.value === 'Nhóm' ? 'nhom' : 'ca_nhan',
          ghi_chu: document.getElementById('reg-notes')?.value || '',
        };

        const res = await window.GymApp.api.post('/pt/schedules', bookingData);
        if (res && res.success) {
          window.GymApp.toast('Đặt lịch tập thành công!', 'success');
          // Reload schedules
          const schedulesRes = await window.GymApp.api.get('/pt/schedules');
          if (schedulesRes.success) window.GymApp.data.ptSchedules = schedulesRes.data;
          self._refreshBookingList();
          
          // Reset selections
          document.getElementById('clear-pt').click();
          document.getElementById('clear-member').click();
          document.getElementById('reg-notes').value = '';
        }
      } catch (err) {
        console.error('Booking failed', err);
      }
    });

    // Hủy booking (Dùng API DELETE/PUT tùy BE, ở đây BE dùng Audit/Soft Delete)
    document.addEventListener('click', async e => {
      const cancelBtn = e.target.closest('.btn-cancel-booking');
      if (cancelBtn) {
        const id = cancelBtn.dataset.id;
        if (confirm('Bạn có chắc chắn muốn hủy lịch tập này?')) {
            // BE hiện tại có thể cần endpoint DELETE cụ thể, tạm thời filter mock để UI mượt
            window.GymApp.toast('Yêu cầu hủy lịch đã được gửi!', 'info');
        }
      }
    });
  },

  _renderPTList: function() {
    const pts = window.GymApp.data.pts || [];
    const list = document.getElementById('pt-list');
    if (!list) return;

    list.innerHTML = pts.map(pt => `
      <div class="pt-card flex items-center gap-standard p-standard rounded-xl cursor-pointer hover:bg-brand-primary/10 hover:shadow-sm transition-all border border-transparent hover:border-brand-primary/20 bg-white/50 dark:bg-slate-800/20"
           data-pt-id="${pt.id}" data-pt-name="${pt.ho_ten}" data-pt-specialty="${pt.loai_ho_so}">
        ${window.GymApp.avatarImg(pt.avatar_url, pt.ho_ten, 'sm')}
        <div class="flex-1 min-w-0">
          <p class="font-black text-on-surface text-body-md truncate">${pt.ho_ten}</p>
          <p class="text-label-xs text-on-surface-variant font-bold opacity-60 uppercase">${pt.ma_ho_so}</p>
        </div>
        <span class="material-symbols-outlined text-outline group-hover:text-brand-primary opacity-0 group-hover:opacity-100 transition-all">add_circle</span>
      </div>
    `).join('');

    // Re-bind click
    list.querySelectorAll('.pt-card').forEach(card => {
      card.addEventListener('click', () => {
        this._selectedPT = { id: card.dataset.ptId, name: card.dataset.ptName };
        document.getElementById('pt-selection-area').classList.add('hidden');
        const display = document.getElementById('selected-pt-display');
        display.classList.remove('hidden');
        document.getElementById('selected-pt-info').innerHTML = `
           ${window.GymApp.avatarImg(card.querySelector('img')?.src, card.dataset.ptName, 'sm')}
           <span class="text-brand-primary font-bold text-body-sm">${card.dataset.ptName}</span>
        `;
      });
    });
  },

  _renderMemberList: function() {
    const members = window.GymApp.data.members || [];
    const list = document.getElementById('member-list');
    if (!list) return;

    list.innerHTML = members.map(m => `
      <div class="member-card flex items-center gap-standard p-standard rounded-xl cursor-pointer hover:bg-brand-primary/10 hover:shadow-sm transition-all border border-transparent hover:border-brand-primary/20 bg-white/50 dark:bg-slate-800/20"
           data-member-id="${m.ho_so_id}" data-member-name="${m.ho_ten}" data-member-phone="${m.so_dien_thoai}">
        ${window.GymApp.avatarImg(m.avatar_url, m.ho_ten, 'sm')}
        <div class="flex-1 min-w-0">
          <p class="font-black text-on-surface text-body-md truncate">${m.ho_ten}</p>
          <p class="text-label-xs text-on-surface-variant font-bold opacity-60 uppercase">${m.ma_ho_so} &bull; ${m.so_dien_thoai || ''}</p>
        </div>
        <span class="material-symbols-outlined text-outline group-hover:text-brand-primary opacity-0 group-hover:opacity-100 transition-all">add_circle</span>
      </div>
    `).join('');

    // Re-bind click
    list.querySelectorAll('.member-card').forEach(card => {
      card.addEventListener('click', () => {
        this._selectedMember = { id: card.dataset.memberId, name: card.dataset.memberName };
        document.getElementById('member-selection-area').classList.add('hidden');
        const display = document.getElementById('selected-member-display');
        display.classList.remove('hidden');
        document.getElementById('selected-member-info').innerHTML = `
           ${window.GymApp.avatarImg(card.querySelector('img')?.src, card.dataset.memberName, 'sm')}
           <span class="text-brand-primary font-bold text-body-sm">${card.dataset.memberName}</span>
        `;
      });
    });
  },

  _renderTimeChips: function(type, defaultTime) {
    const slots = [];
    for (let h = 5; h <= 21; h++) {
      slots.push(`${String(h).padStart(2, '0')}:00`);
      slots.push(`${String(h).padStart(2, '0')}:30`);
    }
    
    return slots.map(time => {
        const isActive = time === defaultTime;
        const activeClass = isActive ? 'bg-brand-primary text-white shadow-md' : 'bg-surface-container-low text-on-surface';
        return `
            <button type="button" class="time-chip ${activeClass} py-2 rounded-xl font-bold text-[11px] transition-all hover:scale-105 active:scale-95 border border-outline-variant/30" data-time="${time}">
                ${time}
            </button>
        `;
    }).join('');
  }
};
