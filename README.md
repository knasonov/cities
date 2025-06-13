# Cities Map

This project displays Russian cities from `city.csv` on an interactive map.

## Usage

1. Start a simple web server:
   ```bash
   python3 -m http.server
   ```
   and open `http://localhost:8000/index.html` in your browser.

2. The map will show blue circles for every city in the CSV. Hover over a circle
to see the available information.

The CSV is loaded dynamically, so you can replace `city.csv` with your own data
without changing the code.
