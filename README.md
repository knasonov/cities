# Cities Map

This project displays cities from `city.csv` on an interactive map.

## Usage

1. Start a simple web server:
   ```bash
   python3 -m http.server
   ```
   and open `http://localhost:8000/index.html` in your browser.

2. The map will show blue circles for every city in the CSV. Hover over a circle
   to see the available information.

3. The CSV should contain at least `lat` and `lon` columns.
   A sample file `sample_city.csv` with three cities is included for testing.
4. To test the map, replace `city.csv` with `sample_city.csv`
