const db = require('../db');

/**
 * 1. Create a Record (Requirement #2)
 * Adds a new financial entry to the database.
 */
exports.createRecord = (req, res) => {
    const { amount, type, category, userId, notes } = req.body;
    db.run(
        `INSERT INTO records (amount, type, category, userId, notes) VALUES (?, ?, ?, ?, ?)`,
        [amount, type, category, userId, notes],
        function(err) {
            if (err) return res.status(400).json({ error: err.message });
            res.status(201).json({ message: "Record created successfully!", id: this.lastID });
        }
    );
};

/**
 * 2. Get Dashboard Summary (Requirement #3)
 * Calculates Total Income, Expenses, Net Balance, and Category Breakdowns.
 */
exports.getDashboardSummary = (req, res) => {
    // Nested queries to get both Type-wise totals and Category-wise totals
    db.all(`SELECT category, SUM(amount) as total FROM records GROUP BY category`, [], (err, categories) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all(`SELECT type, SUM(amount) as total FROM records GROUP BY type`, [], (err, types) => {
            if (err) return res.status(500).json({ error: err.message });

            let income = 0;
            let expense = 0;

            types.forEach(row => {
                if (row.type.toUpperCase() === 'INCOME') income = row.total;
                if (row.type.toUpperCase() === 'EXPENSE') expense = row.total;
            });

            res.json({
                totalIncome: income,
                totalExpense: expense,
                netBalance: income - expense,
                categoryBreakdown: categories // Fulfills Requirement #3
            });
        });
    });
};

/**
 * 3. Update a Record (Requirement #2)
 * Modifies an existing record by ID.
 */
exports.updateRecord = (req, res) => {
    const { id } = req.params;
    const { amount, category, notes } = req.body;
    db.run(
        `UPDATE records SET amount = ?, category = ?, notes = ? WHERE id = ?`,
        [amount, category, notes, id],
        function(err) {
            if (err) return res.status(400).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Record not found" });
            res.json({ message: "Record updated successfully" });
        }
    );
};

/**
 * 4. Delete a Record (Requirement #2)
 * Removes a record from the database.
 */
exports.deleteRecord = (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM records WHERE id = ?`, [id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Record not found" });
        res.json({ message: "Record deleted successfully" });
    });
};