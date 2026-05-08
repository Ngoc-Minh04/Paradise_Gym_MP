window.GymApp.pages['checkin'] = {
  _page: 1,
  _perPage: 10,

  render: function () {
    const checkins = window.GymApp.data.checkins || [];
    const hourCounts = {};
    for (let h = 5; h <= 22; h++) hourCounts[h] = 0;
    checkins.forEach(c => {
      const hour = new Date(c.thoi_diem).getHours();
      if (hourCounts[hour] !== undefined) hourCounts[hour]++;
    });
    const peakHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];

    return `
      <div class="flex flex-col gap-margin animate-soft">

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-loose">
          ${[
            { icon: 'login', label: 'Tổng check-in hôm nay', value: checkins.length, color: 'text-brand-primary' },
            { icon: 'schedule', label: 'Giờ cao điểm', value: peakHour[0] + ':00', color: 'text-[#006b20]' },
            { icon: 'people', label: 'Lượt vào cao nhất/giờ', value: peakHour[1], color: 'text-[#006b20]' },
            { icon: 'trending_up', label: 'So với hôm qua', value: '+12%', color: 'text-brand-primary' },
          ].map(s => `
                <div class="premium-card p-loose shadow-soft flex items-center gap-standard">
                  <div class="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center">
                    <span class="material-symbols-outlined ${s.color} text-xl">${s.icon}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider font-bold opacity-60">${s.label}</span>
                    <span class="${s.color} font-display-2xl text-display-2xl font-black">${s.value}</span>
                  </div>
                </div>
          `).join('')}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-loose">

          <!-- Biểu đồ check-in theo giờ -->
          <div class="premium-card p-loose shadow-soft">
            <h3 class="font-display-xl text-on-surface font-bold mb-standard">Lượt check-in theo giờ</h3>
            <div style="height:320px">
              <canvas id="chart-checkin-hourly"></canvas>
            </div>
          </div>

          <!-- Grid cards check-in (scroll nội bộ, không phân trang) -->
          <div class="md:col-span-2 flex flex-col gap-standard">
            <div class="flex items-center justify-between">
              <h3 class="font-display-2xl text-display-2xl font-bold text-on-surface">Check-in hôm nay</h3>
              <span class="text-on-surface-variant text-body-sm">${new Date().toLocaleDateString('vi-VN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</span>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-standard max-h-[400px] overflow-y-auto pr-xs scroll-premium">
              ${checkins.map(c => `
                <div class="premium-card p-standard shadow-soft flex flex-col items-center gap-sm hover:border-brand-primary/30 transition-all group bg-white dark:bg-slate-800/30">
                  ${window.GymApp.avatarImg(c.avatar_url, c.ho_ten, 'lg')}
                  <div class="text-center">
                    <p class="font-black text-on-surface text-body-md truncate w-full group-hover:text-brand-primary transition-colors">${c.ho_ten}</p>
                    <p class="text-label-xs text-on-surface-variant font-bold opacity-60 uppercase">${c.ma_ho_so}</p>
                  </div>
                  <div class="flex items-center gap-xs bg-brand-primary/10 rounded-full px-compact py-xs">
                    <span class="material-symbols-outlined text-brand-primary text-sm">schedule</span>
                    <span class="text-brand-primary text-body-sm font-black">${new Date(c.thoi_diem).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Bảng chi tiết lượt vào (có phân trang) -->
        <div class="premium-card shadow-soft overflow-hidden">
          <div class="px-loose py-standard border-b border-outline-variant/30 bg-black/5 dark:bg-white/5">
            <h3 class="font-display-xl text-on-surface font-bold">Chi tiết lượt vào</h3>
          </div>
          <div id="checkin-table-container">
            ${this._renderDetailTable()}
          </div>
        </div>

      </div>
    `;
  },

  _renderDetailTable: function () {
    const checkins = window.GymApp.data.checkins || [];
    const start = (this._page - 1) * this._perPage;
    const paginated = checkins.slice(start, start + this._perPage);

    const rows = paginated.map(c => `
      <tr class="h-11 border-b border-outline-variant hover:bg-surface-container-low transition-colors">
        <td class="px-loose">
          <div class="flex items-center gap-compact">
            ${window.GymApp.avatarImg(c.avatar_url, c.ho_ten, 'sm')}
            <span class="font-bold text-on-surface text-body-md">${c.ho_ten}</span>
          </div>
        </td>
        <td class="px-loose text-on-surface-variant text-body-sm font-bold">${c.ma_ho_so}</td>
        <td class="px-loose">
          <span class="flex items-center gap-xs text-on-surface text-body-md">
            <span class="material-symbols-outlined text-brand-primary text-sm">schedule</span>
            ${new Date(c.thoi_diem).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </td>
        <td class="px-loose">${window.GymApp.statusBadge(c.loai === 'vao' ? 'active' : 'inactive')}</td>
      </tr>
    `).join('');

    return `
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="h-12 border-b border-outline-variant/30 bg-black/5 dark:bg-white/5">
              <th class="px-loose font-bold text-label-bold uppercase text-on-surface-variant opacity-60">Hội viên</th>
              <th class="px-loose font-bold text-label-bold uppercase text-on-surface-variant opacity-60">Mã HV</th>
              <th class="px-loose font-bold text-label-bold uppercase text-on-surface-variant opacity-60">Giờ vào</th>
              <th class="px-loose font-bold text-label-bold uppercase text-on-surface-variant opacity-60">Trạng thái</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/20">${rows}</tbody>
        </table>
      </div>
      <div class="p-standard border-t border-outline-variant/30">
        ${window.GymApp.renderPagination(this._page, checkins.length, this._perPage)}
      </div>
    `;
  },

  init: async function () {
    const self = this;
    this._page = 1;

    // Pagination handler
    window.GymApp._pgHandler = function (pg) {
      self._page = pg;
      const table = document.getElementById('checkin-table-container');
      if (table) table.innerHTML = self._renderDetailTable();
    };

    // Chart
    const checkins = window.GymApp.data.checkins || [];
    if (checkins.length === 0) {
      try {
        const res = await window.GymApp.api.get('/checkins');
        if (res?.success) window.GymApp.data.checkins = res.data;
      } catch (err) { console.error('Failed to fetch checkins', err); }
    }
    
    // Render lại nếu có dữ liệu mới (không gọi lại init để tránh loop)
    const freshCheckins = window.GymApp.data.checkins || [];
    const chartCanvas = document.getElementById('chart-checkin-hourly');
    if (!chartCanvas) return;

    const hourCounts = {};
    for (let h = 5; h <= 22; h++) hourCounts[h] = 0;
    freshCheckins.forEach(c => {
        const hour = new Date(c.thoi_diem).getHours();
        if (hourCounts[hour] !== undefined) hourCounts[hour]++;
    });

    const ctx = document.getElementById('chart-checkin-hourly');
    if (!ctx) return;
    window.GymApp._activeChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(hourCounts).map(h => h + ':00'),
        datasets: [{
          label: 'Lượt check-in',
          data: Object.values(hourCounts),
          backgroundColor: Object.values(hourCounts).map(v => v === Math.max(...Object.values(hourCounts)) ? '#1D9336' : 'rgba(29, 147, 54, 0.2)'),
          borderColor: '#1D9336',
          borderWidth: 0,
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleFont: { size: 13, weight: 'bold' },
                padding: 12,
                cornerRadius: 8
            }
        },
        scales: {
          x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 10, weight: 'bold' }, stepSize: 1 } },
          y: { grid: { display: false }, ticks: { font: { size: 11, weight: 'bold' } } }
        }
      }
    });
  }
};
