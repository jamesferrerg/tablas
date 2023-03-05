import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import "./App.css";

const filter = createFilterOptions();

function App() {
  const [value, setValue] = useState(null);
  const [movieGenre, setMovieGenre] = useState(null);
  const [movies, setMovies] = useState(top100Films);
  const [id, setId] =  useState(null)

  const handleSubmit = () => {
    if (id !== null && id !== undefined) {
      const newMovie = movies.map((movie) => {
        if (movie.id === id) {
          return {
            ...movie,
            title: value,
            genre: movieGenre,
          }
        }
        return movie;
      });
      setMovies(newMovie);
      setId(null);
    } else {
      const last = movies[movies.length - 1].id + 1;
      const peli = { id: last, title: value.film, genre: movieGenre };
      setMovies([...movies, peli]);
    }
  };

  const handleEdit = (id) => {
    const newMovie = movies.map((movie) => {
      if (movie.id === id) {
        setValue(movie.title);
        setMovieGenre(movie.genre);
        setId(movie.id);
      }
      return movie;
    });
    return newMovie;
  };

  const handleRemoveMovie = (id) => {
    const removeMovie = movies.filter((movie) => movie.id !== id);
    setMovies(removeMovie);
  };

  useEffect(() => {}, [movies]);

  return (
    <div className="container">
      <h1>Table</h1>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setValue({
                  film: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue({
                  film: newValue.inputValue,
                });
              } else {
                setValue(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              // Suggest the creation of a new value
              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  film: `Add "${params.inputValue}"`,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={filmsAutoComplete}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.film;
            }}
            renderOption={(option) => option.film}
            style={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Free solo with text demo"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={movieGenre}
            onChange={(e) => setMovieGenre(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid container style={{ padding: 30 }}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No. id</TableCell>
                  <TableCell align="right">Movies</TableCell>
                  <TableCell align="right">Genre</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.genre}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(row.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRemoveMovie(row.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

const top100Films = [
  { id: 1, title: "The Shawshank Redemption", genre: "Any 1" },
  { id: 2, title: "The Godfather", genre: "Any 2" },
  { id: 3, title: "The Godfather: Part II", genre: "Any 3" },
  { id: 4, title: "The Dark Knight", genre: "Any 4" },
  { id: 5, title: "12 Angry Men", genre: "Any 5" },
  { id: 6, title: "Schindler's List", genre: "Any 1" },
  { id: 7, title: "Pulp Fiction", genre: "Any 1" },
  {
    id: 8,
    title: "The Lord of the Rings: The Return of the King",
    genre: "Any 2",
  },
  { id: 9, title: "The Good, the Bad and the Ugly", genre: "Any 3" },
  { id: 10, title: "Fight Club", genre: "Any 10" },
];

const filmsAutoComplete = [
  { id: 1, film: "Day one" },
  { id: 2, film: "Day two" },
  { id: 3, film: "Day three" },
  { id: 4, film: "Day four" },
];
