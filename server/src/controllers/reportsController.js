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
                'INSERT INTO reports (email, category, description, latitude, longitude) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [email, category, description, latitude, longitude]
            );

            const reportId = result.rows[0].id;

            if (files.length > 0){
                for (const file of files) {
                    const imageUrl = `/uploads/images/${file.filename}`;
                    await this.db.query(
                        'INSERT INTO images (report_id, image_url) VALUES ($1, $2)',
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

    async getCompleteReport(reportId) {
        const reportResult = await this.db.query('SELECT * FROM reports WHERE id = $1', [reportId]);
        const imagesResult = await this.db.query('SELECT * FROM images WHERE report_id = $1', [reportId]);

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
                FROM reports r
                LEFT JOIN images i ON r.id = i.report_id
                GROUP BY r.id
                ORDER BY r.created_at DESC
            `);


            res.status(200).json(result.rows);
        } catch (error) {
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
            res.status(500).json({ error: 'Failed to fetch report' });
        }
    }

    async updateReport(req, res) {
        const { id } = req.params;
        const { title, description } = req.body;
        try {
            const result = await this.db.query(
                'UPDATE reports SET title = $1, description = $2 WHERE id = $3 RETURNING *',
                [title, description, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Report not found' });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update report' });
        }
    }

    async deleteReport(req, res) {
        const { id } = req.params;
        try {
            const result = await this.db.query('DELETE FROM reports WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Report not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete report' });
        }
    }
}

module.exports = ReportsController;