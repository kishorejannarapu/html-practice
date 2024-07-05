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
WITH months AS (
  SELECT generate_series(
    date_trunc('month', current_date) - INTERVAL '11 months',
    date_trunc('month', current_date),
    '1 month'
  )::date AS month_start
)

SELECT
  to_char(months.month_start, 'YYYY-MM') AS month,
  COALESCE(COUNT(your_table.date_column), 0) AS count
FROM months
LEFT JOIN your_table
ON date_trunc('month', your_table.date_column) = months.month_start
GROUP BY months.month_start
ORDER BY months.month_start;





