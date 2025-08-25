class ReportsController {

    constructor(db) {
        this.db = db;
    }

    async createReport(req, res) {
        const { email, category, description, latitude, longitude } = req.body;
        try {
            const result = await this.db.query(
                'INSERT INTO reports (email, category, description, latitude, longitude) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [email, category, description, latitude, longitude]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error("Error creating report: ", error);
            res.status(500).json({ error: 'Failed to create report' });
        }
    }

    async getReports(req, res) {
        try {
            const result = await this.db.query('SELECT * FROM reports');
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch reports' });
        }
    }

    async getReportById(req, res) {
        const { id } = req.params;
        try {
            const result = await this.db.query('SELECT * FROM reports WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Report not found' });
            }
            res.status(200).json(result.rows[0]);
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