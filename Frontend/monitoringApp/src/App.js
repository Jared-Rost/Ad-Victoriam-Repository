import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Users from './components/Users';

function App() {
  return <Container>
    <Header />
    <Users />
  </Container>
}

export default App;
