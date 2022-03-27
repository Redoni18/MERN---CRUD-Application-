import './App.css';
import PostMessages from './components/PostMessages';
import { Provider } from "react-redux"
import { store } from "./actions/store"
import { AppBar, Container, Typography } from '@material-ui/core';

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit">
          <Typography variant="h2" align="center">
            PostBox
          </Typography>
        </AppBar>
      <PostMessages />
      </Container>
    </Provider>
  );
}

export default App;
