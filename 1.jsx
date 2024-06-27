Applying a border to only one side of an SVG `<rect>` element directly using CSS is not possible, as SVG does not support individual border sides like HTML/CSS elements. However, you can achieve a similar effect by layering another `<rect>` element or using lines to simulate the border.

Here are a few methods to achieve this effect:

### Method 1: Using an Overlapping Rect for the Border

You can overlay another `<rect>` element to create the appearance of a border on one side.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .bar {
            fill: yellow;
        }
        .border-left {
            fill: black;
        }
    </style>
</head>
<body>
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
        <!-- Main rectangle -->
        <rect x="50" y="50" width="100" height="100" class="bar" />
        <!-- Left border rectangle -->
        <rect x="50" y="50" width="5" height="100" class="border-left" />
    </svg>
</body>
</html>
```

In this example:
- The main rectangle is yellow.
- A small black rectangle is overlaid on the left side of the main rectangle to simulate a left border.

### Method 2: Using Lines for the Border

You can use the `<line>` element to draw a border on one side of the rectangle.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
        <!-- Main rectangle -->
        <rect x="50" y="50" width="100" height="100" fill="yellow" />
        <!-- Left border line -->
        <line x1="50" y1="50" x2="50" y2="150" stroke="black" stroke-width="5" />
    </svg>
</body>
</html>
```

In this example:
- The main rectangle is yellow.
- A black line is drawn on the left side of the rectangle to simulate a left border.

### Method 3: Using `stroke-dasharray` and `stroke-dashoffset`

For more advanced usage, you can use `stroke-dasharray` and `stroke-dashoffset` to create partial borders. However, this is more commonly used for shapes like circles.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
        <!-- Main rectangle with border -->
        <rect x="50" y="50" width="100" height="100" fill="yellow" stroke="black" stroke-width="5" 
              stroke-dasharray="5 105 5 105" stroke-dashoffset="105" />
    </svg>
</body>
</html>
```

In this example:
- The `stroke-dasharray` and `stroke-dashoffset` are used to create a partial border, though this technique can be a bit tricky to fine-tune for specific sides.

These methods provide ways to create the visual effect of having a border on just one side of an SVG `<rect>` element. Choose the method that best fits your needs and adjust the coordinates and sizes accordingly.