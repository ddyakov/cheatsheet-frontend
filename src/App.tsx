import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { FC } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import { Container, CrossOut, Editor, Group, List, Name } from './components/Steps'
import theme from './theme'

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Container>
            <Route exact path='/steps/name' component={Name} />
            <Route exact path='/steps/list' component={List} />
            <Route exact path='/steps/cross-out' component={CrossOut} />
            <Route exact path='/steps/group' component={Group} />
            <Route exact path='/steps/editor' component={Editor} />
          </Container>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
