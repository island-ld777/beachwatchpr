const express = require('express');
const router = express.Router();
const ReportsController = require('../controllers/reportsController');

const reportsController = new ReportsController();

router.post('/', reportsController.createReport.bind(reportsController));
router.get('/', reportsController.getReports.bind(reportsController));
router.get('/:id', reportsController.getReportById.bind(reportsController));
router.put('/:id', reportsController.updateReport.bind(reportsController));
router.delete('/:id', reportsController.deleteReport.bind(reportsController));

module.exports = router;