class ReportsController {

    constructor(db) {
        this.db = db;
    }

    async createReport(req, res) {
        const { email, category, description, latitude, longitude } = req.body;
        const files = req.files || [];

        try {
            await this.db.query('BEGIN');

            const result = await this.db.query(
                'INSERT INTO coastal_reports.reports (email, category, description, latitude, longitude) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [email, category, description, latitude, longitude]
            );

            const reportId = result.rows[0].id;

            if (files.length > 0){
                for (const file of files) {
                    const imageUrl = `/uploads/images/${file.filename}`;
                    await this.db.query(
                        'INSERT INTO coastal_reports.images (report_id, image_url) VALUES ($1, $2)',
                        [reportId, imageUrl]
                    )
                }
            }

            await this.db.query('COMMIT');

            const completeReport = await this.getCompleteReport(reportId);
            res.status(201).json(completeReport);

        } catch (error) {
            await this.db.query('ROLLBACK');
            console.error("Error creating report: ", error);
            res.status(500).json({ error: 'Failed to create report' });
        }
    }

    async validateReport(req, res) {
        const { id } = req.params;
        const { status } = req.body; // 'validated' or 'rejected'
        
        try {
            // Validate status input
            if (!['validated', 'rejected'].includes(status)) {
                return res.status(400).json({ error: 'Invalid status. Must be "validated" or "rejected"' });
            }

            const result = await this.db.query(
                'UPDATE coastal_reports.reports SET status = $1, validated_at = CURRENT_TIMESTAMP WHERE id = $2 AND status = $3 RETURNING *',
                [status, id, 'pending']
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Report not found or not in pending status' });
            }

            // Get complete report with images
            const completeReport = await this.getCompleteReport(id);
            res.status(200).json(completeReport);

        } catch (error) {
            console.error("Error validating report: ", error);
            res.status(500).json({ error: 'Failed to validate report' });
        }
    }

    async getCompleteReport(reportId) {
        const reportResult = await this.db.query('SELECT * FROM coastal_reports.reports WHERE id = $1', [reportId]);
        const imagesResult = await this.db.query('SELECT * FROM coastal_reports.images WHERE report_id = $1', [reportId]);

        return {
            ...reportResult.rows[0],
            images: imagesResult.rows
        };
    }

    async getReports(req, res) {
        try {
            const result = await this.db.query(`
                SELECT r.*,
                    COALESCE(
                        JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'id', i.id,
                                'image_url', i.image_url,
                                'uploaded_at', i.uploaded_at
                            )
                        ) FILTER (WHERE i.id IS NOT NULL),
                         '[]'
                    ) as images
                FROM coastal_reports.reports r
                LEFT JOIN coastal_reports.images i ON r.id = i.report_id
                GROUP BY r.id
                ORDER BY r.created_at DESC
            `);

            res.status(200).json(result.rows);
        } catch (error) {
            console.error("Error fetching reports: ", error);
            res.status(500).json({ error: 'Failed to fetch reports' });
        }
    }

    async getReportById(req, res) {
        const { id } = req.params;
        try {
            const result = await this.getCompleteReport(id);
            if (!result) {
                return res.status(404).json({ error: 'Report not found' });
            }
            res.status(200).json(result);
        } catch (error) {
            console.error("Error creating report: ", error);
            res.status(500).json({ error: 'Failed to fetch report' });
        }
    }

    async updateReport(req, res) {
        const { id } = req.params;
        const { title, description } = req.body;
        try {
            const result = await this.db.query(
                'UPDATE coastal_reports.reports SET title = $1, description = $2 WHERE id = $3 RETURNING *',
                [title, description, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Report not found' });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error("Error updating report: ", error);
            res.status(500).json({ error: 'Failed to update report' });
        }
    }

    async deleteReport(req, res) {
        const { id } = req.params;
        try {
            const result = await this.db.query('DELETE FROM coastal_reports.reports WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Report not found' });
            }
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting report: ", error);
            res.status(500).json({ error: 'Failed to delete report' });
        }
    }
}

module.exports = ReportsController;