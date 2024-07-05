const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configure the PostgreSQL connection pool
const pool = new Pool({
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

// Endpoint to get counts for different time ranges
app.get('/counts', async (req, res) => {
  try {
    const { range } = req.query;

    if (!range || !['7days', '30days', '1year'].includes(range)) {
      return res.status(400).json({ error: 'Invalid or missing range parameter' });
    }

    const counts = await getCounts(range);
    res.json(counts);
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to get counts based on the time range
const getCounts = async (range) => {
  const client = await pool.connect();

  try {
    let query;
    if (range === '7days' || range === '30days') {
      query = `
        SELECT
          DATE_TRUNC('day', date_column) AS time_period,
          COUNT(*) AS count
        FROM your_table
        WHERE date_column >= CURRENT_DATE - INTERVAL '${range === '7days' ? '7' : '30'} days'
        GROUP BY time_period
        ORDER BY time_period;
      `;
    } else if (range === '1year') {
      query = `
        SELECT
          DATE_TRUNC('month', date_column) AS time_period,
          COUNT(*) AS count
        FROM your_table
        WHERE date_column >= CURRENT_DATE - INTERVAL '1 year'
        GROUP BY time_period
        ORDER BY time_period;
      `;
    }

    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
};

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});