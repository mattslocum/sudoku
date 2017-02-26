# sudoku

## Docker commands used in makefile
- `docker build -t="sudoku_img" .`
- `docker run -d -p 8080:80 -v `pwd`/htdocs:/var/www/html --name sudoku sudoku_img`
