const express = require('express');
const router = express.Router();
const ReportsController = require('../controllers/reportsController');
const upload = require('../middleware/upload')
const {pool} = require("../db/index");

const reportsController = new ReportsController(pool);

router.post('/', upload.array('images', 5), reportsController.createReport.bind(reportsController));
router.get('/', reportsController.getReports.bind(reportsController));
router.get('/:id', reportsController.getReportById.bind(reportsController));
router.put('/:id', reportsController.updateReport.bind(reportsController));
router.patch('/:id/validate', reportsController.validateReport.bind(reportsController));
router.delete('/:id', reportsController.deleteReport.bind(reportsController));

module.exports = router;