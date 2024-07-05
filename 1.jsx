WITH date_series AS (
  SELECT generate_series(
    CURRENT_DATE - INTERVAL '6 days',
    CURRENT_DATE,
    '1 day'
  )::date AS date
)
SELECT
  date_series.date AS date,
  COALESCE(COUNT(your_table.date_column), 0) AS count
FROM date_series
LEFT JOIN your_table
ON date_series.date = your_table.date_column::date
GROUP BY date_series.date
ORDER BY date_series.date;