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
    const { groupBy } = req.query;
    if (!groupBy) {
      return res.status(400).json({ error: 'Missing groupBy parameter' });
    }

    const counts = await getCounts(groupBy);
    res.json(counts);
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to get counts for last 7 days, 30 days, and 1 year
const getCounts = async (groupBy) => {
  const client = await pool.connect();

  try {
    const query = `
      SELECT
        CASE
          WHEN current_date - interval '7 days' <= date_column THEN 'last_7_days'
          WHEN current_date - interval '30 days' <= date_column THEN 'last_30_days'
          WHEN current_date - interval '1 year' <= date_column THEN 'last_1_year'
          ELSE 'older'
        END as time_range,
        COUNT(*)
      FROM your_table
      WHERE current_date - interval '1 year' <= date_column
      GROUP BY time_range;
    `;

    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
};

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});