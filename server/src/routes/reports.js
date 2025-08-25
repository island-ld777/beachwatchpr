const express = require('express');
const router = express.Router();
const ReportsController = require('../controllers/reportsController');
const {pool} = require("../db/index");

const reportsController = new ReportsController(pool);

router.post('/', reportsController.createReport.bind(reportsController));
router.get('/', reportsController.getReports.bind(reportsController));
router.get('/:id', reportsController.getReportById.bind(reportsController));
router.put('/:id', reportsController.updateReport.bind(reportsController));
router.delete('/:id', reportsController.deleteReport.bind(reportsController));

module.exports = router;