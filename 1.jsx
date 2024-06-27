<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .bar {
            rx: 5; /* Horizontal radius */
            ry: 5; /* Vertical radius */
        }
    </style>
</head>
<body>
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
        <!-- January -->
        <rect x="50" y="200" width="40" height="100" fill="yellow" class="bar" />
        <rect x="50" y="150" width="40" height="50" fill="orange" class="bar" />
        <rect x="50" y="100" width="40" height="50" fill="red" class="bar" />

        <!-- February -->
        <rect x="120" y="180" width="40" height="120" fill="yellow" class="bar" />
        <rect x="120" y="140" width="40" height="40" fill="orange" class="bar" />
        <rect x="120" y="90" width="40" height="50" fill="red" class="bar" />

        <!-- March -->
        <rect x="190" y="220" width="40" height="80" fill="yellow" class="bar" />
        <rect x="190" y="190" width="40" height="30" fill="orange" class="bar" />
        <rect x="190" y="150" width="40" height="40" fill="red" class="bar" />

        <!-- April -->
        <rect x="260" y="160" width="40" height="140" fill="yellow" class="bar" />
        <rect x="260" y="120" width="40" height="40" fill="orange" class="bar" />
        <rect x="260" y="80" width="40" height="40" fill="red" class="bar" />

        <!-- May -->
        <rect x="330" y="220" width="40" height="80" fill="yellow" class="bar" />
        <rect x="330" y="190" width="40" height="30" fill="orange" class="bar" />
        <rect x="330" y="150" width="40" height="40" fill="red" class="bar" />

        <!-- Continue for remaining months... -->

        <!-- Legend -->
        <rect x="600" y="50" width="20" height="20" fill="yellow" rx="5" ry="5" />
        <text x="630" y="65" fill="black">Low</text>
        <rect x="600" y="80" width="20" height="20" fill="orange" rx="5" ry="5" />
        <text x="630" y="95" fill="black">Medium</text>
        <rect x="600" y="110" width="20" height="20" fill="red" rx="5" ry="5" />
        <text x="630" y="125" fill="black">High</text>
    </svg>
</body>
</html>