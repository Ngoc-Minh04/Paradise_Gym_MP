import express from 'express';
import * as attendanceController from '../controllers/attendance.controller.js';
import { verifyToken } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/role.js';

const router = express.Router();

// Tất cả route yêu cầu đăng nhập
router.use(verifyToken);

// Chỉ Admin và Lễ tân mới được xem chấm công tổng thể
router.get('/summary', requireRole('admin', 'le_tan'), attendanceController.getAttendanceSummary);
router.get('/details/:ho_so_id', requireRole('admin', 'le_tan'), attendanceController.getAttendanceDetails);

// Chỉ Admin mới được cấu hình hệ thống
router.post('/config', requireRole('admin'), attendanceController.updateMachineConfig);

export default router;
