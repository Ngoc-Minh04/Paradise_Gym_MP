/**
 * Attendance Controller — Quản lý chấm công và giờ làm việc nhân sự
 */

import db from '../config/db.js';
import { success, error } from '../utils/response.js';

// ── GET /api/attendance/summary ───────────────────────────
// Tổng hợp giờ công của nhân viên/PT trong một khoảng thời gian
export const getAttendanceSummary = (req, res) => {
  const { fromDate, toDate, loai_ho_so, chi_nhanh_id } = req.query;

  let where = `WHERE h.loai_ho_so IN ('pt', 'nhan_vien', 'le_tan') AND h.is_deleted = 0`;
  const params = [];

  if (fromDate) {
    where += ` AND cc.ngay >= ?`;
    params.push(fromDate);
  }
  if (toDate) {
    where += ` AND cc.ngay <= ?`;
    params.push(toDate);
  }
  if (loai_ho_so) {
    where += ` AND h.loai_ho_so = ?`;
    params.push(loai_ho_so);
  }
  if (chi_nhanh_id) {
    where += ` AND h.chi_nhanh_id = ?`;
    params.push(chi_nhanh_id);
  }

  const rows = db.prepare(`
    SELECT
      h.id, h.ma_ho_so, h.ho_ten, h.loai_ho_so,
      COUNT(cc.id) AS so_ngay_di_lam,
      SUM(cc.so_gio_cong) AS tong_gio_cong,
      AVG(cc.so_gio_cong) AS trung_binh_gio
    FROM ho_so h
    LEFT JOIN cham_cong cc ON cc.ho_so_id = h.id
    ${where}
    GROUP BY h.id
    ORDER BY tong_gio_cong DESC
  `).all(...params);

  return success(res, rows);
};

// ── GET /api/attendance/details/:ho_so_id ──────────────────
// Chi tiết chấm công của một nhân viên
export const getAttendanceDetails = (req, res) => {
  const { ho_so_id } = req.params;
  const { fromDate, toDate } = req.query;

  let where = `WHERE ho_so_id = ?`;
  const params = [ho_so_id];

  if (fromDate) {
    where += ` AND ngay >= ?`;
    params.push(fromDate);
  }
  if (toDate) {
    where += ` AND ngay <= ?`;
    params.push(toDate);
  }

  const rows = db.prepare(`
    SELECT * FROM cham_cong
    ${where}
    ORDER BY ngay DESC
  `).all(...params);

  return success(res, rows);
};

// ── POST /api/attendance/config ───────────────────────────
// Cập nhật cấu hình máy chấm công
export const updateMachineConfig = (req, res) => {
  const { chi_nhanh_id, configs } = req.body; // configs: [{ ma: 'ip', gia_tri: '192...' }, ...]

  if (!configs || !Array.isArray(configs)) {
    return error(res, 'Dữ liệu cấu hình không hợp lệ.', 400);
  }

  const upsert = db.prepare(`
    INSERT INTO cau_hinh_he_thong (chi_nhanh_id, ma_cau_hinh, gia_tri)
    VALUES (?, ?, ?)
    ON CONFLICT(chi_nhanh_id, ma_cau_hinh) DO UPDATE SET gia_tri = excluded.gia_tri
  `);

  const transaction = db.transaction((items) => {
    for (const item of items) {
      upsert.run(chi_nhanh_id || 1, item.ma, item.gia_tri);
    }
  });

  transaction(configs);

  return success(res, null, 'Cập nhật cấu hình thành công');
};
