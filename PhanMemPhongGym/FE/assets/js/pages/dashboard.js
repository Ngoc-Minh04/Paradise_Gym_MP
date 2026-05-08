window.GymApp.pages['dashboard'] = {
  render: function () {
    const d = window.GymApp.data;
    const dbData = d.stats || {
      hoi_vien: { tong: 0, con_han: 0, sap_het_han: 0, het_han: 0, chua_dang_ky: 0 },
      tong_pt: 0,
      doanh_thu_hom_nay: { tong_tien: 0, tong_don: 0 },
      luot_vao_ra_hom_nay: { tong_luot: 0, luot_vao: 0 },
      lich_tap_hom_nay: { tong: 0, cho_tap: 0, da_tap: 0 },
      recent_checkins: []
    };

    const recentCheckins = (dbData.recent_checkins || []).map(c => ({
      id: c.id,
      memberId: c.ma_ho_so,
      name: c.ho_ten,
      time: new Date(c.thoi_diem).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      avatar: c.avatar_url
    }));

    return `
      <div class="flex flex-col gap-margin animate-soft">

        <!-- Stat Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-loose">
          ${[
            { icon: 'groups', label: 'Tổng hội viên', value: dbData.hoi_vien.tong, sub: `${dbData.hoi_vien.con_han} đang hoạt động`, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
            { icon: 'login', label: 'Check-in hôm nay', value: dbData.luot_vao_ra_hom_nay.luot_vao, sub: 'Lượt vào tập', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
            { icon: 'warning', label: 'Sắp hết hạn', value: dbData.hoi_vien.sap_het_han, sub: 'Cần gia hạn sớm', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
            { icon: 'payments', label: 'Doanh thu hôm nay', value: window.GymApp.formatCurrency(dbData.doanh_thu_hom_nay?.tong_tien || 0), sub: 'Tiền thu thực tế', color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
          ].map(c => `
            <div class="premium-card p-loose flex items-center gap-standard shadow-soft">
              <div class="w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined ${c.color} text-2xl font-bold">${c.icon}</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider font-bold opacity-60 truncate">${c.label}</span>
                <span class="${c.color} font-display-xl text-display-xl font-black truncate">${c.value}</span>
                <span class="text-on-surface-variant font-label-xs text-label-xs mt-1">${c.sub}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-loose">

          <!-- Biểu đồ doanh thu theo tháng -->
          <div class="premium-card p-loose shadow-soft">
            <div class="flex items-center justify-between mb-standard">
              <h3 class="font-display-xl text-on-surface font-bold">Doanh thu theo tháng</h3>
              <span class="text-label-xs text-on-surface-variant bg-surface-container px-compact py-atom rounded-full">triệu VNĐ</span>
            </div>
            <div style="height:250px">
              <canvas id="chart-revenue"></canvas>
            </div>
          </div>

          <!-- Biểu đồ gói tập -->
          <div class="premium-card p-loose shadow-soft">
            <h3 class="font-display-xl text-on-surface font-bold mb-standard">Phân bố trạng thái hội viên</h3>
            <div style="height:250px">
              <canvas id="chart-packages"></canvas>
            </div>
          </div>
        </div>

        <!-- Bottom Row -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-loose">

          <!-- Check-in gần nhất -->
          <div class="premium-card shadow-soft overflow-hidden">
            <div class="px-loose py-standard border-b border-outline-variant/30 flex items-center justify-between bg-black/5 dark:bg-white/5">
              <h3 class="font-display-xl text-on-surface font-bold">Check-in gần nhất</h3>
              <button class="text-brand-primary font-label-bold text-label-bold hover:underline px-standard py-atom rounded-full hover:bg-brand-primary/10 transition-all" data-page="checkin">Tất cả</button>
            </div>
            <div class="divide-y divide-outline-variant/30">
              ${recentCheckins.map(c => `
                <div class="flex items-center gap-standard px-loose py-standard hover:bg-surface-container-low/30 transition-all">
                  ${window.GymApp.avatarImg(c.avatar, c.name, 'sm')}
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-on-surface text-body-md truncate">${c.name}</p>
                    <p class="text-label-xs text-on-surface-variant font-bold opacity-60">${c.memberId}</p>
                  </div>
                  <div class="flex flex-col items-end gap-1">
                    <span class="text-label-bold text-brand-primary font-bold">${c.time}</span>
                    <span class="text-[10px] text-on-surface-variant opacity-50 uppercase">vừa vào</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Phân bổ trạng thái -->
          <div class="premium-card shadow-soft overflow-hidden">
            <div class="px-loose py-standard border-b border-outline-variant/30 flex items-center justify-between bg-black/5 dark:bg-white/5">
              <h3 class="font-display-xl text-on-surface font-bold">Tình trạng hội viên</h3>
              <button class="text-brand-primary font-label-bold text-label-bold hover:underline px-standard py-atom rounded-full hover:bg-brand-primary/10 transition-all" data-page="members-list">Chi tiết</button>
            </div>
            <div class="p-loose space-y-compact">
              ${[
                { label: 'Đang hoạt động (Còn hạn)', val: dbData.hoi_vien.con_han, color: 'bg-brand-primary', text: 'text-brand-primary' },
                { label: 'Sắp hết hạn (7 ngày)', val: dbData.hoi_vien.sap_het_han, color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
                { label: 'Đã hết hạn tập', val: dbData.hoi_vien.het_han, color: 'bg-error', text: 'text-error' },
                { label: 'Chưa đăng ký gói', val: dbData.hoi_vien.chua_dang_ky, color: 'bg-outline', text: 'text-on-surface-variant' },
              ].map(s => `
                <div class="flex items-center justify-between p-standard rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all">
                  <div class="flex items-center gap-standard">
                    <div class="w-3 h-3 rounded-full ${s.color}"></div>
                    <span class="text-on-surface text-body-md font-medium">${s.label}</span>
                  </div>
                  <span class="font-black ${s.text} text-display-xl">${s.val}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
${dbData.hoi_vien.chua_dang_ky}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-loose">
            <div class="premium-card p-loose shadow-soft flex items-center gap-loose">
                <div class="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center">
                    <span class="material-symbols-outlined text-brand-primary text-2xl">sports_gymnastics</span>
                </div>
                <div>
                    <p class="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider font-bold opacity-60">Tổng huấn luyện viên (PT)</p>
                    <p class="text-3xl font-black text-on-surface">${dbData.tong_pt}</p>
                </div>
            </div>
            <div class="premium-card p-loose shadow-soft flex items-center gap-loose">
                <div class="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                    <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-2xl">calendar_today</span>
                </div>
                <div>
                    <p class="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider font-bold opacity-60">Lịch tập hôm nay</p>
                    <p class="text-3xl font-black text-on-surface">${dbData.lich_tap_hom_nay.tong} <span class="text-label-xs font-bold text-on-surface-variant opacity-50">(${dbData.lich_tap_hom_nay.da_tap} HOÀN THÀNH)</span></p>
                </div>
            </div>
        </div>

      </div>
    `;
  },

  init: async function () {
    try {
      const res = await window.GymApp.api.get('/revenue/dashboard');
      if (res && res.success) {
        window.GymApp.data.stats = res.data;
        // Re-render to update stats
        const contentArea = document.getElementById('content-area');
        if (contentArea && window.GymApp.currentPage === 'dashboard') {
            contentArea.innerHTML = this.render();
        }
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats', err);
    }

    const dbData = window.GymApp.data.stats;
    if (!dbData) return;

    // Chart doanh thu
    const ctxRev = document.getElementById('chart-revenue');
    if (ctxRev) {
      window.GymApp._activeChart = new Chart(ctxRev, {
        type: 'line',
        data: {
          labels: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
          datasets: [{
            label: 'Doanh thu',
            data: [12, 18, 21, 17, 23, 26, 19, 28, 31, 27, 32, 29],
            backgroundColor: 'rgba(29, 147, 54, 0.1)', borderColor: '#1D9336', borderWidth: 3, tension: 0.4, fill: true, pointRadius: 4, pointBackgroundColor: '#1D9336'
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
      });
    }

    // Chart gói tập
    const ctxPkg = document.getElementById('chart-packages');
    if (ctxPkg && dbData.hoi_vien) {
      new Chart(ctxPkg, {
        type: 'doughnut',
        data: {
          labels: ['Còn hạn', 'Sắp hết hạn', 'Hết hạn', 'Chưa gói'],
          datasets: [{
            data: [dbData.hoi_vien.con_han, dbData.hoi_vien.sap_het_han, dbData.hoi_vien.het_han, dbData.hoi_vien.chua_dang_ky],
            backgroundColor: ['#1D9336', '#f59e0b', '#ba1a1a', '#94a3b8'],
            borderWidth: 0,
          }]
        },
        options: { 
          responsive: true, 
          maintainAspectRatio: false,
          cutout: '75%',
          plugins: {
            legend: { position: 'right' }
          }
        }
      });
    }
  }
};
